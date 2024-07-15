import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { LoginRequest, useLoginMutation } from '../../app/services/authService';
import { setCredentials } from './authSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const  [login, {isLoading}] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {setItem} = useLocalStorage("userToken");

    const  {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm();

    const onSubmit  = async (credentials:LoginRequest) => {
        try {
            const {token} = await login(credentials).unwrap();
            dispatch(setCredentials({token}));
            setItem(token);
            navigate("/dash");
            
        } catch (err) {
            console.log(err);
        }
    }
    if(isLoading) return <h1>Loading</h1>
    
    return (
        <div>
            <h1>LoginPage</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="username" placeholder="username"
                {...register("username", {required: true})}
                /><br />
                {errors.login && <span>This field is required</span>}<br /><br />
                <input type="password" name="password" placeholder="password"
                {...register('password', {required: true})}
                /><br />
                {errors.password && <span>This field is required</span>}
                <br /><br />
                <button type="submit" onClick={handleSubmit(onSubmit)}>Logar</button>
            </form>
        </div>
      )
}

export default Login