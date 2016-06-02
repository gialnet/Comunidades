
package es.redmoon.comunidades.tickets;

/**
 *
 * @author antonio
 */
public class TuplasServiciosEstanque {

    private final String estanque;
    private final String minutos_servidos;
    private final String fecha;

    public String getEstanque() {
        return estanque;
    }

    public String getMinutos_servidos() {
        return minutos_servidos;
    }

    public String getFecha() {
        return fecha;
    }

    
    public static class Builder {
        private String estanque;
        private String minutos_servidos;
        private String fecha;
        private String version;
        
        public Builder() {
            this.version = "1.0";
        }
        
        public Builder Estanque(final String estanque) {
            this.estanque = estanque;
            return this;
        }
        
        public Builder Minutos_servidos(final String minutos_servidos) {
            this.minutos_servidos = minutos_servidos;
            return this;
        }
        
        public Builder Fecha(final String fecha) {
            this.fecha = fecha;
            return this;
        }
        
        public TuplasServiciosEstanque build() {
            return new TuplasServiciosEstanque(this);
        }
    }
    
    private TuplasServiciosEstanque(Builder builder) {
        
        this.estanque=builder.estanque;
        this.minutos_servidos=builder.minutos_servidos;
        this.fecha=builder.fecha;

    }
    
}
