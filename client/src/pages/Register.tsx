import {fetchRegister} from '../redux/slices/UserSlice'
import React, {useState} from 'react'
import {useAppSelector} from '../redux/store'
import {useNavigate, Navigate} from 'react-router-dom'
import {useForm, SubmitHandler} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import '../styles/Register.scss'
export interface RegisterI {
    fullName: string,
    email: string,
    password: string,
    password2: string
}

const Register = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<RegisterI>();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [err, setErr] = useState<boolean>(false)
    const [validationErr, setValidationErr] = useState<boolean>(false)
    const isAuth = useAppSelector(state => state.auth.data)

    const onSubmit: SubmitHandler<RegisterI> = async (value) => {
        try {
            if (value.password === value.password2) {
                const data = await dispatch<any>(fetchRegister(value))
                if (!data.payload) {
                    return 'Неудалось зарегестрироваться'
                }
                if ('token' in data.payload) {
                    window.localStorage.setItem('token', data.payload.token);
                }
                navigate('/')
            } else {
                setValidationErr(true)
            }
        } catch (e) {
            console.log(e);
            setErr(true)
        }
    }
    if (isAuth) {
        return <Navigate to='/'/>
    }
    return (
        <div className='loginBG'>
            <div className='loginMain'>
                <h1 className='loginTitle'>Register</h1>
                <form className='signInputs' onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder='Email' autoComplete='off'
                           className='signInput' {...register("email", {required: true})} />
                    <input placeholder='FullName' autoComplete='off'
                           className='signInput' {...register("fullName", {required: true})} />
                    <input placeholder='Password' autoComplete='off'
                           className='signInput' {...register("password", {required: true})} />
                    <input placeholder='Repeat password' autoComplete='off'
                           className='signInput' {...register("password2", {required: true})} />
                    {validationErr && <p style={{color: 'white'}}>Passwords doesn't match</p>}
                    {err && <p style={{color: 'white'}}>Something went wrong</p>}
                    <button className='signBtn'>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register