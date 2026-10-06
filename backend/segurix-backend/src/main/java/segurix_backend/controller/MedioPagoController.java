package segurix_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;

import segurix_backend.model.MedioPago;
import segurix_backend.repository.MedioPagoRepository;


import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/medios-pago")
public class MedioPagoController {

    private final MedioPagoRepository medioPagoRepository;

    public MedioPagoController(MedioPagoRepository medioPagoRepository) {
        this.medioPagoRepository = medioPagoRepository;
    }

    @GetMapping
    public List<MedioPago> obtenerTodos() {
        return medioPagoRepository.findAll();

    }

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody MedioPago medioPago) {

        String nombre = medioPago.getNombre().trim();

        if (medioPagoRepository.existsByNombreIgnoreCase(nombre)) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of(
                            "message",
                            "Ya existe un medio de pago con ese nombre"
                    ));
        }

        medioPago.setNombre(nombre);

        return ResponseEntity.ok(
                medioPagoRepository.save(medioPago)
        );
    }


}