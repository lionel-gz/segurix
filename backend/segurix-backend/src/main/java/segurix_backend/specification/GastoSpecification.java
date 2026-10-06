package segurix_backend.specification;

import org.springframework.data.jpa.domain.Specification;
import segurix_backend.model.Gasto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class GastoSpecification {

    public static Specification<Gasto> porDescripcion(String descripcion) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("descripcion")),
                        "%" + descripcion.toLowerCase() + "%"
                );
    }

    public static Specification<Gasto> porCategoria(Integer categoriaId) {

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("categoria").get("id"), categoriaId);
    }


    public static Specification<Gasto> porMedioPago(Integer medioPagoId) {

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("medioPago").get("id"), medioPagoId);
    }


    public static Specification<Gasto> porFechaDesde(LocalDateTime desde) {

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(root.get("fechaHora"), desde);
    }

    public static Specification<Gasto> porFechaHasta(LocalDateTime hasta) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.lessThanOrEqualTo(
                        root.get("fechaHora"),
                        hasta
                );
    }


    public static Specification<Gasto> porMontoMinimo(BigDecimal montoMinimo) {

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(
                        root.get("monto"),
                        montoMinimo
                );
    }


    public static Specification<Gasto> porMontoMaximo(BigDecimal montoMaximo) {

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.lessThanOrEqualTo(
                        root.get("monto"),
                        montoMaximo
                );
    }


}