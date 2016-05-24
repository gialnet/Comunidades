/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package es.redmoon.comunidades.datosapp;

/**
 *
 * @author antonio
 */
public class Tuplasdatosper_legal{
    
    private final int id;
    private final String forma_juridica;

    public int getId() {
        return id;
    }

    public String getForma_juridica() {
        return forma_juridica;
    }
    

    public static class Builder {

        private int id;
        private String forma_juridica;
    
        public Builder() {
            super();
        }

        public Builder Id(final int id) {
            this.id = id;
            return this;
        }

        public Builder Forma_juridica(final String forma_juridica) {
            this.forma_juridica = forma_juridica;
            return this;
        }

        public Tuplasdatosper_legal build() {
            return new Tuplasdatosper_legal(this);
        }
    }

    private Tuplasdatosper_legal(Builder builder) {
        this.id = builder.id;
        this.forma_juridica = builder.forma_juridica;
    }
    
    
    
}
