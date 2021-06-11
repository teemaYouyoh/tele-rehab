import React, {useEffect, useState} from "react";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import ModalCustom from "../../Modal/Modal";
import InputMask from "react-input-mask";

const UsersRegistration = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [msg, setMsg] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(async ()=>{
        await getUsers();
    }, [])

    async function getUsers(){
        const response = await fetch(`https://tele-rehab-api.vps-touchit.space/users/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        let data = await response.json();

        setUsers(data);
    }

    function updateModal(value) {
        setIsOpen(value);
    }

    async function signUp(){
        const result = users.every(item => item.email !== email);
        let emailValidation = email.indexOf("@") !== -1 && email.indexOf(".") !== -1;
        if(result){
            if(name && email && password && phone && birthday && diagnosis){
                if(emailValidation) {
                    if(password.length > 5){
                        const formData = {
                            name,
                            email,
                            password,
                            phone,
                            birthday,
                            diagnosis,
                        }
                        const response = await fetch(`https://tele-rehab-api.vps-touchit.space/users/`, {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(formData)
                        }).then(async (res) => {
                            setMsg("Успешно зарегестрирован");
                            await getUsers();

                            await fetch(`https://tele-rehab-api.vps-touchit.space/success_registration`, {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body:  JSON.stringify(formData)
                            })
                                .then(async (res) =>{
                                    console.log("Success");
                                    await setIsOpen(true);
                                    // const mailData = {
                                    //     email,
                                    //     password,
                                    //     name
                                    // }
                                    // await fetch(`http://localhost:3001/registration_mail`, {
                                    //     method: 'POST',
                                    //     mode: 'cors',
                                    //     headers: {
                                    //         'Content-Type': 'application/json'
                                    //     },
                                    //     body:  JSON.stringify(mailData)
                                    // })
                                })
                                .catch((err) => { console.log(err) })

                            // success_registration
                        }).catch(err => console.log(err));
                    } else{
                        setMsg("Пароль должен быть больше 5 символов")
                    }
                }
                else{
                    setMsg("Введите правильный email");
                }

            } else {
                setMsg("Введите все поля");
            }


        } else {
            setMsg("Пользователь с таким email уже существует")
        }
    }

    return(
        <div className="user-registration">
            <FormControl>
                <TextField onChange={(e)=>setName(e.target.value)} id="outlined-basic" label="ФИО" variant="outlined" />
                <TextField onChange={(e)=>setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
                <TextField onChange={(e)=>setPassword(e.target.value)} id="outlined-basic" label="Пароль" type="password"  variant="outlined" />
                {/*<TextField onChange={(e)=>setPhone(e.target.value)} id="outlined-basic" label="Телефон" variant="outlined" />*/}
                <InputMask
                    mask="+38(999)-999-9999"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    id="outlined-basic"
                    name="phone"
                    className={"input-phone-reg"}
                    placeholder="Номер телефона"
                />
                <TextField onChange={(e)=>setBirthday(e.target.value)} id="outlined-basic"  type="date" variant="outlined" />
                <TextField onChange={(e)=>setDiagnosis(e.target.value)} id="outlined-basic" label="Диагноз" variant="outlined" />
                <Button onClick={()=>signUp()} variant="contained" color="primary" >
                    Зарегестрировать
                </Button>
                <p className="message">{msg ? msg : ""}</p>
            </FormControl>

            <ModalCustom
                title = {"Пользователь успешно зарегестрирован!"}
                buttonText = {"Ок"}
                buttonClick = {updateModal}
                updateModal = {updateModal}
                isOpen={isOpen}
                svg={false}
            />
        </div>
    )
}

export default UsersRegistration;