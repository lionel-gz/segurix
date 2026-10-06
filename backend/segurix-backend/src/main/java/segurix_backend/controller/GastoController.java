package segurix_backend.controller;

import org.springframework.web.bind.annotation.*;
import segurix_backend.model.Gasto;
import segurix_backend.service.GastoService;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;

import java.util.List;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/gastos")
public class GastoController {

    private final GastoService gastoService;
    public GastoController(GastoService gastoService) {
        this.gastoService = gastoService;
    }

    @GetMapping
    public List<Gasto> obtenerTodos(
            @RequestParam(required = false) String descripcion,
            @RequestParam(required = false) Integer categoria,
            @RequestParam(required = false) Integer medioPago,
            @RequestParam(required = false) LocalDateTime desde,
            @RequestParam(required = false) LocalDateTime hasta,
            @RequestParam(required = false) BigDecimal montoMinimo,
            @RequestParam(required = false) BigDecimal montoMaximo) {

        return gastoService.buscarConFiltros(
                descripcion,
                categoria,
                medioPago,
                desde,
                hasta,
                montoMinimo,
                montoMaximo
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Gasto> obtenerPorId(@PathVariable Integer id) {

        Optional<Gasto> gasto = gastoService.obtenerPorId(id);

        if (gasto.isPresent()) {
            return ResponseEntity.ok(gasto.get());

        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public Gasto guardar(@Valid @RequestBody Gasto gasto) {
        return gastoService.guardar(gasto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Gasto> actualizar(
            @PathVariable Integer id,
            @Valid @RequestBody Gasto datos) {

        Optional<Gasto> gastoActualizado = gastoService.actualizar(id, datos);

        if (gastoActualizado.isPresent()) {

            return ResponseEntity.ok(gastoActualizado.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {

        boolean eliminado = gastoService.eliminar(id);

        if (eliminado) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
