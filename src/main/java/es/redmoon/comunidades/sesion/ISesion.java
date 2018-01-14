/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.redmoon.comunidades.sesion;

import java.sql.SQLException;
import javax.naming.NamingException;

/**
 *
 * @author antonio
 */
public interface ISesion {
    
    
    public boolean GetDataSessionUser(String xUser) throws SQLException, NamingException;
    
    // ID de la propiedad identifica de forma única la finca 
    public String getxIDFinca();
    
    // ID del comunero de la finca no tiene porque ser el propietario
    public String getxComunero();
    public String getxNIFComunero();
    public String getxNombreComunero();
    public boolean getIsAuth();
    
   
}
