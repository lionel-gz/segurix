import { useContext } from "react"

import { PreferenciasContext } from "./PreferenciasContext"

export function usePreferencias() {

    const contexto = useContext(PreferenciasContext)

    if (contexto === null) {
        throw new Error(
            "usePreferencias debe utilizarse dentro de PreferenciasProvider"
        )
    }

    return contexto
}