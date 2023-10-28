import { useState } from "react" 
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"

const Register = () => {
  const [name, setName]=useState("")
  const [email  , setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [repeatPassword, setRepeatPassword]=useState("")
  const [alerta, setAlerta]=useState({})
  const handleSubmit= async(e)=>{
    e.preventDefault()
    //verificar campos vacios
    if([email, password, repeatPassword,name].includes("")){
       setAlerta(
        {
          msg: "Todos los campos son obligatorios",
          error:true,
        }
       )
       return
    }
    //validar password
    if(password !== repeatPassword){
      setAlerta(
        {
          msg: "Las contraseñas no son iguales",
          error:true,
        }
       )
       return
    }
    //validar password longitud
    if(password.length <6){
      setAlerta(
        {
          msg: "Las contraseña es muy corta",
          error:true,
        }
       )
       return
    }

    setAlerta({})
    //Crear usuario en API 
    
    try {
      
      const {data}  =  await clienteAxios.post(
        `/usuarios`, {
        "nombre": name, 
        "email": email,
        "password": password


        })
        setAlerta({
          msg: data.msg,
          error: false
        })
        //limpiar 
        setName("")
        setEmail("")
        setPassword("")
        setRepeatPassword('')

    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error: true
      })
    }
  }
  const {msg}= alerta
  return (
    < >
    
    <h1 className="text-white font-black text-6xl capitalize mb-5">Crea tu cuenta y administra tus 
      <span className="text-primary ">  proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta}/>}
    <form 
      onSubmit={handleSubmit}
      className=" bg-white shadow mt-10 rounded-lg p-10">
      <div className="my-5 bg-white   " >
          <label  className="text-xl uppercase text-gray-300 block font-bold" htmlFor="nombre">Nombre:  </label>
          <input 
            type="text"
            placeholder="Ejemplo: Walter White"
            name="nombre"
            id="nombre"
            value={name}
            onChange={e=>setName(e.target.value)}
            className="text-xl  w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
      <div className="my-5 bg-white   " >
        <label  className="text-xl uppercase text-gray-300 block font-bold" htmlFor="email">Email:  </label>
        <input 
          type="email"
          placeholder="Email de registro"
          name="email"
          autoComplete="username"
          id="email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          className="text-xl  w-full mt-3 p-3 border rounded-xl bg-gray-50"
        />
      </div>
      <div className="my-5 bg-white   " >
        <label  className="text-xl uppercase text-gray-300 block font-bold" htmlFor="password">Password:  </label>
        <input 
          type="password"
          placeholder="Password de Registro "
          name="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
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
          id="password2"
          value={repeatPassword}
          onChange={e=>setRepeatPassword(e.target.value)}
          className="text-xl  w-full mt-3 p-3 border rounded-xl bg-gray-50"
        />
      </div>
      <input type="submit" value="Crear Cuenta" 
       className="bg-completedTask text-white w-full rounded-md py-2 mb-5
       hover:cursor-pointer hover:bg-completedTaskDark transition-colors uppercase font-bold" />
    </form>
     <nav className="lg:flex lg:justify-between">
        <Link
        className="block text-white text-center my-5 text-slate-500 uppercase text-xs"
        to="/"
        > Ya tienes una cuenta? Inicia Sesión </Link>
           <Link
        className="block text-center text-white my-5 text-slate-500 uppercase text-xs"
        to="/olvide-password"
        > Olvide mi password </Link>
     </nav>
    </>
  )
}

export default Register
