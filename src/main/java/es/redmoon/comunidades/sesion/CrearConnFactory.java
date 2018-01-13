
package es.redmoon.comunidades.sesion;

import java.sql.SQLException;
import javax.naming.NamingException;

/**
 *
 * @author antonio
 */
public class CrearConnFactory {

    
    public SQLConn CrearNewConnFactory(String DataBase) throws SQLException, NamingException {
        return new SQLConn(DataBase);
    }
    
    
}
