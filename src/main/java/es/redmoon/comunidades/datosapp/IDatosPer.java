package es.redmoon.comunidades.datosapp;

import java.sql.SQLException;
import javax.naming.NamingException;

/**
 * // Datos del Pozo
 *  
 * @author antonio
 */
public interface IDatosPer {

    public void ReadDatosPer() throws SQLException, NamingException;
    
    public String getNif();
   
    public String getRazonSocial();
    
    public String getDireccion();
    
    public String getObjeto();

    public String getPoblacion();
    
    public String getMovil();
    
    public String getFax();

    public String getMail();
    
    public String getUrl_web();
    
    public String getUrl_tsa();
    
    public String getFecha_constitucion();
    
    public String getFormaJuridica();
    
    public String getSociedades();
    
    public String getFecha();
    
    public String getCNAE();
    
    public String getIBAN();
    
    public String getBIC();
    
    public String getEntidadPresenta();
    
    public String getOficinaPresenta();
    
    public String getSufijo();
    
    public int getPeriodicidad_er();
    
    public String getEmiteRemesas();
    
    public String getPresupuestos();
   
}
