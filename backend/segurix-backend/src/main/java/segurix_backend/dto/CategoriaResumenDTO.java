package segurix_backend.dto;

import java.math.BigDecimal;

public class CategoriaResumenDTO {

    private String categoria;
    private BigDecimal total;

    public CategoriaResumenDTO(String categoria, BigDecimal total) {
        this.categoria = categoria;
        this.total = total;
    }

    public String getCategoria() {
        return categoria;
    }

    public BigDecimal getTotal() {
        return total;
    }

}
