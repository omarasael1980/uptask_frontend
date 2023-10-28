import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
const SideBar = () => {
  const {auth} = useAuth()
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10 ">
        <p className="text-xl  font-bold text-background text-center">Hola: {auth.nombre}</p>
        <Link 
            to="/proyectos/crear-proyecto" 
            className="bg-primary w-full p-3 text-white uppercase font-bold text-center rounded-md shadow-md 
             block mt-5 hover:bg-warning hover:text-black transition-colors">
                Nuevo Proyecto</Link>
    </aside>
  )
}

export default SideBar
