import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"


const FormularioProyecto = () => {
        //id para saber si es actualizacion o nuevo elemento
    const [id, setId]= useState(null)
    const [nombre, setNombre]=useState("")
    const [descripcion, setDescripcion]=useState("")
    const [fechaEntrega, setFechaEntrega]=useState("")
    const [cliente, setCliente]=useState("")
    const {mostrarAlerta, alerta, submitProyecto, proyecto}= useProyectos()
    const {msg} = alerta
    
    //si hay params.id entonces es edicion, sino es creacion
    const params=useParams()
     
    //verifica si es edicion
    useEffect(()=>{
        if(params.id  ){
            //es edicion
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
             
        } 
    },[params])
    const handleSubmit = async(e) => {
        e.preventDefault()
        //validando formulario
        //si esta vacio un campo se lanza la alerta
        if([nombre, descripcion, fechaEntrega,cliente].includes("")){
            mostrarAlerta({
                msg:'Todos los campos son obligatorios',
                error: true,
            })
            return
        }
        //pasar los datos al provider
        await  submitProyecto({id,nombre, descripcion, fechaEntrega, cliente})
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')

    }
   
  return (
    
        <form 
            onSubmit={handleSubmit}
            className="text-textSecondary bg-background   w-full  md:w-1/2 rounded-lg ">
                {msg && <Alerta alerta = {alerta}/>}
            <div className="mb-5"  >
                <label 
                    className="text-primary uppercase font-bold text-sm"
                    htmlFor="nombre">
                        Nombre Proyecto
                </label>
                <input 
                        type="text" 
                        onChange={e=>setNombre(e.target.value)}
                        className="border-2 w-full p-2 mt-2 placeholder-textSecondary rounded-md"
                        name="nombre" 
                        value={nombre}
                        placeholder="Nombre del proyecto"
                        id="nombre" />
            </div>
            <div className="mb-5">
                <label 
                    className="text-primary uppercase font-bold text-sm"
                    htmlFor="descripcion">
                        Descripcion del Proyecto
                </label>
                <textarea 
                        
                        onChange={e=>setDescripcion(e.target.value)}
                        className="border-2 w-full p-2 mt-2 placeholder-textSecondary rounded-md"
                        name="descripcion" 
                        value={descripcion}
                        placeholder="Descripcion del proyecto"
                        id="descripcion" />
            </div>
            <div className="mb-5">
                <label 
                    className="text-primary uppercase font-bold text-sm"
                    htmlFor="fecha-entrega">
                        Fecha de Entrega del Proyecto
                </label>
                <input 
                        type="date" 
                        onChange={e=>setFechaEntrega(e.target.value)}
                        className="border-2 w-full p-2 mt-2 placeholder-textSecondary rounded-md"
                        name="fecha-entrega" 
                        value={fechaEntrega}
                        id="fecha-entrega" />
            </div>
            <div className="mb-5">
                <label 
                    className="text-primary uppercase font-bold text-sm"
                    htmlFor="cliente">
                        Nombre del Cliente
                </label>
                <input 
                        type="text" 
                        onChange={e=>setCliente(e.target.value)}
                        className="border-2 w-full p-2 mt-2 placeholder-textSecondary rounded-md"
                        name="cliente" 
                        value={cliente}
                        placeholder="Nombre del cliente"
                        id="cliente" />
            </div>
            <input 
                    type="submit"
                    className="bg-primary w-full p-3 text-white uppercase font-bold text-center 
                    rounded-md shadow-md  block mt-5 hover:bg-warning hover:text-black transition-colors"
                    value={id ? "Actualizar Proyecto": "Crear Proyecto"} />
        </form>
     
  )
}

export default FormularioProyecto
