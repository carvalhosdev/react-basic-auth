import { Outlet } from "react-router-dom"

const Privatelayout = () => {
  return (
    <div>
        <h2>Header Private Layout</h2>
        <Outlet />
    </div>
  )
}

export default Privatelayout