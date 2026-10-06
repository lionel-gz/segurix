
import { useEffect, useState } from "react"

import "../styles/MediosPago.css"

function MediosPago() {

    const [mediosPago, setMediosPago] = useState([])
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [nombre, setNombre] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {

        fetch("http://localhost:8080/api/medios-pago")
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setMediosPago(datos)
            })
            .catch((error) => {
                console.error("Error al obtener los medios de pago:", error)
            })

    }, [])

    return (
        <main className="medios-pago">

            <div className="medios-pago-header">

                <div>
                    <h1>Medios de pago</h1>
                    <p>
                        Administrá los medios de pago utilizados para tus gastos.
                    </p>
                </div>

            </div>

            <section className="panel-medios-pago">

                <div className="panel-medios-pago-header">

                    <div>
                        <h2>Medios de pago disponibles</h2>
                        <p>
                            Estos son los medios de pago que podés utilizar en tus gastos.
                        </p>
                    </div>

                    <button
                        className="btn-nuevo-medio-pago"
                        onClick={() => setMostrarFormulario(true)}
                    >
                        + Nuevo medio de pago
                    </button>

                </div>

                {mostrarFormulario && (

                    <div className="formulario-medio-pago">

                        <div className="campo-medio-pago">

                            <input
                                type="text"
                                placeholder="Nombre del medio de pago"
                                aria-label="Nombre del medio de pago"
                                value={nombre}
                                onChange={(e) => {
                                    setNombre(e.target.value)
                                    setError("")
                                }}
                            />

                            {error && (
                                <p className="error-medio-pago" role="alert">
                                    {error}
                                </p>
                            )}

                        </div>

                        <button
                            onClick={() => {

                                if (nombre.trim() === "") {

                                    setError(
                                        "El nombre del medio de pago es obligatorio"
                                    )

                                    return
                                }

                                setError("")

                                fetch("http://localhost:8080/api/medios-pago", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        nombre: nombre
                                    })
                                })
                                    .then(async (respuesta) => {

                                        const datos = await respuesta.json()

                                        if (!respuesta.ok) {

                                            throw new Error(
                                                datos.message ||
                                                "Error al crear el medio de pago"
                                            )
                                        }

                                        return datos
                                    })
                                    .then((nuevoMedioPago) => {

                                        setMediosPago([
                                            ...mediosPago,
                                            nuevoMedioPago
                                        ])

                                        setNombre("")
                                        setMostrarFormulario(false)

                                    })
                                    .catch((error) => {

                                        setError(error.message)

                                    })

                            }}
                        >
                            Guardar
                        </button>

                        <button
                            onClick={() => {

                                setMostrarFormulario(false)
                                setNombre("")
                                setError("")

                            }}
                        >
                            Cancelar
                        </button>

                    </div>

                )}

                <div className="lista-medios-pago">

                    {mediosPago.map((medioPago) => (

                        <div
                            className="medio-pago-item"
                            key={medioPago.id}
                        >

                            <span>
                                {medioPago.nombre}
                            </span>

                            <button>
                                Editar
                            </button>

                        </div>

                    ))}

                </div>

            </section>

        </main>
    )
}

export default MediosPago
