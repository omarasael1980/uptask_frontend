import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"
 
const login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const { auth, setAuth, cargando} = useAuth()
  const navigate = useNavigate()
  
  const handleSubmit = async e =>{
    e.preventDefault()
    if([email, password].includes('')){
      setAlerta({
        msg: "Debes llenar todos los campos",  
        error:true
      })
      return
    }

    try {
      //se extrae el data de la consulta
      const {data} = await clienteAxios.post('/usuarios/login', {email, password})
       
      //limpiarAlertas
      setAlerta({})
      //guardar en localStorage el token
      localStorage.setItem('token', data.token)
      setAuth(data)
       
      setAlerta({
        msg: `Bienvenido ${data.nombre}`,
        error:false
      })
    setTimeout(()=>{
      navigate('/proyectos');
      
      setAlerta({})


    },3000)
    
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  const {msg}=alerta
  return (
    <>
     
     
      <h1 className="text-white font-black text-6xl capitalize">Inicia sesión y administra tus 
      <span className="text-primary">  proyectos</span>
      </h1>
      {msg && <div className="mt-10"><Alerta alerta={alerta}/></div>}
    <form 
      onSubmit={handleSubmit}
      className=" bg-white shadow mt-10 rounded-lg p-10">
      <div className="my-5 bg-white   " >
        <label  className="text-xl uppercase text-gray-300 block font-bold" htmlFor="email">Email:  </label>
        <input 
          type="email"
          placeholder="Email de registro"
          name="email"
          autoComplete="username"
          id="email"
          onChange={e=>setEmail(e.target.value)}
          value={email}
          className="text-xl  w-full mt-3 p-3 border rounded-xl bg-gray-50"
        />
      </div>
      <div className="my-5 bg-white   " >
        <label  className="text-xl uppercase text-gray-300 block font-bold" htmlFor="email">Password:  </label>
        <input 
          type="password"
          placeholder="Password de Registro "
          name="password"
          id="password"
          autoComplete="new-password"
          onChange={e=>setPassword(e.target.value)}
          value={password}
          className="text-xl  w-full mt-3 p-3 border rounded-xl bg-gray-50"
        />
      </div>
      <input type="submit" value="Iniciar Sesión" 
       className="bg-completedTask text-white w-full rounded-md py-2 mb-5
       hover:cursor-pointer hover:bg-completedTaskDark transition-colors uppercase font-bold" />
    </form>
     <nav className="lg:flex lg:justify-between">
        <Link
        className="block text-white text-center my-5 text-slate-500 uppercase text-xs"
        to="registrar"
        > No tienes una cuenta? Registrate </Link>
           <Link
        className="block text-center text-white my-5 text-slate-500 uppercase text-xs"
        to="olvide-password"
        > Olvide mi password </Link>
     </nav>

      
    </>
  )
}

export default login
