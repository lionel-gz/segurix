import { useEffect, useState } from "react"
import { usePreferencias } from "../context/usePreferencias"
import Toast from "../components/Toast"
import ModalConfirmacion from "../components/ModalConfirmacion"


import "../styles/Gastos.css"

function Gastos() {

    const { mostrarFechaHora,mostrarDecimales } = usePreferencias()

    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [descripcion, setDescripcion] = useState("")
    const [monto, setMonto] = useState("")
    const [categoria, setCategoria] = useState("")
    const [medioPago, setMedioPago] = useState("")
    const [idEditado, setIdEditado] = useState(null)
    const [error, setError] = useState("")
    const [gastos, setGastos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [mediosPago, setMediosPago] = useState([])

    const [busqueda, setBusqueda] = useState("")
    const [filtroCategoria, setFiltroCategoria] = useState("")
    const [filtroMedioPago, setFiltroMedioPago] = useState("")

    const [fechaDesde, setFechaDesde] = useState("")
    const [fechaHasta, setFechaHasta] = useState("")

    const [mensajeToast, setMensajeToast] = useState("")
    const [gastoAEliminar, setGastoAEliminar] = useState(null)

    const [cargando, setCargando] = useState(true)
    const [errorCarga, setErrorCarga] = useState("")

    const [errorCategorias, setErrorCategorias] = useState("")
    const [errorMediosPago, setErrorMediosPago] = useState("")

    

    useEffect(() => {
        cargarGastos()
    }, [])

    
    useEffect(() => {
        fetch("http://localhost:8080/api/categorias")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("No se pudieron cargar las categorías")
                }

                return respuesta.json()
            })
            .then((datos) => {
                setCategorias(datos)
            })
            .catch(() => {
                setErrorCategorias("No se pudieron cargar las categorías.")
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/api/medios-pago")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("No se pudieron cargar los medios de pago")
                }

                return respuesta.json()
            })
            .then((datos) => {
                setMediosPago(datos)
            })
            .catch(() => {
                setErrorMediosPago("No se pudieron cargar los medios de pago.")
            })
    }, [])

    
    function cargarGastos() {
        setCargando(true)
        setErrorCarga("")

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
                setErrorCarga("No se pudieron cargar los gastos.")
            })
            .finally(() => {
                setCargando(false)
            })
    }



    const gastosFiltrados = gastos.filter((gasto) => {

        const coincideDescripcion =
            gasto.descripcion
                .toLowerCase()
                .includes(busqueda.toLowerCase())

        const coincideCategoria =
            filtroCategoria === "" ||
            gasto.categoria.id === Number(filtroCategoria)

        const coincideMedioPago =
            filtroMedioPago === "" ||
            gasto.medioPago.id === Number(filtroMedioPago)

        const fechaGasto = new Date(gasto.fechaHora)

        const coincideDesde =
            fechaDesde === "" ||
            fechaGasto >= new Date(fechaDesde + "T00:00:00")

        const coincideHasta =
            fechaHasta === "" ||
            fechaGasto <= new Date(fechaHasta + "T23:59:59")

        return (
            coincideDescripcion &&
            coincideCategoria &&
            coincideMedioPago &&
            coincideDesde &&
            coincideHasta
        )
    })


    {/*Funciones CRUD-----------------------------------------------*/}

   function eliminarGasto(id) {
        setGastoAEliminar(id)
    }

    function confirmarEliminacion() {

        fetch(`http://localhost:8080/api/gastos/${gastoAEliminar}`, {
            method: "DELETE"
        })

            .then((respuesta) => {

                if (!respuesta.ok) {
                    throw new Error("No se pudo eliminar el gasto")
                }

                setGastos((gastosActuales) =>
                    gastosActuales.filter(
                        (gasto) => gasto.id !== gastoAEliminar
                    )
                )

                setGastoAEliminar(null)

                setMensajeToast("Gasto eliminado correctamente")
            })

            .catch(() => {
                setMensajeToast("No se pudo eliminar el gasto")
            })
    }


    function editarGasto(id) {

        const gasto = gastos.find(
            (gasto) => gasto.id === id
        )

        setDescripcion(gasto.descripcion)
        setMonto(gasto.monto)
        setCategoria(gasto.categoria.id)
        setMedioPago(gasto.medioPago.id)
        setIdEditado(id)
        setMostrarFormulario(true)
    }

     {/*------------------------------------------------------------*/}


    return (

        <>
            {mensajeToast && (
                <Toast
                    mensaje={mensajeToast}
                    onCerrar={() => setMensajeToast("")}
                />
            )}

            {gastoAEliminar !== null && (
                <ModalConfirmacion
                    mensaje="¿Estás seguro de que querés eliminar este gasto?"
                    onConfirmar={confirmarEliminacion}
                    onCancelar={() => setGastoAEliminar(null)}
                />
            )}
            
            
            <main className="gastos">
                

                {cargando ? (

                    <div
                        className="mensaje-cargando"
                        role="status"
                        aria-live="polite"
                    >
                        Cargando gastos...
                    </div>

                ) : errorCarga ? (

                    <div className="mensaje-error-carga" role="alert">
                        <p>{errorCarga}</p>

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

                        <div className="gastos-header">
                            <div>
                                <h1>Gastos</h1>
                                <p>Administrá tus gastos personales</p>
                            </div>

                            <button
                                className="btn-nuevo"
                                onClick={() => {
                                    setDescripcion("")
                                    setMonto("")
                                    setCategoria("")
                                    setMedioPago("")
                                    setIdEditado(null)
                                    setError("")
                                    setMostrarFormulario(true)
                                }}
                            >
                                + Nuevo gasto
                            </button>
                        </div>

                        {mostrarFormulario && (
                            <section className="formulario-gasto" aria-labelledby="titulo-formulario-gasto">

                                <h2>
                                    {idEditado !== null
                                        ? "Editar gasto"
                                        : "Nuevo gasto"}
                                </h2>

                                {error && (
                                    <p className="mensaje-error">
                                        {error}
                                    </p>
                                )}

                                {errorCategorias && (
                                    <p className="mensaje-error">
                                        {errorCategorias}
                                    </p>
                                )}

                                {errorMediosPago && (
                                    <p className="mensaje-error">
                                        {errorMediosPago}
                                    </p>
                                )}

                                <div className="campo">
                                    <label htmlFor="descripcion">Descripción</label>

                                    <input
                                        id="descripcion"
                                        type="text"
                                        maxLength={100}
                                        placeholder="Ej: Compra supermercado"
                                        value={descripcion}
                                        onChange={(e) => {
                                            setDescripcion(e.target.value)
                                            setError("")
                                        }}
                                    />
                                </div>

                                <div className="campo">
                                    <label htmlFor="monto">Monto</label>

                                    <input
                                        id="monto"
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        placeholder="Ej: 15000"
                                        value={monto}
                                        onChange={(e) => {
                                            setMonto(e.target.value)
                                            setError("")
                                        }}
                                    />
                                </div>

                                <div className="campo">
                                    <label htmlFor="categoria">Categoría</label>

                                    <select
                                        id="categoria"
                                        value={categoria}
                                        onChange={(e) => {
                                            setCategoria(e.target.value)
                                            setError("")
                                        }}
                                    >
                                        <option value="">
                                            Seleccionar categoría...
                                        </option>

                                        {categorias.map((categoria) => (
                                            <option
                                                key={categoria.id}
                                                value={categoria.id}
                                            >
                                                {categoria.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="campo">
                                    <label htmlFor="medioPago">Medio de pago</label>

                                    <select
                                        id="medioPago"
                                        value={medioPago}
                                        onChange={(e) => {
                                            setMedioPago(e.target.value)
                                            setError("")
                                        }}
                                    >
                                        <option value="">
                                            Seleccionar medio de pago...
                                        </option>

                                        {mediosPago.map((medio) => (
                                            <option
                                                key={medio.id}
                                                value={medio.id}
                                            >
                                                {medio.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="acciones-formulario">

                                    <button
                                        className="btn-cancelar"
                                        onClick={() => {
                                            setDescripcion("")
                                            setMonto("")
                                            setCategoria("")
                                            setMedioPago("")
                                            setError("")
                                            setIdEditado(null)
                                            setMostrarFormulario(false)
                                        }}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        className="btn-guardar"
                                        onClick={() => {

                                            if (descripcion.trim() === "") {
                                                setError(
                                                    "La descripción es obligatoria"
                                                )
                                                return
                                            }

                                            if (
                                                monto === "" ||
                                                Number(monto) <= 0
                                            ) {
                                                setError(
                                                    "El monto debe ser mayor a 0"
                                                )
                                                return
                                            }

                                            if (categoria === "") {
                                                setError(
                                                    "La categoria es obligatoria"
                                                )
                                                return
                                            }

                                            if (medioPago === "") {
                                                setError(
                                                    "El medio de pago es obligatorio"
                                                )
                                                return
                                            }

                                            const gasto = {
                                                descripcion: descripcion,
                                                monto: Number(monto),
                                                categoria: {
                                                    id: Number(categoria)
                                                },
                                                medioPago: {
                                                    id: Number(medioPago)
                                                }
                                            }

                                            // EDITAR
                                            if (idEditado
                                     !== null) {

                                                const id = idEditado
                                    

                                                fetch(
                                                    `http://localhost:8080/api/gastos/${id}`,
                                                    {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type":
                                                                "application/json"
                                                        },
                                                        body: JSON.stringify(gasto)
                                                    }
                                                )
                                                    .then((respuesta) => {
                                                        if (!respuesta.ok) {
                                                            throw new Error(
                                                                "No se pudo actualizar el gasto"
                                                            )
                                                        }

                                                        return respuesta.json()
                                                    })
                                                    .then((gastoActualizado) => {
                                                        setGastos((gastosActuales) =>
                                                            gastosActuales.map((gasto) =>
                                                                gasto.id === idEditado
                                                                    ? gastoActualizado
                                                                    : gasto
                                                            )
                                                        )

                                                        setDescripcion("")
                                                        setMonto("")
                                                        setCategoria("")
                                                        setMedioPago("")
                                                        setIdEditado(null)
                                                        setMostrarFormulario(false)
                                                        setError("")
                                                        setMensajeToast("Gasto actualizado correctamente")
                                                    })
                                                    .catch(() => {
                                                        setError(
                                                            "No se pudo actualizar el gasto"
                                                        )
                                                    })

                                            // CREAR
                                            } else {

                                                fetch(
                                                    "http://localhost:8080/api/gastos",
                                                    {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type":
                                                                "application/json"
                                                        },
                                                        body: JSON.stringify(gasto)
                                                    }
                                                )
                                                    .then((respuesta) => {
                                                        if (!respuesta.ok) {
                                                            throw new Error(
                                                                "No se pudo guardar el gasto"
                                                            )
                                                        }

                                                        return respuesta.json()
                                                    })
                                                    .then((gastoGuardado) => {

                                                        setGastos((gastosActuales) => [
                                                            ...gastosActuales,
                                                            gastoGuardado
                                                        ])

                                                        setDescripcion("")
                                                        setMonto("")
                                                        setCategoria("")
                                                        setMedioPago("")
                                                        setIdEditado(null)
                                                        setMostrarFormulario(false)
                                                        setError("")

                                                        setMensajeToast("Gasto registrado correctamente")

                                                    })
                                                    .catch(() => {
                                                        setError(
                                                            "No se pudo guardar el gasto"
                                                        )
                                                    })
                                            }
                                        }}
                                    >
                                        {idEditado !== null
                                            ? "Guardar cambios"
                                            : "Guardar gasto"}
                                    </button>

                                </div>
                            </section>
                        )}

                        <section className="lista-gastos">

                            <h2>Mis gastos</h2>

                            <div className="filtros-gastos">

                                <input
                                    type="text"
                                    aria-label="Buscar gastos por descripción"
                                    placeholder="Buscar por descripción..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                />

                                <select
                                    value={filtroCategoria}
                                    onChange={(e) => setFiltroCategoria(e.target.value)}
                                >
                                    <option value="">
                                        Todas las categorías
                                    </option>

                                    {categorias.map((categoria) => (
                                        <option
                                            key={categoria.id}
                                            value={categoria.id}
                                        >
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={filtroMedioPago}
                                    onChange={(e) => setFiltroMedioPago(e.target.value)}
                                >
                                    <option value="">
                                        Todos los medios de pago
                                    </option>

                                    {mediosPago.map((medio) => (
                                        <option
                                            key={medio.id}
                                            value={medio.id}
                                        >
                                            {medio.nombre}
                                        </option>
                                    ))}
                                </select>

                                <div className="filtro-fecha">
                                    <label htmlFor="fechaDesde">Desde</label>

                                    <input
                                        id="fechaDesde"
                                        type="date"
                                        value={fechaDesde}
                                        onChange={(e) => setFechaDesde(e.target.value)}
                                    />
                                </div>

                                <div className="filtro-fecha">
                                    <label htmlFor="fechaHasta">Hasta</label>

                                    <input
                                        id="fechaHasta"
                                        type="date"
                                        value={fechaHasta}
                                        onChange={(e) => setFechaHasta(e.target.value)}
                                    />
                                </div>

                            </div>

                            {gastosFiltrados.length === 0 ? (
                                <div className="sin-gastos">
                                    <p>
                                        {gastos.length === 0
                                            ? "Todavía no hay gastos registrados."
                                            : "No se encontraron gastos con los filtros seleccionados."
                                        }
                                    </p>
                                </div>
                            ) : (

                                <div className="tabla-gastos">

                                    <div className="fila encabezado">
                                        <span>Descripción</span>
                                        <span>Categoría</span>
                                        <span>Medio de pago</span>
                                        <span>Fecha y hora</span>
                                        <span>Monto</span>
                                        <span>Acciones</span>
                                    </div>

                                    {gastosFiltrados.map((gasto) => (

                                        <div
                                            className="fila"
                                            key={gasto.id}
                                        >

                                            <span>
                                                {gasto.descripcion}
                                            </span>

                                            <span>
                                                {gasto.categoria.nombre}
                                            </span>

                                            <span>
                                                {gasto.medioPago.nombre}
                                            </span>

                                            <span>
                                                {mostrarFechaHora
                                                    ? gasto.fechaHora
                                                        ? new Date(gasto.fechaHora).toLocaleString()
                                                        : "Sin fecha"
                                                    : "-"}
                                            </span>

                                            <strong>
                                                $ {
                                                    mostrarDecimales
                                                        ? Number(gasto.monto).toFixed(2)
                                                        : Math.trunc(Number(gasto.monto))
                                                }
                                            </strong>

                                            <div className="acciones">

                                                <button
                                                    className="btn-editar"
                                                    onClick={() => editarGasto(gasto.id)}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className="btn-eliminar"
                                                    onClick={() => eliminarGasto(gasto.id)}
                                                >
                                                    Eliminar
                                                </button>

                                            </div>

                                        </div>

                                    ))}

                                </div>
                            )}
                        

                        </section>
                    </>
                )}
            </main>
        </>
    )
}

export default Gastos