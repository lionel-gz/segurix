import { useEffect, useState } from "react"
import "../styles/Informes.css"


function Informes() {

    const [periodo, setPeriodo] = useState("mes")
    const [gastos, setGastos] = useState([])
    const [fechaDesde, setFechaDesde] = useState("")
    const [fechaHasta, setFechaHasta] = useState("")
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        cargarGastos()
    }, [])


    function cargarGastos() {
        setCargando(true)
        setError("")

        fetch("http://localhost:8080/api/gastos")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("No se pudieron cargar los gastos")
                }

                return respuesta.json()
            })
            .then((datos) => {
                setGastos(datos)
            })
            .catch(() => {
                setError("No se pudieron cargar los gastos.")
            })
            .finally(() => {
                setCargando(false)
            })
    }

    

    const ahora = new Date()

    const rangoInvalido = fechaDesde !== "" && fechaHasta !== "" && fechaDesde > fechaHasta

    const gastosFiltrados = gastos.filter((gasto) => {

        const fechaGasto = new Date(gasto.fechaHora)

        // FILTRO PERSONALIZADO
        if (periodo === "") {

            const desde = fechaDesde !== ""
                ? new Date(fechaDesde + "T00:00:00")
                : null

            const hasta = fechaHasta !== ""
                ? new Date(fechaHasta + "T23:59:59")
                : null

            if (desde && fechaGasto < desde) {
                return false
            }

            if (hasta && fechaGasto > hasta) {
                return false
            }

            return true
        }

        // ESTE MES
        if (periodo === "mes") {
            return (
                fechaGasto.getMonth() === ahora.getMonth() &&
                fechaGasto.getFullYear() === ahora.getFullYear()
            )
        }

        // ÚLTIMOS 3 MESES
        if (periodo === "tres-meses") {

            const inicio = new Date(
                ahora.getFullYear(),
                ahora.getMonth() - 2,
                1
            )

            return fechaGasto >= inicio && fechaGasto <= ahora
        }

        // ESTE AÑO
        if (periodo === "año") {
            return fechaGasto.getFullYear() === ahora.getFullYear()
        }

        return false
    })


    const totalGastado = gastosFiltrados.reduce((total, gasto) => {
        return total + Number(gasto.monto)
    }, 0)

    const cantidadGastos = gastosFiltrados.length

    const promedioGasto =
        cantidadGastos > 0
            ? totalGastado / cantidadGastos
            : 0

    const gastosPorCategoria = gastosFiltrados.reduce((categorias, gasto) => {

        const nombreCategoria = gasto.categoria.nombre

        if (!categorias[nombreCategoria]) {
            categorias[nombreCategoria] = 0
        }

        categorias[nombreCategoria] += Number(gasto.monto)

        return categorias

    }, {})

    const categoriasOrdenadas = Object.entries(gastosPorCategoria).sort((a, b) => b[1] - a[1])


    return (

        <main className="informes">

            {cargando ? (

                <div className="mensaje-cargando" role="status" aria-live="polite">
                    Cargando informes...
                </div>

            ) : error ? (

                <div className="mensaje-error-carga" role="alert">

                    <p>{error}</p>

                    <p>
                        Verificá que el servidor esté funcionando e intentá nuevamente.
                    </p>

                    <button
                        className="btn-reintentar"
                        onClick={cargarGastos}
                    >
                        ↻ Reintentar
                    </button>

                </div>

            ) : (

                <>
                    <div className="informes-header">
                        <div>
                            <h1>Informes</h1>
                            <p>Analizá tus gastos y tu comportamiento financiero</p>
                        </div>
                    </div>

                    <div className="filtros-informes">
                        <button
                            className={periodo === "mes" ? "filtro-activo" : ""}
                            onClick={() => {
                                setPeriodo("mes")
                                setFechaDesde("")
                                setFechaHasta("")
                            }}
                        >
                            Este mes
                        </button>

                        <button
                            className={periodo === "tres-meses" ? "filtro-activo" : ""}
                            onClick={() => {
                                setPeriodo("tres-meses")
                                setFechaDesde("")
                                setFechaHasta("")
                            }}
                        >
                            Últimos 3 meses
                        </button>

                        <button
                            className={periodo === "año" ? "filtro-activo" : ""}
                            onClick={() => {
                                setPeriodo("año")
                                setFechaDesde("")
                                setFechaHasta("")
                            }}
                        >
                            Este año
                        </button>

                        <label>
                            Desde:
                            <input
                                type="date"
                                value={fechaDesde}
                                onChange={(e) => {
                                    setFechaDesde(e.target.value)
                                    setPeriodo("")
                                }}
                            />
                        </label>

                        <label>
                            Hasta:
                            <input
                                type="date"
                                value={fechaHasta}
                                onChange={(e) => {
                                    setFechaHasta(e.target.value)
                                    setPeriodo("")
                                }}
                            />
                        </label>
                    </div>

                    <section className="resumen-informes">

                        {rangoInvalido ? (
                            <div className="mensaje-error" role="alert">
                                <p>
                                    La fecha desde no puede ser posterior a la fecha hasta.
                                </p>
                            </div>
                        ) : (
                            <>

                                <div className="tarjeta">
                                    <p>Total gastado</p>

                                    <h2>
                                        $ {totalGastado.toLocaleString("es-AR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </h2>

                                    <span>Período seleccionado</span>
                                </div>

                                <div className="tarjeta">
                                    <p>Cantidad de gastos</p>

                                    <h2>{cantidadGastos}</h2>

                                    <span>Período seleccionado</span>
                                </div>

                                <div className="tarjeta">
                                    <p>Promedio por gasto</p>

                                    <h2>
                                        $ {promedioGasto.toLocaleString("es-AR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </h2>

                                    <span>Período seleccionado</span>
                                </div>
                            </>
                        )}        
                    </section>

                    <section className="panel-informes">

                        <div className="panel-header">
                            <h2>Gastos por categoría</h2>
                        </div>

                        <div className="lista-categorias">
                            {categoriasOrdenadas.length === 0 ? (
                                <div className="sin-gastos">
                                    <p>
                                        No hay gastos registrados en el período seleccionado.
                                    </p>
                                </div>
                            ) : (
                                categoriasOrdenadas.map(([categoria, total]) => (
                                    <div
                                        className="categoria-informe"
                                        key={categoria}
                                    >
                                        <span>{categoria}</span>
                                        <strong>
                                            $ {total.toLocaleString("es-AR", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}
                                        </strong>
                                    </div>
                                ))
                            )}
                        </div>

                    </section>
                </>

            )}

        </main>
    )
}

export default Informes