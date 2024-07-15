import  {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import PersistLogin from './features/auth/PersistLogin'
import Prefetch from './features/auth/Prefetch'
import DashPage from './pages/DashPage'
import Privatelayout from './layouts/Privatelayout'
const App = () => {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route element={<Privatelayout />}>
              <Route element={<PersistLogin />}>
                  <Route element={<Prefetch />} >
                      <Route path='dash' element={<DashPage />} />
                  </Route>
              </Route>
            </Route>
        </Route>
      </>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App