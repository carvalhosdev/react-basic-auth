import { Navigate, Outlet } from "react-router-dom";
import { usePersist } from "../../hooks/usePersist"

const PersistLogin = () => {

    const {isLoading, isError, isSuccess, getItem} = usePersist();

    let content:any;

    if(!getItem() && isError){
        content = <Navigate to="/" />
    }else if(isLoading){
        content = <h1>Loading...</h1>
    }else if(isSuccess){
        content = <Outlet />
    }

    return content;
}

export default PersistLogin