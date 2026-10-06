import { NavLink } from "react-router-dom"
import { House, Wallet, ChartNoAxesColumn, Settings } from "lucide-react"
import "../styles/Sidebar.css"
import segurixLogo from "../assets/images/segurix_logo.png"

function Sidebar() {

    return (
        <aside className="sidebar">

            <div className="logo">
                <img src={segurixLogo} alt="Segurix" />
                <div className="logo-texto">
                    <h2>Segurix</h2>
                    <span>Gestor de gastos</span>
                </div>
            </div>

            <nav className="menu" aria-label="Navegación principal">

                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive ? "menu-item activo" : "menu-item"
                    }>

                    <House size={18} strokeWidth={2} aria-hidden="true"/>
                    Inicio
                </NavLink>

                <NavLink
                    to="/gastos"
                    className={({ isActive }) =>
                        isActive ? "menu-item activo" : "menu-item"
                    }>

                    <Wallet size={18} strokeWidth={2}aria-hidden="true"/>
                    Gastos
                </NavLink>

                <NavLink
                    to="/informes"
                    className={({ isActive }) =>
                        isActive ? "menu-item activo" : "menu-item"
                    }>

                    <ChartNoAxesColumn size={18} strokeWidth={2} aria-hidden="true"/>
                    Informes
                </NavLink>

                <NavLink
                    to="/configuracion"
                    className={({ isActive }) =>
                        isActive ? "menu-item activo" : "menu-item"
                    }>

                    <Settings size={18} strokeWidth={2}aria-hidden="true" />
                    Configuración
                </NavLink>

            </nav>

            <div className="sidebar-footer">
                <span>Segurix</span>
                <small>Versión 1.0</small>
            </div>

        </aside>
    )
}

export default Sidebar