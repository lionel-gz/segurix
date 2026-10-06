package segurix_backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.LocalDate;

import org.springframework.stereotype.Service;
import segurix_backend.dto.CategoriaResumenDTO;
import segurix_backend.dto.ResumenDTO;
import segurix_backend.model.Gasto;
import segurix_backend.repository.GastoRepository;
import org.springframework.data.jpa.domain.Specification;
import segurix_backend.specification.GastoSpecification;


@Service
public class ResumenService {

    private final GastoRepository gastoRepository;

    // Constructor
    public ResumenService(GastoRepository gastoRepository) {
        this.gastoRepository = gastoRepository;
    }

    public ResumenDTO calcularResumen(LocalDateTime desde, LocalDateTime hasta) {

        Specification<Gasto> specification = GastoSpecification.porFechaDesde(desde).and(GastoSpecification.porFechaHasta(hasta));
        List<Gasto> gastos = gastoRepository.findAll(specification);

        BigDecimal total = gastos.stream().map(Gasto::getMonto).reduce(BigDecimal.ZERO, BigDecimal::add);

        Integer cantidad = gastos.size();

        Map<String, BigDecimal> totalesPorCategoria = new HashMap<>();

        for (Gasto gasto : gastos) {
            String nombreCategoria = gasto.getCategoria().getNombre();

            totalesPorCategoria.merge(
                    nombreCategoria,
                    gasto.getMonto(),
                    BigDecimal::add
            );
        }

        List<CategoriaResumenDTO> porCategoria = new ArrayList<>();

        for (Map.Entry<String, BigDecimal> entrada : totalesPorCategoria.entrySet()) {

            porCategoria.add(
                    new CategoriaResumenDTO(
                            entrada.getKey(),
                            entrada.getValue()
                    )
            );
        }


        return new ResumenDTO(total, cantidad, porCategoria);
    }

    public ResumenDTO calcularResumen(String tipo) {

        LocalDate hoy = LocalDate.now();

        LocalDateTime desde;
        LocalDateTime hasta;

        if (tipo.equalsIgnoreCase("mensual")) {

            desde = hoy.withDayOfMonth(1).atStartOfDay();
            hasta = hoy.withDayOfMonth(hoy.lengthOfMonth()).atTime(23, 59, 59);

        } else if (tipo.equalsIgnoreCase("semanal")) {

            desde = hoy.with(java.time.DayOfWeek.MONDAY).atStartOfDay();
            hasta = hoy.with(java.time.DayOfWeek.SUNDAY).atTime(23, 59, 59);

        } else if (tipo.equalsIgnoreCase("anual")) {

            desde = hoy.withDayOfYear(1).atStartOfDay();
            hasta = hoy.withDayOfYear(hoy.lengthOfYear()).atTime(23, 59, 59);

        } else {
            throw new IllegalArgumentException("Tipo de resumen no válido");
        }
        return calcularResumen(desde, hasta);

        }

}