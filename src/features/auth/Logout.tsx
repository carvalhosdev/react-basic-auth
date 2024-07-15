import { useDispatch } from "react-redux"
import { logout } from "./authSlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();
    const {removeItem} = useLocalStorage('userToken');
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout())
        removeItem();
        navigate("/");
    }
    return (
    <div>
        <button onClick={handleLogout}>Sair</button>
    </div>
    )
}

export default Logout