/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package es.redmoon.comunidades.estanques;

import es.redmoon.comunidades.sesion.PoolConn;
import static es.redmoon.comunidades.sesion.PoolConn.PGconectar;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.naming.NamingException;

/**
 *
 * @author antonio
 */
public class SQLEstanques extends PoolConn {
    
    private final String version;

    public SQLEstanques(String myPool) throws SQLException, NamingException {
        super(myPool);
        this.version = myPool;
    }
    
    
   /**
    * El campo comunidad no tiene sentido pues la estructura en una base de datos
    * por cada comunidad
    * @param xCodigo
    * @return
    * @throws SQLException 
    */
   public TuplasEstanques getEstanqueByCodigo(String xCodigo) throws SQLException {
        
        Connection conn = PGconectar();
        TuplasEstanques tp = null;
        
        try {
         

            PreparedStatement st = conn.prepareStatement("SELECT * from propiedades where codigo=?");
            st.setString(1, xCodigo);
            
            ResultSet rs = st.executeQuery();
            
            while (rs.next()) {
                
               tp = new TuplasEstanques.Builder().
                        Codigo(rs.getString("codigo")).
                        Comunero(rs.getString("comunero")).
                        Comunidad(rs.getString("comunidad")).
                        Propietario(rs.getString("propietario")).
                        Anejo(rs.getString("anejo")).
                        build();
                
            }
            
        } catch (SQLException e) {

            System.out.println("propiedades Connection Failed!");

        } finally {

            conn.close();
        }
        
        return tp;
    } 
    
}
