import './login.css'
import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api.js'
import openEye from "../../assets/svgs/eye-open.svg"
import closeEye from "../../assets/svgs/eye-close.svg"
import logoWithName from "../../assets/logo/logo_with_name.svg"
function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: '',
        password: '',
        statePage : 'idle' // idle | checking | error
    })
    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: '',
    })
    const [passwordOpen, setPasswordOpen] = useState(false)
    const handleChangeForm = (e) => {
        const name = e.target.name
        const value = e.target.value

        setForm((form) => {
            return {
                ...form,
                [name]: value
            }
        })
    }
    useEffect(() => {
        console.log(errors);
    }, [errors])

    const handleError = (err) => {
    if (err.response) {
        console.log(err.response.status);
        
        switch (err.response.status) {
        case 401:
            return setErrors((err) => {
                return {
                    ...err,
                    passwordError: 'The email address or password you entered isn\'t connected to an account.'
                }
            }
            )
        case 500:
            return setErrors((err) => {
                return {
                    ...err,
                    passwordError: 'Server error, please try again later'
                }
            }
            )
        default:
            return setErrors((err) => {
                return {
                    ...err,
                    passwordError: 'Something went wrong'
                }
            }
            )
        }
    }
    return 'Check your internet connection';
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({
            emailError: '',
            passwordError: '',
        })
        setForm((prev) => {
            return {
                ...prev,
                statePage : 'waiting'
            }
        })
        try {
            const res = await api.post('/login', form)

            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            console.log(res.data)
            navigate("/discover")
        } catch (err) {
            handleError(err)
            setForm((prev) => {
            return {
                ...prev,
                statePage : 'error'
            }
        })
        }
    }
    return (
        <div className={`login-page`}>
            <div className="left-section">
                <h2 className="title">Log Into Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="container-input email">
                        <label htmlFor="email">Email</label>
                        <input name="email" type="text" onChange={(e) => handleChangeForm(e)} value={form.email} />
                    </div>
                    {errors.emailError !== "" && <p className="error">{errors.emailError}</p>}
                    <div className="container-input password">
                        <label htmlFor="first-name">Password</label>
                        <input type={passwordOpen ? 'text' : 'password'} onChange={(e) => handleChangeForm(e)} value={form.password} name='password' />
                        <img className='password-eye' src={!passwordOpen ? closeEye : openEye} alt="eye" onClick={() => setPasswordOpen(!passwordOpen)} />
                    </div>
                    {errors.passwordError !== "" && <p className="error">{errors.passwordError}</p>}
                    <div className="button-section">
                        <div className={`waiting-icon ${form.statePage === "waiting" ? "waiting" : undefined}`}></div>
                        <button type="submit" className={`${form.statePage === "waiting" ? "waiting" : undefined}`}>Log In</button>
                        <div className="bottom-button-section">
                            <p>Dont Have Account?<span onClick = {() => navigate('/register')}> Register</span></p>
                        </div>
                    </div>

                </form>
            </div>
            <div className="right-section">
                <img src={logoWithName} className="logo-with-name" alt="AfroCommunity Logo" />
                <h1>Wecolme Back</h1>
            </div>

        </div>
    )
}

export default Login