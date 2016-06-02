/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package es.redmoon.comunidades.tickets;

import java.io.Serializable;

/**
 *
 * @author antonio
 */
public class BeanSaldo implements Serializable {
    

    private String estanque;
    private String minutos_comprados;
    private String minutos_saldo;

    public String getEstanque() {
        return estanque;
    }

    public void setEstanque(String estanque) {
        this.estanque = estanque;
    }

    public String getMinutos_comprados() {
        return minutos_comprados;
    }

    public void setMinutos_comprados(String minutos_comprados) {
        this.minutos_comprados = minutos_comprados;
    }

    public String getMinutos_saldo() {
        return minutos_saldo;
    }

    public void setMinutos_saldo(String minutos_saldo) {
        this.minutos_saldo = minutos_saldo;
    }
    
    
    
}
