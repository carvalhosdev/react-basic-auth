import Login from "../features/auth/Login"
import { usePersist } from "../hooks/usePersist";

const HomePage = () => {

  usePersist("/dash");

  return (
    <>
        <Login />
    </>
  )
}

export default HomePage