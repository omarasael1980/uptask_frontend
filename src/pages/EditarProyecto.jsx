import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import useProyectos from "../hooks/useProyectos";
import { useEffect } from "react";
import FormularioProyecto from "../components/FormularioProyecto";
const EditarProyecto = () => {
  const params = useParams();
  const { obtenerProyecto, proyecto, cargando, eliminarProyecto, alerta } = useProyectos();

  // el useEffect recupera el id de la url
  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);
  //obteniendo datos del proyecto
  const { nombre, descripcion, fechaEntrega, cliente, _id, creador } = proyecto;
  const handleClick = () => {
    if(confirm('Deseas Eliminar este proyecto')){
        eliminarProyecto(_id)
       
        
    }else{
        alert('no')
    }
  }
  return cargando ? (
    //mientras carga se ve animacion
    <div className="bg-background rounded-lg  w-full flex-1">
      <button
        type="button"
        className="  text-completedTask font-bold  items-center text-5xl text-center
         flex justify-between p-5 rounded-md"
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
    <div className="bg-background w-full flex flex-col md: flex-row rounded-lg p-10  ">
      <div className="bg-background rounded-lg p-10 w-full flex justify-between">
        <h1 className="font-black text-4xl uppercase">{`Editando Proyecto: ${nombre}`}</h1>
        <div className="flex items-center  w-full gap-4 font-bold text-textSecondary hover:text-completedTask ">
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
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          <button 
                onClick={handleClick}
                className="uppercase font-bold">Eliminar</button>
        </div>
      </div>

      <div className="mt-10 flex  w-full  justify-center">
   
        <FormularioProyecto />
      </div>
    </div>
  );
};

export default EditarProyecto;
