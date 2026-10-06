package segurix_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import segurix_backend.model.Gasto;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface GastoRepository extends JpaRepository<Gasto,Integer>,JpaSpecificationExecutor<Gasto> {

}
