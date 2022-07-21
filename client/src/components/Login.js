import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { setUserSession } from "../Utils/Common"
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    function handleLogin() {
        setError(null);
        setLoading(true);
        
        axios
            .post("/api/login", {
            username: username,
            password: password
    }).then(res => {
        setLoading(false);
        setUserSession(res.data.token, res.data.user);
        navigate("/cv");
    }).catch(error => {
        setLoading(false);
        if(error.response.status === 401 || 404) {
            setError(error.response.data.message);
        }
    })
    }

    return (
        <div className="login">
            <h2 className="section_name">Connexion</h2>

            <form className="login_form" method="POST">
                <div className="form_wrapper">
                    <label htmlFor="username">Nom de l'utilisateur</label>
                    <input
                        name="username"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        />
                </div>

                <div className="form_wrapper">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                </div>

                {error && <div className="error">{error}</div>}

                <input 
                    type="button"
                    className="submit"
                    value={loading ? "Chargement..." : 'login'}
                    disabled={loading}
                    onClick={handleLogin}
                    />
            </form>
        </div>
    )
}

export default Login