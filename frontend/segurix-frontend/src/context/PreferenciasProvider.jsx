import { useEffect, useState } from "react"

import { PreferenciasContext } from "./PreferenciasContext"

export function PreferenciasProvider({ children }) {

    const [mostrarFechaHora, setMostrarFechaHora] = useState(() => {

        const valorGuardado = localStorage.getItem("mostrarFechaHora")

        if (valorGuardado === null) {
            return true
        }

        return valorGuardado === "true"
    })

    const [mostrarDecimales, setMostrarDecimales] = useState(() => {

        const valorGuardado = localStorage.getItem("mostrarDecimales")

        if (valorGuardado === null) {
            return true
        }

        return valorGuardado === "true"
    })

    useEffect(() => {

        localStorage.setItem(
            "mostrarFechaHora",
            mostrarFechaHora
        )

    }, [mostrarFechaHora])

    useEffect(() => {

        localStorage.setItem(
            "mostrarDecimales",
            mostrarDecimales
        )

    }, [mostrarDecimales])

    return (
        <PreferenciasContext.Provider
            value={{
                mostrarFechaHora,
                setMostrarFechaHora,
                mostrarDecimales,
                setMostrarDecimales
            }}
        >
            {children}
        </PreferenciasContext.Provider>
    )
}