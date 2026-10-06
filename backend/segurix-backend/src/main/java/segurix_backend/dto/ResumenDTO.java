package segurix_backend.dto;

import java.math.BigDecimal;
import java.util.List;

public class ResumenDTO {

    private BigDecimal total;
    private Integer cantidad;
    private List<CategoriaResumenDTO> porCategoria;

    public ResumenDTO(BigDecimal total, Integer cantidad,List<CategoriaResumenDTO> porCategoria) {
        this.cantidad = cantidad;
        this.total = total;
        this.porCategoria = porCategoria;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public List<CategoriaResumenDTO> getPorCategoria() {
        return porCategoria;
    }


}
