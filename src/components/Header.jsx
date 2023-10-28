import { Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import useAuth from "../hooks/useAuth"
import Busqueda from "./Busqueda"
const Header = () => {
    const {handleBuscador,cerrarSesionProyectos  } = useProyectos()
    const{cerrarSesionAuth} = useAuth()
 
const handleCerrarSesion = () => {
    console.log('Cerrar Sesion')
    cerrarSesionAuth()
    cerrarSesionProyectos()
    localStorage.removeItem('token')
}
  return (
    <header className="px-4 py-5 bg-white border-b    ">
        <div className="md:flex  md:justify-between lg:justify-between    mb-5  ">
            <h2 className="text-4xl font-extrabold text-primary mb-5 md:mb-0 text-center ">
                Uptask
            </h2>
           <div className="flex flex-col items-center md:flex-row gap-4">
                <button
                    type="button"
                    onClick={handleBuscador}
                    className="font-bold uppercase">Buscar Proyecto</button>
          
                <Link 
                    to='/proyectos'
                    className="font-extrabold uppercase">
                    Proyectos
                </Link>
                <button 
                type="button"
                onClick={ handleCerrarSesion}
                className="text-white bg-primary p-2 uppercase font-bold 
                rounded-md shadow-lg hover:bg-warning hover:text-black transition-colors">Cerrar Sesión</button>
            </div>
            <Busqueda />
           
        </div>
    </header>
  )
}

export default Header
