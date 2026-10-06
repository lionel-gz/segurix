package segurix_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import segurix_backend.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

    boolean existsByNombreIgnoreCase(String nombre);

}