
package es.redmoon.comunidades.estanques;

import static es.redmoon.comunidades.sesion.PoolConn.PGconectar;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author antonio
 */
public class EstanquesImpl implements IEstanques {

    @Override
    public TuplasEstanques getEstanqueByCodigo(String xCodigo) throws SQLException {
        
       TuplasEstanques tp = null;

       try (Connection conn = PGconectar();
              PreparedStatement st = conn.prepareStatement("SELECT * from propiedades where codigo=?") ) {

               st.setString(1, xCodigo);

               try (ResultSet rs = st.executeQuery()) {

                   while (rs.next()) {

                       tp = new TuplasEstanques.Builder().
                               Codigo(rs.getString("codigo")).
                               Comunero(rs.getString("comunero")).
                               Comunidad(rs.getString("comunidad")).
                               Propietario(rs.getString("propietario")).
                               Anejo(rs.getString("anejo")).
                               build();

                   }
           }

       } catch (SQLException e) {

           System.out.println("propiedades Connection Failed!" + e.getMessage());

       }

       return tp;
    }
    
}
