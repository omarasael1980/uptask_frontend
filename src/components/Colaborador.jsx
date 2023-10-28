import useProyectos from "../hooks/useProyectos" 

const Colaborador = ({colaborador}) => {
    const {handleEliminarColaborador, modalEliminarColaborador}= useProyectos()
    const {nombre, email} = colaborador
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="uppercase font-bold text-completedTaskDark">{nombre}</p>
        <p className="text-sm text-text">{email}</p>
      </div>
      <div>
        <button type="button"
                onClick={()=>handleEliminarColaborador(colaborador)}
                className="bg-red px-4 py-3 text-white uppercase font-bold text-sm rounded-lg 
                hover:bg-completedTask ">
            Eliminar
        </button>
      </div>
    </div>
  )
}

export default Colaborador
