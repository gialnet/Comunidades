
package es.redmoon.comunidades.tickets;

/**
 *
 * @author antonio
 */
public class TuplasSaldo {

    
    private final String estanque;
    private final String minutos_comprados;
    private final String minutos_saldo;

    public String getEstanque() {
        return estanque;
    }

    public String getMinutos_comprados() {
        return minutos_comprados;
    }

    public String getMinutos_saldo() {
        return minutos_saldo;
    }
    
    
    public static class Builder {
        private String estanque;
        private String minutos_comprados;
        private String minutos_saldo;
        private String version;
        
        public Builder() {
            this.version = "1.0";
        }
        
        public Builder Estanque(final String estanque) {
            this.estanque = estanque;
            return this;
        }
        
        public Builder Minutos_comprados(final String minutos_comprados) {
            this.minutos_comprados = minutos_comprados;
            return this;
        }
        
        public Builder Minutos_saldo(final String minutos_saldo) {
            this.minutos_saldo = minutos_saldo;
            return this;
        }
        
        public TuplasSaldo build() {
            return new TuplasSaldo(this);
        }
    }
    
    private TuplasSaldo(Builder builder) {
        
        this.estanque=builder.estanque;
        this.minutos_comprados=builder.minutos_comprados;
        this.minutos_saldo=builder.minutos_saldo;

    }
    
}
