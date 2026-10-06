import { useEffect, useState } from "react"

import "../styles/Categorias.css"

function Categorias() {

    const [categorias, setCategorias] = useState([])
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [nombre, setNombre] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {

        fetch("http://localhost:8080/api/categorias")
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setCategorias(datos)
            })
            .catch((error) => {
                console.error("Error al obtener las categorías:", error)
            })

    }, [])

    return (

        <main className="categorias">

            <div className="categorias-header">

                <div>
                    <h1>Categorías</h1>
                    <p>Administrá las categorías utilizadas para tus gastos.</p>
                </div>

            </div>


            <section className="panel-categorias">

                <div className="panel-categorias-header">

                    <div>
                        <h2>Categorías disponibles</h2>
                        <p>Estas son las categorías que podés utilizar en tus gastos.</p>
                    </div>

                    <button
                        className="btn-nueva-categoria"
                        onClick={() => setMostrarFormulario(true)}
                    >
                        + Nueva categoría
                    </button>

                </div>


                {mostrarFormulario && (

                    <div className="formulario-categoria">

                        <div className="campo-categoria">

                            <input
                                type="text"
                                placeholder="Nombre de la categoría"
                                aria-label="Nombre de la categoría"
                                value={nombre}
                                onChange={(e) => {
                                    setNombre(e.target.value)
                                    setError("")
                                }}
                            />

                            {error && (
                                <p className="error-categoria" role="alert">
                                    {error}
                                </p>
                            )}

                        </div>


                        <button
                            onClick={() => {

                                if (nombre.trim() === "") {

                                    setError("El nombre de la categoría es obligatorio")
                                    return

                                }

                                setError("")

                                fetch("http://localhost:8080/api/categorias", {
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
                                                datos.detail ||
                                                "Error al crear la categoría"
                                            )
                                        }

                                        return datos
                                    })
                                    .then((nuevaCategoria) => {

                                        setCategorias([
                                            ...categorias,
                                            nuevaCategoria
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
                            }}
                        >
                            Cancelar
                        </button>

                    </div>

                )}


                <div className="lista-categorias">

                    {categorias.map((categoria) => (

                        <div
                            className="categoria-item"
                            key={categoria.id}
                        >

                            <span>{categoria.nombre}</span>

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

export default Categorias