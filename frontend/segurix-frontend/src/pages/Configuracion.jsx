import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { usePreferencias } from "../context/usePreferencias"

import "../styles/Configuracion.css"


function Configuracion() {

    const navigate = useNavigate()
    

    const {
        mostrarFechaHora,
        setMostrarFechaHora,
        mostrarDecimales,
        setMostrarDecimales
    } = usePreferencias()
  
    const [exportando, setExportando] = useState(false)

    const exportarDatos = async () => {

        try {

            setExportando(true)

            const respuesta = await fetch(
                "http://localhost:8080/api/gastos"
            )

            if (!respuesta.ok) {
                throw new Error("No se pudieron obtener los gastos")
            }

            const gastos = await respuesta.json()

            const encabezado =
                "Fecha,Descripción,Monto,Categoría,Medio de pago"

            const filas = gastos.map((gasto) => {

                const fecha = gasto.fechaHora
                    ? new Date(gasto.fechaHora).toLocaleString("es-AR")
                    : ""

                const descripcion =
                    `"${gasto.descripcion.replaceAll('"', '""')}"`

                const monto = gasto.monto

                const categoria =
                    `"${gasto.categoria.nombre}"`

                const medioPago =
                    `"${gasto.medioPago.nombre}"`

                return `${fecha},${descripcion},${monto},${categoria},${medioPago}`
            })

            const contenidoCSV = [
                encabezado,
                ...filas
            ].join("\n")

            const archivo = new Blob(
                [contenidoCSV],
                { type: "text/csv;charset=utf-8;" }
            )

            const url = URL.createObjectURL(archivo)

            const enlace = document.createElement("a")

            enlace.href = url
            enlace.download = "segurix_gastos.csv"

            enlace.click()

            URL.revokeObjectURL(url)

        } catch (error) {

            console.error("Error al exportar los datos:", error)

        } finally {

            setExportando(false)

        }
    }


    return (
        <main className="configuracion">



            <div className="configuracion-header">
                <div>
                    <h1>Configuración</h1>
                    <p>Personalizá y administrá las opciones de Segurix</p>
                </div>
            </div>



            <section className="panel-configuracion">

                <div className="panel-configuracion-header">
                    <div>
                        <h2>Apariencia</h2>
                        <p>Configurá cómo querés ver Segurix.</p>
                    </div>
                </div>

                <div className="configuracion-item">
                    <div>
                        <strong>Tema</strong>
                        <p>Seleccioná el tema de la aplicación.</p>
                    </div>

                    <span>Claro</span>
                </div>

                <div className="configuracion-item">
                    <div>
                        <strong>Idioma</strong>
                        <p>Seleccioná el idioma de la aplicación.</p>
                    </div>

                    <span>Español</span>
                </div>

                <div className="configuracion-item">
                    <div>
                        <strong>Moneda</strong>
                        <p>Seleccioná la moneda utilizada para tus gastos.</p>
                    </div>

                    <span>Peso argentino (ARS)</span>
                </div>

            </section>

            <section className="panel-configuracion">

                <div className="panel-configuracion-header">
                    <div>
                        <h2>Datos</h2>
                        <p>Información general de tus datos en Segurix.</p>
                    </div>
                </div>

                



                <div className="configuracion-item">
                    <div>
                        <strong>Categorías</strong>
                        <p>Administrá las categorías utilizadas para tus gastos.</p>
                    </div>

                    <button
                        className="btn-configuracion"
                        onClick={() => navigate("/configuracion/categorias")}
                    >
                        Administrar →
                    </button>
                </div>



                <div className="configuracion-item">
                    <div>
                        <strong>Medios de pago</strong>
                        <p>Administrá los medios de pago disponibles.</p>
                    </div>

                    <button
                        className="btn-configuracion"
                        onClick={() => navigate("/configuracion/medios-pago")}
                    >
                        Administrar →
                    </button>
                </div>


                <div className="configuracion-item">
                    <div>
                        <strong>Exportar datos</strong>
                        <p>
                            Descargá tus gastos en formato CSV.
                        </p>
                    </div>

                    <button
                        className="btn-configuracion"
                        onClick={exportarDatos}
                        disabled={exportando}
                    >
                        {exportando ? "Exportando..." : "Exportar CSV"}
                    </button>
                </div>


            </section>

                    <section className="panel-configuracion">

                        <div className="panel-configuracion-header">
                            <div>
                                <h2>Preferencias</h2>
                                <p>
                                    Configurá cómo querés visualizar tus datos.
                                </p>
                            </div>
                        </div>

                        <div className="configuracion-item">

                            <div>
                                <strong>Mostrar fecha y hora</strong>
                                <p>
                                    Mostrá la fecha y hora de cada gasto.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                aria-label="Mostrar fecha y hora"
                                checked={mostrarFechaHora}
                                onChange={(e) => setMostrarFechaHora(e.target.checked)}
                            />

                        </div>

                        <div className="configuracion-item">

                            <div>
                                <strong>Mostrar decimales</strong>
                                <p>
                                    Mostrá los montos con dos decimales.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                aria-label="Mostrar decimales"
                                checked={mostrarDecimales}
                                onChange={(e) => setMostrarDecimales(e.target.checked)}
                            />

                        </div>

                    </section>

            <section className="panel-configuracion">

                <div className="panel-configuracion-header">
                    <div>
                        <h2>Información</h2>
                        <p>Información sobre la aplicación.</p>
                    </div>
                </div>

                <div className="configuracion-item">
                    <div>
                        <strong>Segurix</strong>
                        <p>Gestor de gastos personales.</p>
                    </div>

                    <span>Versión 1.0</span>
                </div>

            </section>

        </main>
    )
}

export default Configuracion