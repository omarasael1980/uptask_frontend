import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
    useProyectos();
  const admin = useAdmin();
  const { nombre, descripcion, fechaEntrega, prioridad, estado, _id } = tarea;
 
  return (
    <div className="border-b p-5 flex  uppercase justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-textSecondary   ">{descripcion}</p>
        <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-sm text-textSecondary  ">{prioridad}</p>
        {estado &&  <p className="mb-1 text-white bg-completedTask p-1 rounded-lg text-xs ">Completada por: {tarea.completado.nombre}</p>}
       
      </div>
      <div className="flex gap-2 flex-col md:flex-row items-center">
        {admin && (
          <button
            onClick={() => handleModalEditarTarea(tarea)}
            className="bg-textSecondary   m-3 text-white font-bold  hover:bg-completedTask
          transition-colors rounded-lg uppercase cursor-pointer p-2 text-sm"
          >
            Editar
          </button>
        )}
        <button
          onClick={() => completarTarea(_id)}
          className={`${
            estado ? "bg-secondary" : "bg-warning"
          }  m-3 text-white font-bold  hover:bg-completedTask
  transition-colors rounded-lg uppercase cursor-pointer p-2 text-sm`}
        >
          {estado ? "Terminada" : "Incompleta"}
        </button>

        {admin && (
          <button
            onClick={() => handleModalEliminarTarea(tarea)}
            className="bg-primary  m-3  mb-2 text-white font-bold  hover:bg-completedTask
          transition-colors rounded-lg uppercase cursor-pointer p-2 text-sm"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
