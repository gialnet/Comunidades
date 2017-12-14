/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package es.redmoon.comunidades.sesion;

import java.sql.Connection;
import java.sql.SQLException;
import javax.naming.Context;
import javax.naming.NamingException;
import javax.sql.DataSource;
import org.checkthread.annotations.ThreadSafe;

/**
 *
 * @author antonio
 */
@ThreadSafe
public abstract class PoolConn {
    
    private static DataSource datasource;
    //protected Connection connection;
    private String QuePool="jdbc/myOwnerCommu00";
    
    public PoolConn() throws SQLException, NamingException {
        
            Context ctx = new javax.naming.InitialContext();

            // 	 jdbc/myEmpresa001
            datasource = (DataSource) ctx.lookup(QuePool);

    }
    
    /**
     * Sobre carga del constructor para guardar compatibilidad con versiones
     * anteriores.
     * @param myPool
     * @throws SQLException
     * @throws NamingException 
     */
    public PoolConn(String myPool) throws SQLException, NamingException {
        
            Context ctx = new javax.naming.InitialContext();

            // 	 jdbc/myPolizaNet001
            datasource = (DataSource) ctx.lookup(myPool);

    }
    
    /**
     * entregar una conexión a PostgreSQL desde el Pool de Glassfish
     * @return una conexión JDBC a PostgreSQL 9.5
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
