import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PreviewProyecto = ({proyecto}) => {
  const {auth} = useAuth()
  const {nombre, creador, cliente, _id}= proyecto
 
   
  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
       <div className="flex items-center gap 2">
       <p className="flex-1">
          {nombre }
          <span className="text-sm uppercase font-bold text-completedTask">
              {' '}{cliente}
          </span>
        </p>
        {auth._id !== creador && (
          <p className="p-1 m-2 text-sm rounded-lg text-white bg-secondary font-bold uppercase">Colaborador</p>
        )}
        

       </div>
        <Link 
          to={`${_id}`}
          className="uppercase text-text   text-sm font-bold hover:text-completedTask"
          >
            Ver Proyecto
        </Link>
    </div>
  )
}

export default PreviewProyecto
