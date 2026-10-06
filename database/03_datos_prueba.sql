USE segurix;

SELECT
    gasto.id,
    gasto.descripcion,
    gasto.monto,
    gasto.fecha_hora,
    categoria.nombre AS categoria,
    medio_pago.nombre AS medio_pago
FROM gasto
INNER JOIN categoria
    ON gasto.categoria_id = categoria.id
INNER JOIN medio_pago
    ON gasto.medio_pago_id = medio_pago.id;