import { useDispatch } from "react-redux"
import { useLocalStorage } from "./useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setCredentials } from "../features/auth/authSlice";
import { useGetUserDetailMutation } from "../app/services/authService";

export const usePersist = (redirect:string|null = null) =>{

    const dispatch = useDispatch();
    const {getItem} = useLocalStorage('userToken');
    const navigate = useNavigate();
    const [getUserDetail, {data, isLoading, isError, isSuccess}] = useGetUserDetailMutation();

    useEffect(() => {
        dispatch(setCredentials({token: getItem()}));
        const checkLogin = async() => {
            const {data} = await getUserDetail(null)
            if(data && redirect){
                navigate(redirect)
            }
        }
        checkLogin()

    }, [dispatch])


    return {data, isLoading, isError, isSuccess, getItem}

}