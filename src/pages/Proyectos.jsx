 
import useProyectos from "../hooks/useProyectos" 
import PreviewProyecto from "../components/PreviewProyecto"
import Alerta from "../components/Alerta"
 

const Proyectos = () => {
  const {proyectos, alerta} = useProyectos()

 
   const {msg} = alerta
  
  return (
    < >
    <div className="m-10 ">{msg && <Alerta alerta={alerta}/>}</div>
      <h1 className="text-4xl text-background font-extrabold">Proyectos</h1>
      <div className="bg-background shadow-md mt-10 rounded-lg   ">
        {proyectos?.length ? (
          proyectos.map(proyecto=>(
            <PreviewProyecto    
                key= {proyecto._id}
                proyecto = {proyecto}
                
                />
          ))
        ): <p className="mt-5 text-center text-teal p-5
        uppercase">No hay proyectos</p>}
      </div>
    </>
  )
}

export default Proyectos
