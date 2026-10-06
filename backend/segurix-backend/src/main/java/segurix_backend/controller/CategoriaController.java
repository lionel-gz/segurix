package segurix_backend.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import segurix_backend.model.Categoria;
import segurix_backend.repository.CategoriaRepository;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    private final CategoriaRepository categoriaRepository;

    public CategoriaController(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @GetMapping
    public List<Categoria> obtenerTodas() {
        return categoriaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Categoria categoria) {

        String nombre = categoria.getNombre().trim();

        if (categoriaRepository.existsByNombreIgnoreCase(nombre)) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of(
                            "message",
                            "Ya existe una categoría con ese nombre"
                    ));
        }

        categoria.setNombre(nombre);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(categoriaRepository.save(categoria));
    }

    /*
    @PutMapping("/{id}")
    public ResponseEntity<?> editar(
            @PathVariable Integer id,
            @Valid @RequestBody Categoria datos) {

        Categoria categoriaExistente =
                categoriaRepository.findById(id).orElse(null);

        if (categoriaExistente == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "message",
                            "La categoría no existe"
                    ));
        }

        String nombre = datos.getNombre().trim();

        boolean existeOtraCategoria =
                categoriaRepository.existsByNombreIgnoreCase(nombre)
                        && !categoriaExistente.getNombre().equalsIgnoreCase(nombre);

        if (existeOtraCategoria) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of(
                            "message",
                            "Ya existe una categoría con ese nombre"
                    ));
        }

        categoriaExistente.setNombre(nombre);

        return ResponseEntity.ok(
                categoriaRepository.save(categoriaExistente)
        );
    }

     */


}