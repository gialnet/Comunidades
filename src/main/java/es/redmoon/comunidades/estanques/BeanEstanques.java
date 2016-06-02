
package es.redmoon.comunidades.estanques;

import java.io.Serializable;

/**
 *
 * @author antonio
 */
public class BeanEstanques implements Serializable {
    
    private String codigo;
    private String descripcion;
    private String comunero;
    private String propietario;
    private String comunidad;
    private String unidades;
    private String horas;
    private String anejo;
    private String ordenriego;
    private String version;

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getComunero() {
        return comunero;
    }

    public void setComunero(String comunero) {
        this.comunero = comunero;
    }

    public String getPropietario() {
        return propietario;
    }

    public void setPropietario(String propietario) {
        this.propietario = propietario;
    }

    public String getComunidad() {
        return comunidad;
    }

    public void setComunidad(String comunidad) {
        this.comunidad = comunidad;
    }

    public String getUnidades() {
        return unidades;
    }

    public void setUnidades(String unidades) {
        this.unidades = unidades;
    }

    public String getHoras() {
        return horas;
    }

    public void setHoras(String horas) {
        this.horas = horas;
    }

    public String getAnejo() {
        return anejo;
    }

    public void setAnejo(String anejo) {
        this.anejo = anejo;
    }

    public String getOrdenriego() {
        return ordenriego;
    }

    public void setOrdenriego(String ordenriego) {
        this.ordenriego = ordenriego;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
    
    
}
