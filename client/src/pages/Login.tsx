import React, {useState} from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import {useAppDispatch, useAppSelector} from "../redux/store";
import {fetchAuth} from "../redux/slices/UserSlice";
import {Navigate, useNavigate} from 'react-router-dom';
import '../styles/Login.scss'
export interface LoginI {
    email: string,
    password: string,
}

const Login = () => {
    const dispatch = useAppDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm<LoginI>();
    const [err, setErr] = useState<boolean>(false)
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.auth.data)

    const onSubmit: SubmitHandler<LoginI> = async (value) => {
        try {
            const data = await dispatch<any>(fetchAuth(value))
            if (!data.payload) {
                return 'Неудалось войти в аккаунт'
            }
            if ('token' in data.payload) {
                window.localStorage.setItem('token', data.payload.token);
            }
            navigate('/')

        } catch (e) {
            setErr(true)
            console.log(e)
        }
    }
    if (isAuth) {
        return <Navigate to='/'/>
    }
    return (
        <div className='loginBG'>
            <div className='loginMain'>
                <h1 className='loginTitle'>Login</h1>
                <form className='signInputs' onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder='Email' autoComplete='off'
                           className='signInput' {...register("email", {required: true})} />
                    <input placeholder='Password' autoComplete='off'
                           className='signInput' {...register("password", {required: true})} />
                    <button className='signBtn'>Login</button>
                    {err && 'Something went wrong'}
                </form>
            </div>
        </div>

    )
}

export default Login