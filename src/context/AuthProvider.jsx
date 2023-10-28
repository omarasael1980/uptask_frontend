import {useState, useEffect, createContext} from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
const AuthContext = createContext()
const AuthProvider =({children})=>{
    const [auth, setAuth]= useState({})
    const [cargando, setCargando] = useState(true)
    const navigate  = useNavigate()
    useEffect(()=>{
        const autenticarUsuario = async ()=>{
            const token = localStorage.getItem('token')
            if(!token){
                //para que permita continuar el flujo
              setCargando(false)
                return
            }
           //configuracion para mandar el token de autorizacion
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
              
                const {data} = await clienteAxios('/usuarios/perfil', config)
                
               // console.log('Desde autenticacion',data.usuario)
                setAuth(data.usuario)
               
                //si esta logeado te lleva a los proyectos directamente
                //navigate("/proyectos")
               
            } catch (error) {
               // setAuth({})
                console.log('Error:',error.response)
            }finally{
                setCargando(false)
            }
         

          
        }
        // pendiente quitar en produccion
        //autenticarUsuario()
        return ()=>autenticarUsuario()
   
    },[])
    const cerrarSesionAuth = ()=>{
        setAuth({})
    }
    return(
        <AuthContext.Provider
            value={{
                 setAuth,
                 auth, 
                 cargando,
                 cerrarSesionAuth
                 
            }}>
            {children}
        </AuthContext.Provider> 
    )
}

export{
    AuthProvider
}
export default AuthContext