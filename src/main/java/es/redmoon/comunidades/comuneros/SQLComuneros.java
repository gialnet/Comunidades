
package es.redmoon.comunidades.comuneros;

import es.redmoon.comunidades.sesion.PoolConn;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.naming.NamingException;

/**
 *
 * @author antonio
 */
public class SQLComuneros extends PoolConn {
    private final String version;

    /**
     * Constructor de la clase de compañías
     * @param myPool
     * @throws SQLException
     * @throws NamingException 
     */
    public SQLComuneros(String myPool) throws SQLException, NamingException {
        super(myPool);
        this.version = myPool;
    }
    
    
    /**
     * Crea una lista de comuneros
     * @return
     * @throws SQLException 
     */
    public List<TuplasComuneros> getListaComuneros() throws SQLException {
        
        Connection conn = PGconectar();
        List<TuplasComuneros> tp = new ArrayList<>();
        
        try {
         

            PreparedStatement st = conn.prepareStatement("SELECT * from comuneros");
            
            ResultSet rs = st.executeQuery();
            
            while (rs.next()) {
                
                tp.add( new TuplasComuneros.
                        Builder().
                        Nombre(rs.getString("nombre")).
                        Apellidos(rs.getString("apellidos")).
                        Movil(rs.getString("movil")).
                        Email(rs.getString("email")).
                        build()
                         );
            }
            
        } catch (SQLException e) {

            System.out.println("Comuneros Connection Failed!");

        } finally {

            conn.close();
        }
        
        return tp;
    }
    
    /**
     * Leer los datos de un comunero por su código
     * @param xCodigo
     * @return
     * @throws SQLException 
     */
    public TuplasComuneros getComuneroByCodigo(String xCodigo) throws SQLException {
        
        Connection conn = PGconectar();
        TuplasComuneros tp = null;
        
        try {
         

            PreparedStatement st = conn.prepareStatement("SELECT * from comuneros where codigo=?");
            st.setString(1, xCodigo);
            
            ResultSet rs = st.executeQuery();
            
            while (rs.next()) {
                
               tp = new TuplasComuneros.Builder().
                        Nombre(rs.getString("nombre")).
                        Apellidos(rs.getString("apellidos")).
                        Movil(rs.getString("movil")).
                        Email(rs.getString("email")).
                        build();
                
            }
            
        } catch (SQLException e) {

            System.out.println("Comuneros Connection Failed!");

        } finally {

            conn.close();
        }
        
        return tp;
    }
    
}
