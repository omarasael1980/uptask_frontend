import { useState } from "react" 
import { Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"
 


const ForgotPassword = () => {
  const [email, setEmail]=useState('')
  const [alerta, setAlerta]=useState({})
 
  const handleSubmit = async(e)=>{
    e.preventDefault()
 
    //validar que se escriba algo en el campo email 
    if(email=='' || email.length<6) {
      setAlerta({
        msg: 'Debes escribir un email válido',
        error: true
      })
      return
    }
           
    try {
      const data = await clienteAxios.post(`/usuarios/olvide-password`,{email})
     
      setEmail('')
      setAlerta({
        msg: data.data.msg,
        error: false
      })
    } catch (error) {
       
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
    }
  }
  const {msg} = alerta
 
  return (
    < >
      <h1 className="text-white font-black text-6xl capitalize">Recupera tu acceso y administra tus 
      <span className="text-primary">  proyectos</span>
      </h1>
       <div className="mt-10"> {msg && <Alerta alerta={alerta}/>} </div>
      <form 
        onSubmit={handleSubmit}
        className=" bg-white shadow mt-10 rounded-lg p-10">
        
        <div className="my-5 bg-white   " >
          <label  className="text-xl uppercase text-gray-300 block font-bold" htmlFor="email">Email:  </label>
          <input 
            type="email"
            placeholder="Email de registro"
            name="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            id="email"
            className="text-xl  w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        
        <input type="submit" value="Recuperar password" 
        className="bg-completedTask text-white w-full rounded-md py-2 mb-5
        hover:cursor-pointer hover:bg-completedTaskDark transition-colors uppercase font-bold"/>
      </form>
      <nav className="lg:flex lg:justify-between">
          <Link
          className="block text-white text-center my-5 text-slate-500 uppercase text-xs"
          to="/"
          > Ya tienes una cuenta? Inicia Sesión </Link>
            <Link
          className="block text-center text-white my-5 text-slate-500 uppercase text-xs"
          to="/registrar"
          > No tienes cuenta? Registrate</Link>
      </nav>
    </>
  )
}

export default ForgotPassword
