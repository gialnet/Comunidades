
package es.redmoon.comunidades.tickets;

/**
 *
 * @author antonio
 */
public class TuplasTickets {
    
    private final String id;
    private final String estanque;
    private final String nticket;
    private final String canal_compra;
    private final String minutos_comprados;
    private final String fecha_buy;
    private final String observaciones;

    public String getId() {
        return id;
    }

    public String getEstanque() {
        return estanque;
    }

    public String getNticket() {
        return nticket;
    }

    public String getCanal_compra() {
        return canal_compra;
    }

    public String getMinutos_comprados() {
        return minutos_comprados;
    }

    public String getFecha_buy() {
        return fecha_buy;
    }

    public String getObservaciones() {
        return observaciones;
    }

    
    public static class Builder {
        private String id;
        private String estanque;
        private String nticket;
        private String canal_compra;
        private String minutos_comprados;
        private String fecha_buy;
        private String observaciones;
        private String version;
        
        public Builder() {
            this.version = "1.0";
        }

        public Builder Id(final String id) {
            this.id = id;
            return this;
        }
        
        public Builder Estanque(final String estanque) {
            this.estanque = estanque;
            return this;
        }
        public Builder nTicket(final String nticket) {
            this.nticket = nticket;
            return this;
        }
        public Builder Canal_compra(final String canal_compra) {
            this.canal_compra = canal_compra;
            return this;
        }
        
        public Builder Minutos_comprados(final String minutos_comprados) {
            this.minutos_comprados = minutos_comprados;
            return this;
        }
        
        public Builder Fecha_buy(final String fecha_buy) {
            this.fecha_buy = fecha_buy;
            return this;
        }
        
        public Builder Observaciones(final String observaciones) {
            this.observaciones = observaciones;
            return this;
        }
        
        public TuplasTickets build() {
            return new TuplasTickets(this);
        }
    }
    
    private TuplasTickets(Builder builder) {
        
        this.id=builder.id;
        this.estanque=builder.estanque;
        this.nticket=builder.nticket;
        this.canal_compra=builder.canal_compra;
        this.minutos_comprados=builder.minutos_comprados;
        this.fecha_buy=builder.fecha_buy;
        this.observaciones=builder.observaciones;
    }
    
}
