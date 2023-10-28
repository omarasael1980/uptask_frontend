import { useState } from "react";
import Alerta from "./Alerta";
import useProyectos from "../hooks/useProyectos";
const FormularioColaborador = () => {
 
    const [email, setEmail] = useState('')
    const {alerta, mostrarAlerta, submitColaborador} = useProyectos()
    const handleSubmit = e=>{
        e.preventDefault()
        //si esta vacio se lanza alerta
        if(email==''){
            mostrarAlerta({
                msg: 'Debes escribir un email',
                error: true
            })
            return
        }
        //en caso contrario
        submitColaborador(email)
    }
    const {msg} = alerta
  return (
    <div className="text-white font-extrabold  lg:w-1/2  md:w-1/2 rounded-lg">
       {msg && <Alerta alerta={alerta}  />} 
      <form 
        onSubmit={handleSubmit}
        className="bg-white mt-10 py-10 px-5 rounded-10 w-full shadow rounded-lg">
        <div className="mb-5">
           
            <label
              htmlFor="email"
              className="text-textSecondary uppercase font-bold text-sm"
            >
             Email Colaborador
            </label>
            <input
              id="email"
              placeholder="Email del ususario colaborador"
              className="border w-full p-2 mt-2 placeholder-text text-black rounded-md border-pendingTask"
              type="email"
              value={email}
              onChange={ e=>setEmail(e.target.value) }
            />
           
        </div>
        <input 
                                                className='bg-primary text-white font-bold w-full hover:bg-completedTask
                                                transition-colors rounded-lg uppercase cursor-pointer p-2 text-sm'
                                                type="submit" 
                                                value='Buscar Colaborador'
                                                 />
      </form>
    </div>
  );
};

export default FormularioColaborador;
