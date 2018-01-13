package es.redmoon.comunidades.altas;

/**
 *
 * @author antonio
 */
import java.sql.Connection;
import java.sql.SQLException;
import javax.naming.Context;
import javax.naming.NamingException;
import javax.sql.DataSource;
//import org.checkthread.annotations.ThreadSafe;

/**
 * conecta con la base de datos de configuración y control de acceso
 * A partir de esta conexión obetenemos el nombre de conexión de cada una de
 * las comunidades. Es decir esta aplicación maneja múltiples bases de datos
 * una para cada comunidad de propietarios o pozos come se quiera denimonar
 * @author antonio
 */
//@ThreadSafe
public abstract class PoolConnAltas {
    
    private static DataSource datasource;
    //protected Connection connection;
    
    public PoolConnAltas() throws SQLException, NamingException {
        
            Context ctx = new javax.naming.InitialContext();

            // 	 jdbc/myEmpresa001
            // jdbc/myOwnerCommuSysConfig
            datasource = (DataSource) ctx.lookup("jdbc/myOwnerCommuSysConfig");

    }
    
    /**
     * entregar una conexión a PostgreSQL desde el Pool de Glassfish
     * @return una conexión JDBC a PostgreSQL
     * @throws SQLException
     */
    public static Connection PGconectar() throws SQLException
    {

            Connection connection = null;

            synchronized (datasource) {
			connection = datasource.getConnection();
			}
            
            if (connection == null) {
                System.out.println("no se obtuvo la conexion");
            }
            
        return connection;
    }
    
}

