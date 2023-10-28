import { useState, useEffect } from "react" 
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
const ConfirmAccount = () => {
  const [alerta, setAlerta]= useState({})
  const [cuentaConfirmada, setcuentaConfirmada] = useState(false)
  // recuperar token
  const params = useParams()
  const {id} = params
  useEffect(()=>{
    const confirmarCuenta = async () => {
      try {
              
        const url = `/usuarios/confirmar/${id}`
        const {data} = await clienteAxios(url) 
           
          setAlerta({
            msg: data.msg,
            error:false
          })
          setcuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    // usar en desarrollo para evitar dobre render
    return ()=>{confirmarCuenta()}
    //usar en produccion
   // confirmarCuenta()
  },[])
 const {msg} = alerta
  return (
    < >
      <h1 className="text-white font-black text-6xl capitalize">Confirma tu cuenta comienza a crear tus 
      <span className="text-primary">  proyectos</span>
      </h1>

    <div className="mt-20 md:mt-10  shadow-lg px-5 py-10 rounded bg-white">
      {msg && <Alerta alerta = {alerta}/>}
      {cuentaConfirmada && (
         <Link
         className="block text-teal text-center font-bold my-5 text-slate-500 uppercase text-xs"
         to="/"
         >   Inicia Sesión </Link>
            
      )}
      </div>

    </>
  )
}

export default ConfirmAccount
