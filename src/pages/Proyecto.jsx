import { useParams, Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import { useEffect } from "react";
import useAdmin from "../hooks/useAdmin";
import ModalNuevaTarea from "../components/ModalNuevaTarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import Colaborador from "../components/Colaborador";
import Tarea from "../components/Tarea";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import io from "socket.io-client";

let socket;
const Proyecto = () => {
  const params = useParams();

  const {
    obtenerProyecto,
    proyecto,
    cargando,
    handleModalTarea,
    submitTareasProyecto,
    eliminarTareaProyecto,
    editarTareaProyecto,
    actualizarEstadoTarea
  } = useProyectos();
  const admin = useAdmin();

  // el useEffect recupera el id de la url
  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);
  //useeffect para conectar a socket io
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    //emitir evento Abrir proyecto
    socket.emit("abrir proyecto", params.id);
  }, []);
  useEffect(() => {
    socket.on("tarea agregada", (tareaGuardada) => {
      if (tareaGuardada.proyectoAsociado === proyecto._id) {
        submitTareasProyecto(tareaGuardada);
      }
    
    });
    socket.on("tarea eliminada", (tareaEliminada) => {
      if (tareaEliminada.proyectoAsociado === proyecto._id) {
        eliminarTareaProyecto(tareaEliminada);
      }
    });
    socket.on('tarea actualizada', tarea=>{
       
      if(tarea.proyectoAsociado._id== proyecto._id){
        editarTareaProyecto(tarea)

      }
     
    })
    socket.on('estado actualizado', estadoActualizado=>{
       
      if(estadoActualizado.proyectoAsociado._id == proyecto._id){
         
        actualizarEstadoTarea(estadoActualizado)
      }
      
    })
  });

  //obteniendo datos del proyecto

  const { nombre } = proyecto;

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
    <>
      <div className="bg-background rounded-lg p-10 flex justify-between">
        <h1 className="font-black text-4xl uppercase">{`Proyecto: ${nombre}`}</h1>
        {/* boton editar solo los administradores lo pueden ver */}
        {admin && (
          <div className="flex items-center justify-between gap-4 font-bold text-textSecondary hover:text-completedTask ">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
            <Link
              className="uppercase font-bold"
              to={`/proyectos/editar/${params.id}`}
            >
              Editar
            </Link>
          </div>
        )}
      </div>
      {/* <div className="mt-10   ">    {msg && <Alerta alerta={alerta}/>}</div> */}
      {admin && (
        <div className="bg-background rounded-lg p-5 w-full mt-10 flex justify-between">
          <p className="font-bold text-xl mb-5 mt-5 text-text">
            Tareas de:
            <span className="text-primary"> {nombre}</span>
          </p>
          <div className="items-center  flex justify-between  gap-4 font-bold text-textSecondary hover:text-completedTask ">
            <button
              className="uppercase font-bold"
              type="button"
              onClick={handleModalTarea}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6  "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Nueva Tarea
            </button>
          </div>
        </div>
      )}
      <div className="bg-white shadow mt-10 rounded-lg ">
        {proyecto.tareas?.length ? (
          proyecto.tareas?.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea} />
          ))
        ) : (
          <p className="text-center my-5 p-10">
            No hay tareas en este proyecto
          </p>
        )}
      </div>
      {admin && (
        <>
          <div className="bg-background  rounded-lg justify-between  p-5 mt-10 flex ">
            <p className="font-bold text-xl mb-5 mt-5 text-text">
              Colaboradores de:
              <span className="text-primary"> {nombre}</span>
            </p>
            <div className="items-center  flex justify-between  gap-4 font-bold text-textSecondary hover:text-completedTask ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6  "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <Link
                to={`/proyectos/agregar-colaborador/${proyecto._id}`}
                className="uppercase font-bold"
              >
                Añadir
              </Link>
            </div>
          </div>

          <div className="bg-white shadow mt-10 rounded-lg ">
            {proyecto.colaboradores?.length ? (
              proyecto.colaboradores?.map((colaborador) => (
                <Colaborador key={colaborador._id} colaborador={colaborador} />
              ))
            ) : (
              <p className="text-center my-5 p-10">
                No hay Colaboradores en este proyecto
              </p>
            )}
          </div>
          <ModalNuevaTarea />
          <ModalEliminarTarea />
          <ModalEliminarColaborador />
        </>
      )}
    </>
  );
};

export default Proyecto;
