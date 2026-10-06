package segurix_backend.service;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import segurix_backend.model.Categoria;
import segurix_backend.model.Gasto;
import segurix_backend.model.MedioPago;
import segurix_backend.repository.CategoriaRepository;
import segurix_backend.repository.GastoRepository;
import segurix_backend.repository.MedioPagoRepository;
import segurix_backend.specification.GastoSpecification;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class GastoService {

    private final GastoRepository gastoRepository;
    private final CategoriaRepository categoriaRepository;
    private final MedioPagoRepository medioPagoRepository;

    public GastoService(
            GastoRepository gastoRepository,
            CategoriaRepository categoriaRepository,
            MedioPagoRepository medioPagoRepository) {

        this.gastoRepository = gastoRepository;
        this.categoriaRepository = categoriaRepository;
        this.medioPagoRepository = medioPagoRepository;
    }

    public List<Gasto> obtenerTodos() {
        return gastoRepository.findAll();
    }

    public Optional<Gasto> obtenerPorId(Integer id) {
        return gastoRepository.findById(id);
    }

    public Gasto guardar(Gasto gasto) {

        if (gasto.getCategoria() != null) {

            Integer categoriaId = gasto.getCategoria().getId();

            Categoria categoria = categoriaRepository
                    .findById(categoriaId)
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "La categoría no existe"
                            )
                    );

            gasto.setCategoria(categoria);
        }

        if (gasto.getMedioPago() != null) {

            Integer medioPagoId = gasto.getMedioPago().getId();

            MedioPago medioPago = medioPagoRepository
                    .findById(medioPagoId)
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "El medio de pago no existe"
                            )
                    );

            gasto.setMedioPago(medioPago);
        }

        return gastoRepository.save(gasto);
    }

    public Optional<Gasto> actualizar(Integer id, Gasto datos) {

        Optional<Gasto> gastoExistente = gastoRepository.findById(id);

        if (gastoExistente.isEmpty()) {
            return Optional.empty();
        }

        Gasto gasto = gastoExistente.get();

        gasto.setDescripcion(datos.getDescripcion());
        gasto.setMonto(datos.getMonto());

        if (datos.getCategoria() != null) {

            Integer categoriaId = datos.getCategoria().getId();

            Categoria categoria = categoriaRepository
                    .findById(categoriaId)
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "La categoría no existe"
                            )
                    );

            gasto.setCategoria(categoria);
        }

        if (datos.getMedioPago() != null) {

            Integer medioPagoId = datos.getMedioPago().getId();

            MedioPago medioPago = medioPagoRepository
                    .findById(medioPagoId)
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "El medio de pago no existe"
                            )
                    );

            gasto.setMedioPago(medioPago);
        }

        return Optional.of(gastoRepository.save(gasto));
    }

    public boolean eliminar(Integer id) {

        if (!gastoRepository.existsById(id)) {
            return false;
        }

        gastoRepository.deleteById(id);
        return true;
    }

    public List<Gasto> buscarConFiltros(
            String descripcion,
            Integer categoriaId,
            Integer medioPagoId,
            LocalDateTime desde,
            LocalDateTime hasta,
            BigDecimal montoMinimo,
            BigDecimal montoMaximo) {

        Specification<Gasto> specification = null;

        if (descripcion != null && !descripcion.isBlank()) {
            specification = GastoSpecification.porDescripcion(descripcion);
        }

        if (categoriaId != null) {

            Specification<Gasto> categoriaSpecification =
                    GastoSpecification.porCategoria(categoriaId);

            if (specification == null) {
                specification = categoriaSpecification;
            } else {
                specification = specification.and(categoriaSpecification);
            }
        }

        if (medioPagoId != null) {

            Specification<Gasto> medioPagoSpecification =
                    GastoSpecification.porMedioPago(medioPagoId);

            if (specification == null) {
                specification = medioPagoSpecification;
            } else {
                specification = specification.and(medioPagoSpecification);
            }
        }

        if (desde != null) {

            Specification<Gasto> desdeSpecification =
                    GastoSpecification.porFechaDesde(desde);

            if (specification == null) {
                specification = desdeSpecification;
            } else {
                specification = specification.and(desdeSpecification);
            }
        }

        if (hasta != null) {

            Specification<Gasto> hastaSpecification =
                    GastoSpecification.porFechaHasta(hasta);

            if (specification == null) {
                specification = hastaSpecification;
            } else {
                specification = specification.and(hastaSpecification);
            }
        }

        if (montoMinimo != null) {

            Specification<Gasto> montoMinimoSpecification =
                    GastoSpecification.porMontoMinimo(montoMinimo);

            if (specification == null) {
                specification = montoMinimoSpecification;
            } else {
                specification = specification.and(montoMinimoSpecification);
            }
        }

        if (montoMaximo != null) {

            Specification<Gasto> montoMaximoSpecification =
                    GastoSpecification.porMontoMaximo(montoMaximo);

            if (specification == null) {
                specification = montoMaximoSpecification;
            } else {
                specification = specification.and(montoMaximoSpecification);
            }
        }

        if (specification == null) {
            return gastoRepository.findAll();
        }

        return gastoRepository.findAll(specification);
    }
}