
package es.redmoon.comunidades.tickets;

import java.io.Serializable;

/**
 *
 * @author antonio
 */
public class BeanServiciosEstanque implements Serializable {
    

    private String estanque;
    private String minutos_servidos;
    private String fecha;

    public String getEstanque() {
        return estanque;
    }

    public void setEstanque(String estanque) {
        this.estanque = estanque;
    }

    public String getMinutos_servidos() {
        return minutos_servidos;
    }

    public void setMinutos_servidos(String minutos_servidos) {
        this.minutos_servidos = minutos_servidos;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
    
    
}
