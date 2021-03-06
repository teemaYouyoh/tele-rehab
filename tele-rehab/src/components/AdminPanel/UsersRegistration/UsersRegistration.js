import React, {useEffect, useState} from "react";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

const UsersRegistration = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [msg, setMsg] = useState("");

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
                            setMsg("?????????????? ??????????????????????????????");
                            await getUsers();

                            await fetch(`https://tele-rehab-api.vps-touchit.space/success_registration`, {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body:  JSON.stringify(formData)
                            })
                                .then(async (res) =>{ console.log("Success")})
                                .catch((err) => { console.log(err) })

                            // success_registration
                        }).catch(err => console.log(err));
                    } else{
                        setMsg("???????????? ???????????? ???????? ???????????? 5 ????????????????")
                    }
                }
                else{
                    setMsg("?????????????? ???????????????????? email");
                }

            } else {
                setMsg("?????????????? ?????? ????????");
            }


        } else {
            setMsg("???????????????????????? ?? ?????????? email ?????? ????????????????????")
        }
    }

    return(
        <div className="user-registration">
            <FormControl>
                <TextField onChange={(e)=>setName(e.target.value)} id="outlined-basic" label="??????" variant="outlined" />
                <TextField onChange={(e)=>setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
                <TextField onChange={(e)=>setPassword(e.target.value)} id="outlined-basic" label="????????????" type="password"  variant="outlined" />
                <TextField onChange={(e)=>setPhone(e.target.value)} id="outlined-basic" label="??????????????" variant="outlined" />
                <TextField onChange={(e)=>setBirthday(e.target.value)} id="outlined-basic"  type="date" variant="outlined" />
                <TextField onChange={(e)=>setDiagnosis(e.target.value)} id="outlined-basic" label="??????????????" variant="outlined" />
                <Button onClick={()=>signUp()} variant="contained" color="primary" >
                    ????????????????????????????????
                </Button>
                <p className="message">{msg ? msg : ""}</p>
            </FormControl>
        </div>
    )
}

export default UsersRegistration;