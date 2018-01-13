
package es.redmoon.comunidades.comuneros;

import static es.redmoon.comunidades.sesion.PoolConn.PGconectar;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author antonio
 */
public class ComunerosImpl implements IComuneros {

    public ComunerosImpl() {
    }

    
    /**
     * 
     * @return
     * @throws SQLException 
     */
    @Override
    public List<TuplasComuneros> getListaComuneros() throws SQLException {
        
        List<TuplasComuneros> tp = new ArrayList<>();
        
            try (Connection conn = PGconectar();
                 PreparedStatement st = conn.prepareStatement("SELECT * from comuneros");
                    ResultSet rs = st.executeQuery()) {

                    while (rs.next()) {

                        tp.add(new TuplasComuneros.Builder().
                                Nombre(rs.getString("nombre")).
                                Apellidos(rs.getString("apellidos")).
                                Movil(rs.getString("movil")).
                                Email(rs.getString("email")).
                                build()
                        );
            }

        } catch (SQLException e) {

            System.out.println("Comuneros Connection Failed!" + e.getMessage());

        }
        
        return tp;
    }

    /**
     * 
     * @param xCodigo
     * @return
     * @throws SQLException 
     */
    @Override
    public TuplasComuneros getComuneroByCodigo(String xCodigo) throws SQLException {
        
        TuplasComuneros tp = null;
        
        try (Connection conn = PGconectar();
              PreparedStatement st = conn.prepareStatement("SELECT * from comuneros where codigo=?")  ) {

                st.setString(1, xCodigo);

                try (ResultSet rs = st.executeQuery()) {

                    while (rs.next()) {

                        tp = new TuplasComuneros.Builder().
                                Nombre(rs.getString("nombre")).
                                Apellidos(rs.getString("apellidos")).
                                Movil(rs.getString("movil")).
                                Email(rs.getString("email")).
                                build();

                    }
            }

        } catch (SQLException e) {

            System.out.println("Comuneros Connection Failed!" + e.getMessage());

        }
        
        return tp;
    }
    
}