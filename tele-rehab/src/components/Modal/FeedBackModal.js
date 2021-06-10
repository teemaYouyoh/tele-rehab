import React, {useState} from "react";
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const FeedBackModal = ({isOpen, updateModal, username, email}) => {
    const [theme, setTheme] = useState("");
    const [text, setText] = useState("");

    async function sendFeedback(){
        if(theme && text){
            const formData = {
                username,
                theme,
                text,
                email
            }
            const response = await fetch(`http://localhost:3000/send_feedback`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        }
    }


    return(
        <Modal
            isOpen={isOpen}
            // onAfterOpen={onAfterOpen}
            // onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Example Modal">
            <div className="modal-feedback">
                <h2>Обратная связь</h2>
                <label htmlFor="theme">Тема</label>
                <input onChange={(e)=>setTheme(e.target.value)} type="text" id="theme" name="theme"/>
                <label htmlFor="feedback-text">Текст</label>
                <textarea onChange={(e)=>setText(e.target.value)} name="feedback-text" id="feedback-text" cols="30" rows="10"></textarea>
                <button onClick={()=>sendFeedback()} className="btn">Отправить</button>
            </div>
            <button className="popup-close" onClick={()=>updateModal(false)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.45868 6L11.5407 1.91797C11.7344 1.72458 11.8434 1.46215 11.8437 1.18841C11.8439 0.914677 11.7354 0.652056 11.542 0.458324C11.3486 0.264592 11.0862 0.155618 10.8124 0.155376C10.5387 0.155135 10.2761 0.263644 10.0824 0.457035L6.00032 4.53906L1.91829 0.457035C1.72456 0.263302 1.4618 0.154465 1.18782 0.154465C0.913845 0.154465 0.651088 0.263302 0.457355 0.457035C0.263623 0.650767 0.154785 0.913524 0.154785 1.1875C0.154785 1.46148 0.263623 1.72424 0.457355 1.91797L4.53939 6L0.457355 10.082C0.263623 10.2758 0.154785 10.5385 0.154785 10.8125C0.154785 11.0865 0.263623 11.3492 0.457355 11.543C0.651088 11.7367 0.913845 11.8455 1.18782 11.8455C1.4618 11.8455 1.72456 11.7367 1.91829 11.543L6.00032 7.46094L10.0824 11.543C10.2761 11.7367 10.5388 11.8455 10.8128 11.8455C11.0868 11.8455 11.3496 11.7367 11.5433 11.543C11.737 11.3492 11.8459 11.0865 11.8459 10.8125C11.8459 10.5385 11.737 10.2758 11.5433 10.082L7.45868 6Z"
                        fill="black" fill-opacity="0.19" />
                </svg>
            </button>
        </Modal>
    )
}

export default FeedBackModal;