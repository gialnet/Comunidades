
package es.redmoon.comunidades.sesion;

import java.sql.SQLException;
import javax.naming.NamingException;

/**
 * Soporte para crear el objeto de sesión
 * @author antonio
 */
public class SQLConn extends PoolConn {
    
    private final String version;
    
    public SQLConn(String DataBase) throws SQLException, NamingException {
        
        super(DataBase);
        this.version=DataBase;
    }


    private void AccionesErrorLogin()
    {
        // Realizar acciones despues de un fallo de login
        System.out.println("Error al procesar el login de usuario");
    }
    
    
}
