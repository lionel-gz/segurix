import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import Inicio from "./pages/Inicio"
import Gastos from "./pages/Gastos"
import Informes from "./pages/Informes"
import Configuracion from "./pages/Configuracion"
import Categorias from "./pages/Categorias"
import MediosPago from "./pages/MediosPago"
import { PreferenciasProvider } from "./context/PreferenciasProvider"

function App() {

    return (
        <PreferenciasProvider>

            <BrowserRouter>

                <div className="app">

                    <Sidebar />

                    <Routes>
                        <Route path="/" element={<Inicio />} />
                        <Route path="/gastos" element={<Gastos />} />
                        <Route path="/informes" element={<Informes />} />
                        <Route path="/configuracion" element={<Configuracion />} />
                        <Route
                            path="/configuracion/categorias"
                            element={<Categorias />}
                        />
                        <Route
                            path="/configuracion/medios-pago"
                            element={<MediosPago />}
                        />
                    </Routes>

                </div>

            </BrowserRouter>

        </PreferenciasProvider>
    )
    
}

export default App