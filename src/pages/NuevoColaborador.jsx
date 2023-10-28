import { useEffect } from "react"
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
const NuevoColaborador = () => {
    const params =useParams()
    const {obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta}=useProyectos()
    useEffect(()=>{

     obtenerProyecto(params.id)
    },[])
    const {_id, nombre, email} = colaborador
    if(!proyecto._id) return <Alerta alerta = {alerta}/>
 return cargando ? (
    //mientras carga se ve animacion
    <div className="bg-background rounded-lg flex-1">
      <button
        type="button"
        className="  text-completedTask font-bold  items-center text-5xl text-center flex justify-between p-5 rounded-md"
        disabled
      >
        <img
          src="\src\assets\images\wait.gif"
          alt="wait"
          className="w-20 h-20 animate-bounce"
        />
        {"     "}Procesando
      </button>
    </div>
  ) : (
    < >
    <h1 className="text-2xl font-bold text-white"> Añadir Colaborador(a) al proyecto:
    <span className="text-warning font-bold uppercase"> {`${proyecto.nombre}`} </span>
    </h1>
    <div className="mt-10 flex justify-center">
    <FormularioColaborador
    
    />
    </div>
    {_id && (
        <div className="flex justify-center w-full mt-10 ">
            <div className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow">
                <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>
                <div className="flex justify-between items-center">
                    <p className="uppercase ">{nombre}</p>
                    <button onClick={()=>agregarColaborador({
                        email, nombre, _id  
                    })}
                            type="button"
                            className='bg-primary text-white font-bold px-5 hover:bg-completedTask
                            transition-colors rounded-lg uppercase cursor-pointer py-2 text-sm '>Agregar</button>

                </div>
            </div>
        </div>
    )}
    </>
  )
}

export default NuevoColaborador
