import { useEffect } from "react"
import "../styles/Toast.css"

function Toast({ mensaje, tipo = "exito", onCerrar }) {

    useEffect(() => {

        const temporizador = setTimeout(() => {
            onCerrar()
        }, 3000)

        return () => {
            clearTimeout(temporizador)
        }

    }, [onCerrar])

    return (
        <div className={`toast toast-${tipo}`} role="status" aria-live="polite">
            <span className="toast-icono">
                ✓
            </span>

            <span>
                {mensaje}
            </span>
        </div>
    )
}

export default Toast