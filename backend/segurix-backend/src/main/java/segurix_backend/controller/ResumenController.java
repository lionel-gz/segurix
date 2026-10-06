package segurix_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import segurix_backend.dto.ResumenDTO;
import segurix_backend.service.ResumenService;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/gastos/resumen")
public class ResumenController {

    private final ResumenService resumenService;

    public ResumenController(ResumenService resumenService) {
        this.resumenService = resumenService;
    }

    @GetMapping
    public ResumenDTO obtenerResumen(
            @RequestParam String tipo) {

        return resumenService.calcularResumen(tipo);
    }
}