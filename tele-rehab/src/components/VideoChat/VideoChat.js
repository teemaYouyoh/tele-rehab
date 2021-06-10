import React, { useEffect, useRef, useState } from "react"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import { CopyToClipboard } from "react-copy-to-clipboard"
import CallEndIcon from '@material-ui/icons/CallEnd';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import Peer from "simple-peer"
import io from "socket.io-client"
import PersonAreaHeader from '../Header/PersonAreaHeader';
import ModalCustom from "../Modal/Modal";
import "./VideoChat.css"


const VideoChat = (props) => {
	const [me, setMe] = useState("")
	const [socket, setSocket] = useState()
	const [stream, setStream] = useState()
	const [receivingCall, setReceivingCall] = useState(false)
	const [caller, setCaller] = useState("")
	const [callerSignal, setCallerSignal] = useState()
	const [callAccepted, setCallAccepted] = useState(false)
	const [idToCall, setIdToCall] = useState("")
	const [callEnded, setCallEnded] = useState(false)
	const [isVideoMuted, setIsVideoMuted] = useState(false)
	const [isMicroMuted, setIsMicroMuted] = useState(false)
	const [recorder, setRecorder] = useState(null);
	const [name, setName] = useState("")
	const [userId, setUserId] = useState("")


	const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);

	// MODAL VARIABLES
	const [modalText, setModalText] = useState("");
	const [modalButton, setModalButton] = useState("");
	const [modalIsOpen, setIsOpen] = useState(false);
	const [modalFinish, setModalFinish] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const [open, setOpen] = useState("");
	// END MODAL VARIABLES

	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef = useRef()

	console.log(connectionRef)


	useEffect(async () => {

		// const socket = io.connect('http://localhost:5000')
		const socket = io.connect('https://tele-rehab-socket-io.vps-touchit.space')

		setSocket(socket);


		const platform = navigator.platform.toLowerCase();
		const iosPlatforms = ['iphone', 'ipad', 'ipod', 'ipod touch'];

		// Checking if device is IOS 

		if (stream === undefined) {
			if (iosPlatforms.includes(platform)) {
				navigator.mediaDevices.getUserMedia({ video: true, audio: true })
					.then(async (stream) => {
						setStream(stream)
						myVideo.current.srcObject = stream

						let recorder = new MediaRecorder(stream);
						setRecorder(recorder);
					})
					.catch((err) => {
						alert("err");
						alert(err)
					})

			} else {

				navigator.getUserMedia = navigator.getUserMedia ||
					navigator.webkitGetUserMedia ||
					navigator.mozGetUserMedia;

				if (navigator.getUserMedia) {
					navigator.getUserMedia({ video: true, audio: true }, async function (stream) {
						setStream(stream)
						myVideo.current.srcObject = stream

						let recorder = new MediaRecorder(stream);
						setRecorder(recorder);
					}, function (err) {
						console.error(err)
					})
				}
			}
		}


		// 	navigator.getUserMedia = navigator.getUserMedia ||
		// 	navigator.webkitGetUserMedia ||
		// 	navigator.mozGetUserMedia;

		// if (navigator.getUserMedia) {

		// 	navigator.getUserMedia(
		// 		{ video: true, audio: true },
		// 		function (stream) {
		// 			setStream(stream)
		// 			myVideo.current.srcObject = stream
		// 		},
		// 		function (err) {
		// 			console.log(err);
		// 		}
		// 	)
		// }

		socket.on("me", (id) => {
			setMe(id)

			console.log(id);

			if (props.location.userId !== undefined) {
				fetch(`https://tele-rehab-api.vps-touchit.space/users/${props.location.userId}`, {
					method: 'PUT',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ video_chat_url: id })
				})
				.then(async (res) => {
					// console.log( await res.json() );
					let user = await res.json();
					await sendMessage(user);
				})
				.catch(err => { console.error(err) })
			}
		})

		socket.on("callUser", (data) => {
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})


		socket.on("callEnded", () => {
			console.log("end")
			if (props.location.userName !== undefined) {
				setModalText(`Пользователь ${props.location.userName} завершил звонок`)
			} else {
				setModalText(`Пользователь завершил звонок`)
			}
			setModalButton("На главную")
			setIsOpen(true);
			setCallEnded(true)

			// window.location.href = "/";
		})
	}, [])

	async function sendMessage(responseUser){
		const user = responseUser;
		console.log(user);
		const formData = {
			email: user.email,
		}
		const response = await fetch(`http://localhost:3000/send_mess_videochat`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});
	}

	useEffect(() => {

	}, [modalIsOpen])

	useEffect(() => {
		const { doctorId } = props.location;

		if (doctorId !== undefined && stream !== undefined) {
			callUser(doctorId)
		}

	}, [stream])

	useEffect(() => {

		if (receivingCall) {
			if (props.location.userName !== undefined) {
				setModalText(`Пользователь ${props.location.userName} хочет присоединиться к чату`)
			} else {
				setModalText(`Пользователь хочет присоединиться к чату`)
			}
			setModalButton("Разрешить")
			setIsOpen(true)
		}


	}, [receivingCall])




	const callUser = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
		peer.on("stream", (stream) => {

			userVideo.current.srcObject = stream

		})
		socket.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall = () => {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer

		if (props.location.userId !== undefined) {
			fetch(`https://tele-rehab-api.vps-touchit.space/users/${props.location.userId}`, {
				method: 'PUT',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ video_chat_url: "" })
			})
				.then(async (res) => { console.log(await res.json()) })
				.catch(err => { console.error(err) })
		}
	}


	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()

		socket.disconnect()

		if (props.location.userId !== undefined) {
			fetch(`https://tele-rehab-api.vps-touchit.space/users/${props.location.userId}`, {
				method: 'PUT',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ video_chat_url: "" })
			})
				.then(async (res) => {
					console.log(await res.json())
					window.location.href = "/";
				})
				.catch(err => { console.error(err) })
		} else {
			window.location.href = "/";
		}
	}

	const muteMicro = () => {
		setIsMicroMuted(!isMicroMuted);
		recorder.stream.getAudioTracks().forEach((track) => {
			track.enabled = !track.enabled;
		})
	}

	const muteVideo = () => {
		setIsVideoMuted(!isVideoMuted);
		recorder.stream.getVideoTracks().forEach((track) => {
			track.enabled = !track.enabled;
		})
	}


	// MODAL FUNCTIONS
	function updateModal(value) {
		setIsOpen(value);
		setModalFinish(value);
	}

	function openModal() {
		setIsOpen(true);
	}
	function openFinishModal() {
		setModalFinish(true);
	}

	function afterOpenModal() {
	}

	function closeModal() {
		setIsOpen(false);

		if (callEnded) {
			window.location.href = "/";
		}
	}
	// END MODAL FUNCTIONS

	return (
		<>
			<PersonAreaHeader />
			<div className="container">
				<div className="videos-container">
					<div id="small-video" className="video">
						{stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
					</div>
					<div id="main-video" className="video">
						{callAccepted && !callEnded ?
							<video playsInline ref={userVideo} autoPlay />
							:
							!callAccepted ?
								<div className="notification">
									Ожидание пользователя {props.location.userName}
								</div>
								:
								callEnded ?
									<div className="notification">
										Вызов завершён
							</div>
									:
									null
						}

						<div id="control-panel">
							{receivingCall && !callAccepted ? (
								<div className="caller">
									<ModalCustom
									/>

									<h1 >{name} is calling...</h1>
									<Button variant="contained" color="primary" onClick={answerCall}>
										Answer
									</Button>
								</div>
							) : null}

							{isMicroMuted ? (<MicOffIcon onClick={muteMicro} />) : (<MicIcon onClick={muteMicro} />)}

							{isVideoMuted ? (<VideocamOffIcon onClick={muteVideo} />) : (<VideocamIcon onClick={muteVideo} />)}

							<CallEndIcon onClick={leaveCall} />
						</div>
					</div>
				</div>
			</div>

			{receivingCall && !callAccepted ? (
				<ModalCustom
					title={modalText}
					buttonText={modalButton}
					updateModal={updateModal}
					isOpen={modalIsOpen}
					onAfterOpen={afterOpenModal}
					onRequestClose={closeModal}
					buttonClick={answerCall}
				/>
			) : null}
			{callEnded ? console.log(11111) : console.log(2222)}
			{callEnded ? (
				<ModalCustom
					title={modalText}
					buttonText={modalButton}
					updateModal={updateModal}
					isOpen={modalIsOpen}
					onAfterOpen={afterOpenModal}
					onRequestClose={closeModal}
					buttonClick={() => { window.location.href = "/" }}
				/>
			) : null}

		</>
	)
}

export default VideoChat
