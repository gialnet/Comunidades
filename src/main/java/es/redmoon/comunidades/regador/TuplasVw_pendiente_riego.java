/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package es.redmoon.comunidades.regador;

/**
 *
 * @author antonio
 */
public class TuplasVw_pendiente_riego {
    private final String id;
    private final String estanque;
    private final String canal_compra;
    private final String tipo;
    private final String minutos_saldo;
    private final String nombre;
    private final String anejo;
    private final String ordenriego;

    public String getCanal_compra() {
        return canal_compra;
    }

    public String getTipo() {
        return tipo;
    }

    public String getMinutos_saldo() {
        return minutos_saldo;
    }

    public String getNombre() {
        return nombre;
    }

    public String getAnejo() {
        return anejo;
    }

    public String getOrdenriego() {
        return ordenriego;
    }

    
    public static class Builder {
        private String id;
        private String estanque;
        private String canal_compra;
        private String tipo;
        private String minutos_saldo;
        private String nombre;
        private String anejo;
        private String ordenriego;
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
        
        public Builder Canal_compra(final String canal_compra) {
            this.canal_compra = canal_compra;
            return this;
        }
        
        public Builder Tipo(final String tipo) {
            this.tipo = tipo;
            return this;
        }
        public Builder Minutos_saldo(final String minutos_saldo) {
            this.minutos_saldo = minutos_saldo;
            return this;
        }
        public Builder Nombre(final String nombre) {
            this.nombre = nombre;
            return this;
        }
        
        public Builder Anejo(final String anejo) {
            this.anejo = anejo;
            return this;
        }
        
        public Builder Ordenriego(final String ordenriego) {
            this.ordenriego = ordenriego;
            return this;
        }
        
        public TuplasVw_pendiente_riego build() {
            return new TuplasVw_pendiente_riego(this);
        }
    }
    
    private TuplasVw_pendiente_riego(Builder builder) {
        
        this.id=builder.id;
        this.estanque=builder.estanque;
        this.canal_compra=builder.canal_compra;
        this.tipo=builder.tipo;
        this.minutos_saldo=builder.minutos_saldo;
        this.nombre=builder.nombre;
        this.anejo=builder.anejo;
        this.ordenriego=builder.ordenriego;
    }
}
