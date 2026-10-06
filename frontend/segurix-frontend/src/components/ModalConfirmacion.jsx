import "../styles/ModalConfirmacion.css"

function ModalConfirmacion({ mensaje, onConfirmar, onCancelar }) {

    return (
        <div className="modal-fondo" role="dialog" aria-modal="true" aria-labelledby="titulo-confirmacion">

            <div className="modal-confirmacion">

                <h3 id="titulo-confirmacion">Confirmar eliminación</h3>

                <p>{mensaje}</p>

                <div className="modal-acciones">

                    <button
                        className="btn-modal-cancelar"
                        onClick={onCancelar}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn-modal-confirmar"
                        onClick={onConfirmar}
                    >
                        Eliminar
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ModalConfirmacion