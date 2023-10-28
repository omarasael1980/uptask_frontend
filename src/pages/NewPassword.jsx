import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const newPassword = () => {
  const [passwordModificado, setPasswordModificado] =useState(false)
  const [password, setpassword] =useState('')
  const [ cpassword, setCPassword ] = useState('')
  const [tokenValido,setTokenValido]=useState(false)
  const [alerta, setAlerta]=useState({})
  const params = useParams()
  const {token} = params
  
  useEffect(()=>{

    const comprobarToken =async () => {
      try {
        
         await clienteAxios(`/usuarios/olvide-password/${token}`)
         setTokenValido(true)
      } catch (error) {
         
       
        setAlerta({
        msg:error.response.data.msg,
        error:true
       })
      }
    }
    //todo: cambiar cuando se manda a produccion
    return ()=>comprobarToken()
    //comprobarToken()
  },[]) 
   
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    //validar campos vacios
    if(password === '' || cpassword === '' ){
      setAlerta({
        msg: 'Debes llenar todos los campos',
        error:true
      })
      return
    }
    //validar que sean iguales los passwords
    if(password !== cpassword){
      setAlerta({
        msg: 'Los password no son iguales',
        error:true
      })
      
      setpassword('')
      setCPassword('')
      
      return
    }
    //longitud de password
    if(password.length<6){
      setAlerta({
        msg: 'El password debe ser de al menos 6 caracteres',
        error:true
      })
      setpassword('')
      setCPassword('')
      return

    }
    //enviar password a la API
    try {
      const url = `/usuarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url,{password})
      setAlerta({
        msg: data.msg,
        error:false
      })
      setpassword('')
      setCPassword('')
      setTokenValido(false)
      setPasswordModificado(true)

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }
  const {msg} =alerta
  return (
    < >
    
    <h1 className="text-white font-black text-6xl capitalize">Restablece tu password y administra tus 
      <span className="text-primary">  proyectos</span>
      </h1>
      <div className="mt-10">{msg && <Alerta alerta={alerta}/>}</div> 
      {tokenValido && (
          <form 
            onSubmit={handleSubmit}
            className=" bg-white shadow mt-10 rounded-lg p-10">
        
          <div className="my-5 bg-white   " >
            <label  className="text-xl uppercase text-gray-300 block font-bold" htmlFor="password">Nuevo password:  </label>
            <input 
              type="password"
              placeholder="Tu nuevo password"
              name="password"
              onChange={e=>setpassword(e.target.value)}
              value={password}
              id="password"
              autoComplete="newPassword"
              className="text-xl  w-full mt-3 p-3 border rounded-xl bg-gray-50"
            />
          </div>
          <div className="my-5 bg-white   " >
            <label  className="text-xl uppercase text-gray-300 block font-bold" htmlFor="password2">Confirma tu  password:  </label>
            <input 
              type="password"
              placeholder="Repite tu password "
              name="password2"
              autoComplete="new-password"
              onChange={e=>setCPassword(e.target.value)}
              value={cpassword}
              id="password2"
              className="text-xl  w-full mt-3 p-3 border rounded-xl bg-gray-50"
            />
          </div>
          <input type="submit" value="Guardar nuevo password" 
          className="bg-completedTask text-white w-full rounded-md py-2 mb-5
          hover:cursor-pointer hover:bg-completedTaskDark transition-colors uppercase font-bold" />
        </form>
      )}
       {passwordModificado && (
         <Link
         className="block text-teal text-center font-bold my-5 text-slate-500 uppercase text-xs"
         to="/"
         >   Inicia Sesión </Link>
            
      )}
    
    </>
  )
}

export default newPassword
