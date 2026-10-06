import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Inicio.css"


function Inicio() {

    const navigate = useNavigate()
    const [gastos, setGastos] = useState([])
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

    const gastosDelMes = gastos.filter((gasto) => {

        const fechaGasto = new Date(gasto.fechaHora)

        return (
            fechaGasto.getMonth() === ahora.getMonth() &&
            fechaGasto.getFullYear() === ahora.getFullYear()
        )
    })  

    const totalGastado = gastosDelMes.reduce((total, gasto) => {
        return total + Number(gasto.monto)
    }, 0)

    const cantidadGastos = gastosDelMes.length

    const promedioGasto = cantidadGastos > 0 ? totalGastado / cantidadGastos: 0
    const ultimosGastos = gastos.slice(-3).reverse()

    const gastosPorCategoria = gastosDelMes.reduce((categorias, gasto) => {

        const nombreCategoria = gasto.categoria.nombre

        if (!categorias[nombreCategoria]) {
            categorias[nombreCategoria] = 0
        }

        categorias[nombreCategoria] += Number(gasto.monto)

        return categorias

    }, {})


    return (

        <main className="inicio">

            {cargando ? (

            <div className="mensaje-cargando" role="status" aria-live="polite">
                Cargando resumen...
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
                <div className="inicio-header">
                    <div>
                        <h1>Resumen Financiero</h1>
                        <p>Resumen de tus gastos</p>
                    </div>

                    <button
                        className="btn-nuevo"
                        onClick={() => navigate("/gastos")}
                    >
                        + Nuevo gasto
                    </button>
                </div>


                <section className="resumen">

                    <div className="tarjeta">
                        <p>Total gastado</p>

                        <h2>$ {totalGastado.toLocaleString("es-AR")}</h2>

                        <span>Este mes</span>
                    </div>

                    <div className="tarjeta">
                        <p>Cantidad de gastos</p>
                        <h2>{cantidadGastos}</h2>
                        <span>Este mes</span>
                    </div>

                    <div className="tarjeta">
                        <p>Promedio por gasto</p>

                        <h2>$ {promedioGasto.toLocaleString("es-AR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</h2>

                        <span>Este mes</span>
                    </div>

                </section>


                <section className="panel-gastos">

                    <div className="panel-header">
                        <h2>Últimos gastos</h2>

                        <button
                            className="btn-ver-todos"
                            onClick={() => navigate("/gastos")}
                        >
                            Ver todos
                        </button>
                    </div>

                    <div className="tabla-gastos">
                        <div className="fila encabezado">
                            <span>Descripción</span>
                            <span>Categoría</span>
                            <span>Medio de pago</span>
                            <span>Monto</span>
                        </div>

                        {ultimosGastos.length === 0 ? (
                            <div className="sin-gastos">
                                <p>Todavía no hay gastos registrados.</p>
                            </div>
                        ) : (
                            ultimosGastos.map((gasto) => (
                                <div className="fila" key={gasto.id}>
                                    <span>{gasto.descripcion}</span>
                                    <span>{gasto.categoria.nombre}</span>
                                    <span>{gasto.medioPago.nombre}</span>
                                    <strong>
                                        $ {Number(gasto.monto).toLocaleString("es-AR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </strong>
                                </div>
                            ))
                        )}
                    </div>

                </section>


                <section className="panel-categorias">

                    <div className="panel-header">
                        <h2>Gastos por categoría</h2>
                    </div>

                    <div className="categorias">

                        {Object.entries(gastosPorCategoria).map(([categoria, total]) => (

                            <div className="categoria" key={categoria}>

                                <span>{categoria}</span>

                                <strong>
                                    $ {total.toLocaleString("es-AR", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </strong>

                            </div>

                        ))}

                    </div>

                </section>
            </>

        )}



            

        </main>
    )
}

export default Inicio