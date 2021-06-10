import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"
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
	const [name, setName] = useState("")
	const [userId, setUserId] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef = useRef()

	useEffect(() => {

		const socket = io.connect('https://tele-rehab-socket-io.vps-touchit.space')

		setSocket(socket);

		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
			myVideo.current.srcObject = stream
		})

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

			if ( props.location.userId !== undefined ) {
				fetch(`https://tele-rehab-api.vps-touchit.space/users/${props.location.userId}`, {
					method: 'PUT',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({video_chat_url: id})
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
		const { doctorId } = props.location;

		if ( doctorId !== undefined && stream !== undefined ) {
			callUser(doctorId)
		}

	}, [stream])


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
	}

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
	}

	return (
		<>
			<h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
			<div className="container">
				<div className="video-container">
					<div className="video">
						{stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
					</div>
					<div className="video">
						{callAccepted && !callEnded ?
							<video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} /> :
							null}
					</div>
				</div>
				<div>
					{receivingCall && !callAccepted ? (
						<div className="caller">
							<h1 >{name} is calling...</h1>
							<Button variant="contained" color="primary" onClick={answerCall}>
								Answer
						</Button>
						</div>
					) : null}
				</div>
			</div>
		</>
	)
}

export default VideoChat
