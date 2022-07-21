import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [error, setError] = useState(null);

    let navigate = useNavigate();

    const register = () => {
        setError(null);

        axios
            .post('/api/users', {
                username: usernameReg, 
                password: passwordReg 
            }).then((res) => {
                // console.log(res);
                navigate("/cv");
            }).catch(error => {
                if(error.response.status === 400 || 401) {
                    setError(error.response.data.message);
                }
            })
    }

    return (
        <div className="registration">
            <h2 className="section_name">Inscription</h2>
            
            <form className="register_form" method="POST">
                <div className="form_wrapper">
                    <label htmlFor="username">Nom de l'utilisateur</label>
                    <input 
                        type="text" 
                        name="username" 
                        onChange={e => {
                            setUsernameReg(e.target.value)
                        }}
                        />
                </div>
                
                <div className="form_wrapper">
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={e => {
                            setPasswordReg(e.target.value)
                        }}
                        />
                </div>

                {error && <div className="error">{error}</div>}
                
                <input 
                    type="button" 
                    className="submit" 
                    value="S'inscrire"
                    onClick={register} 
                    />
            </form>
        </div>
    )
}

export default Register;