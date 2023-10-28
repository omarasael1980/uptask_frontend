import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Login from './pages/Login.jsx'
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import NewPassword from "./pages/NewPassword"
import ConfirmAccount from "./pages/ConfirmAccount"
import Proyectos from "./pages/Proyectos"
import NuevoProyecto from "./pages/NuevoProyecto"
import Proyecto from "./pages/Proyecto"
import RutaProtegida from "./layouts/RutaProtegida"
import EditarProyecto from "./pages/EditarProyecto"
import NuevoColaborador from "./pages/NuevoColaborador"
import { AuthProvider } from "./context/AuthProvider"
import { ProyectosProvider } from "./context/ProyectosProvider"


function App() {
  
  return (
    
      <BrowserRouter>
        <AuthProvider> 
          <ProyectosProvider>
              <Routes>
                  <Route
                    path="/"
                    element={<AuthLayout/>}
                    >
                        <Route
                          index 
                          element={<Login/>}/>
                        <Route
                        path="/registrar"
                        element={<Register/>}/>
                          <Route
                        path="olvide-password"
                        element={<ForgotPassword/>}/>
                          <Route
                        path="olvide-password/:token"
                        element={<NewPassword/>}/>
                        <Route
                        path="confirmar/:id"
                        element={<ConfirmAccount/>}/>
                  </Route>
                  <Route
                    path="/proyectos" element={<RutaProtegida/>}>
                      <Route index element={<Proyectos/>}/>
                      <Route 
                            path="crear-proyecto" 
                            element={<NuevoProyecto/>}
                            />
                            <Route 
                            path="agregar-colaborador/:id" 
                            element={<NuevoColaborador/>}
                            /> 
                      <Route path=":id"  element={<Proyecto/>} />
                      <Route path="editar/:id"  element={<EditarProyecto/>} />
                  </Route>

                      
              </Routes>
            </ProyectosProvider>
          </AuthProvider>
      </BrowserRouter>
   
  )
}

export default App
