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
        password: ''
    })
    const [errors, setErrors] = useState({
        emailEmpty: '',
        passwordEmpty: '',
    })
    const [passwordOpen, setPasswordOpen] = useState(false)
    const handleChangeForm = (e) => {
        const name = e.target.name
        const value = e.target.value
        console.log(value);

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


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({
            emailEmpty: '',
            passwordEmpty: '',
        })
        if (form.email === "") {
            setErrors((err) => {
                return {
                    ...err,
                    emailEmpty: 'Email Must Be Not empty'
                }

            }
            )
        }
        if (form.password === "") {
            setErrors((err) => {
                return {
                    ...err,
                    passwordEmpty: 'Password Must Be Not empty'
                }
            }
            )
        }
        try {
            const res = await api.post('/login', form)

            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            console.log(res.data)
            navigate("/discover")
        } catch (err) {
            console.log(err.response?.data || err.message)
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
                    {errors.emailEmpty !== "" && <p className="error">{errors.emailEmpty}</p>}
                    <div className="container-input password">
                        <label htmlFor="first-name">Password</label>
                        <input type={passwordOpen ? 'text' : 'password'} onChange={(e) => handleChangeForm(e)} value={form.password} name='password' />
                        <img className='password-eye' src={!passwordOpen ? closeEye : openEye} alt="eye" onClick={() => setPasswordOpen(!passwordOpen)} />
                    </div>
                    {errors.passwordEmpty !== "" && <p className="error">{errors.passwordEmpty}</p>}
                    <div className="button-section">
                        <button type="submit">Log In</button>
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