package segurix_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import segurix_backend.model.MedioPago;

public interface MedioPagoRepository extends JpaRepository<MedioPago, Integer> {

    boolean existsByNombreIgnoreCase(String nombre);

}