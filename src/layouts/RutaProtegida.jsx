import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/Header"
import SideBar from "../components/SideBar"

import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {
    const {auth, cargando}= useAuth()
  

   if(cargando){return 'Cargando...'}
  return (
    <>
        {auth._id ? (
          <div className="bg-indigo">

          <Header/>
          <div className="md:flex md:min-h-screen ">
            <SideBar/>
            <main className="p-10 flex-1">
              <Outlet/>
            </main>
          </div>
          </div>
            ) : <Navigate to='/'/>}
      
    </>
  )
}

export default RutaProtegida
