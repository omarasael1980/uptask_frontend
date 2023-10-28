import { useState, useEffect, useContext, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

let socket;
const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  //state para modal
  const [modalNuevaTarea, setModalNuevaTarea] = useState(false);
  //state para modal de eliminar Tarea
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
  //listas de proyectos de un cliente
  const [proyectos, setProyectos] = useState([]);
  // alertas de error
  const [alerta, setAlerta] = useState({});
  // proyecto unitario
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);
  //EDUTAR TAREAS
  const [tarea, setTarea] = useState({});

  //state para colaboradores
  const [colaborador, setColaborador] = useState({});
  //modal para eliminar colaboradores
  const [modalEliminarColaborador, setModalEliminarColaborador] =
    useState(false);
  //state para buscar proyectos
  const [buscador, setBuscador]= useState(false)
  
const {auth}=useAuth()
  useEffect(() => {
    const obtenerProyectos = async () => {
       
      setAlerta({})   
      //se cargan los proyectos del usuario
      try {
        const token = localStorage.getItem("token");
        // console.log(token)
        if (!token) {
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios("/proyectos", config);

        setProyectos(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    obtenerProyectos();
  }, [auth]);
  //conexion de socket  IO

  useEffect(() => {
    socket= io( import.meta.env.VITE_BACKEND_URL)
     
  },[])


  const navigate = useNavigate();

  
  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };
  const submitProyecto = async (proyecto) => {
    if (proyecto.id) {
      await editarProyecto(proyecto);
    } else {
      await crearProyecto(proyecto);
    }
  };

  const editarProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      // console.log(token)
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        `/proyectos/${proyecto.id}`,
        proyecto,
        config
      );

      // Sincronizar el state
      const proyectosActualizados = proyectos.map((proyectoState) =>
        proyectoState._id === data._id ? data : proyectoState
      );
     
      setProyectos(proyectosActualizados);
      //mostrar alerta
      // redireccionar
      setAlerta({
        msg: "Proyecto Actualizado Correctamente",
        error: false,
      });
      //despues de tres segundos limpiamos alerta y redirigimos a proyectos
      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };
  const crearProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      // console.log(token)
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post("/proyectos", proyecto, config);
      
      setProyectos([...proyectos, data]);
      setAlerta({
        msg: "Proyecto Creado Correctamente",
        error: false,
      });
      //despues de tres segundos limpiamos alerta y redirigimos a proyectos
      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  //===========Funcion para obtener un proyecto por id ==========
  const obtenerProyecto = async (id) => {
    setAlerta({})
    //se habilita cargando
    setCargando(true);
    try {
      //recuperar token del localstorage
      const token = localStorage.getItem("token");

      // verificar si existe el token
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(`/proyectos/${id}`, config);

      setProyecto(data);
    } catch (error) {
      navigate('/proyectos')

      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() =>{ setAlerta({})},3000)
    } finally {
      //este tiempo es para que se vea animacion de cargar
      setTimeout(() => {
        setCargando(false);
      }, 300);
    }
  };

  //funcion que controla el modal
  const handleModalTarea = () => {
    setModalNuevaTarea(!modalNuevaTarea);
    setTarea({});
  };
  const eliminarProyecto = async (id) => {
    try {
      //recuperar token del localstorage
      const token = localStorage.getItem("token");

      // verificar si existe el token
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setTimeout(() => setAlerta({}), 3000);
      // eliminar del state
      const proyectoActualizado = proyectos.filter(
        (proyectoState) => proyectoState._id !== id
      );
     //console.log("proyectoActualizado", proyectoActualizado);
      setProyectos(proyectoActualizado);
      navigate("/proyectos");
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitTarea = async (tarea) => {
    if (tarea?.id) {
      
      await editarTarea(tarea);
    } else {
       
      await crearTarea(tarea);
      

    }
    return;
  };
  const editarTarea = async (tarea) => {
    try {
      //recuperar token del localstorage
      const token = localStorage.getItem("token");

      // verificar si existe el token
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        `/tareas/${tarea.id}`,
        tarea,
        config
      );

      //Socket IO

      console.log('Actualizar:  ',tarea.id)
      socket.emit('editar tarea', data)
 
      //  limpiar errores
      setAlerta({});
      //cerrar modal
      setModalNuevaTarea(false);

      setAlerta({
        msg: data.msg,
        error: false,
      });
          // SOCKET
        //  socket.emit('actualizar tarea', data)
      setTimeout(() => setAlerta({}), 3000);
    } catch (error) {
      console.log(error.message);
    }
  };
  const crearTarea = async (tarea) => {
   
 
    try {
      //recuperar token del localstorage
      const token = localStorage.getItem("token");
    
      // verificar si existe el token
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      
      
      const {data} = await clienteAxios.post(`/tareas/`, tarea, config); 
          
      //  limpiar errores
      setAlerta({});
      //cerrar modal
      setModalNuevaTarea(false);

      setAlerta({
        msg: data.msg,
        error: false,
      });
      setTimeout(() => setAlerta({}), 3000);
      //SOCKET IO
      socket.emit('nueva tarea', data)
       
    } catch (error) {
      //mandar el error a la pantalla
   console.log('Error al crear tarea',error);
    }
  };
  const handleModalEditarTarea = (tarea) => {
    setTarea(tarea);
    //mostrar modal
    setModalNuevaTarea(true);

    //pasar datos al modal
  };
  const handleModalEliminarTarea = (tarea) => {
    setTarea(tarea);
    setModalEliminarTarea(!modalEliminarTarea);
  };

  const eliminarTarea = async () => {
    try {
      //recuperar token del localstorage
      const token = localStorage.getItem("token");

      // verificar si existe el token
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

     

      const { data } = await clienteAxios.delete(
        `/tareas/${tarea._id}`,
        config
      ); 
       //socket IO
      socket.emit('eliminar tarea', tarea)

      setAlerta({
        msg: data.msg,
        error: false,
      });
  
      //cambiar el state de modal para eliminar tarea
      setModalEliminarTarea(false);
      // cambiar el state de tarea
      setTarea({});

      //quitar alerata
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    
   
    } catch (error) {
      console.log(error);
    }
  };
  const submitColaborador = async (email) => {
    try {
      setCargando(true);
      //recuperar token del localstorage
      const token = localStorage.getItem("token");

      // verificar si existe el token
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      //actualizar  el state para sincronizar con la base de datos
      //  const proyectoActualizado = {...proyecto}

      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores`,
        { email },
        config
      );
      setColaborador(data);
      setAlerta({});
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    } finally {
      setCargando(false);
    }
  };
  const agregarColaborador = async (nombre) => {
    const { email } = nombre;

    try {
      //recuperar token del localstorage
      const token = localStorage.getItem("token");

      // verificar si existe el token
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores/${proyecto._id}`,
        { email },
        config
      );
      setAlerta({ 
        msg: data.msg, 
        error: false });
      setColaborador({});
      setTimeout(() => setAlerta({}), 3000);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };
  const handleEliminarColaborador = (colaborador) => {
    setModalEliminarColaborador(!modalEliminarColaborador);
    setColaborador(colaborador);
  };

  const eliminarColaborador = async () => {
    try {
      //recuperar token del localstorage
      const token = localStorage.getItem("token");

      // verificar si existe el token
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/proyectos/eliminar-colaborador/${proyecto._id}`,
        { id: colaborador._id },
        config
      );
     
      const proyectoActualizado = { ...proyecto };

      proyectoActualizado.colaboradores =
        proyectoActualizado.colaboradores.filter(
          (colaboradorState) => colaboradorState._id !== colaborador._id
        );
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setProyecto(proyectoActualizado);
      setColaborador({});
      setModalEliminarColaborador(false);
      setTimeout(() => setAlerta({}), 3000);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  }
  const completarTarea = async id =>{
   try {
    //recuperar token del localstorage
    const token = localStorage.getItem("token");

    // verificar si existe el token
    if (!token) {
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clienteAxios.post(`/tareas/estado/${id}`,
      {}, config
    );
  //socekt IO
  socket.emit('cambiar estado', data);
    setTarea({})
    setAlerta({})
   } catch (error) {
    console.log(error.response)
   }
  }
  //handle para controlar el modal de buscador
  const handleBuscador = ()=>{
    setBuscador(!buscador)
  }
  //socket io
  const submitTareasProyecto =  (tarea)=>{

      //actualizar el proyecto en el state
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea];
      setProyecto(proyectoActualizado);
  }
  const eliminarTareaProyecto = (tareaEliminada)=>{
 
        //actualizar  el state para sincronizar con la base de datos
        const proyectoActualizado = { ...proyecto };
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
          (tareaState) => tareaState._id != tareaEliminada._id
        );
        //actualizar el state de proyecto
        setProyecto(proyectoActualizado);
  }
  const editarTareaProyecto = tareEditada =>{
 
    //actualizar el proyecto en el state
      //recorrer arreglo y modificar la tarea
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(
        (tareaState) => (tareaState._id === tareEditada._id ? tareEditada : tareaState)
      );

      setProyecto(proyectoActualizado);
  }

  const actualizarEstadoTarea = estadoActualizado =>{
      //actualizar el state
      const proyectoActualizado = {...proyecto}
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === estadoActualizado._id ? estadoActualizado : tareaState)
      setProyecto(proyectoActualizado)
  }
  const cerrarSesionProyectos = ()=>{
    setProyectos([])
    setProyecto({})
    setAlerta({})
  }
  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        cargando,
        eliminarProyecto,
        modalNuevaTarea,
        handleModalTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
        handleModalEliminarTarea,
        modalEliminarTarea,
        eliminarTarea,
        submitColaborador,
        colaborador,
        agregarColaborador,
        handleEliminarColaborador,
        modalEliminarColaborador,
        eliminarColaborador,
        completarTarea,
        handleBuscador,
        buscador,
        submitTareasProyecto,
        eliminarTareaProyecto,
        editarTareaProyecto,
        actualizarEstadoTarea,
        cerrarSesionProyectos
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};
export { ProyectosProvider };
export default ProyectosContext;
