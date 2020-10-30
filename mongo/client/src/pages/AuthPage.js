import React, {useContext, useEffect, useState} from 'react';
import { useHttp } from '../hooks/useHttp';
import { useMessage } from '../hooks/useMessage';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    useEffect(() => {
        window.M && window.M.updateTextFields();
    }, []);
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const registerHandler = async () => {
        try {
            const data = await request('/auth/register', 'POST', { ...form });
            message(data.message);
        } catch (error) {}
    };
    const loginHandler = async () => {
        try {
            const data = await request('/auth/login', 'POST', { ...form });
            auth.login(data.token, data.userId);
        } catch (error) {}
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Link shortening</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: '10px'}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Login
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            disabled={loading}
                            onClick={registerHandler}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;