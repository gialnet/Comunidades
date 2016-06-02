
package es.redmoon.comunidades.tickets;

import es.redmoon.comunidades.comuneros.TuplasComuneros;
import es.redmoon.comunidades.sesion.PoolConn;
import static es.redmoon.comunidades.sesion.PoolConn.PGconectar;
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
public class SQLTickets extends PoolConn {
    private final String version;

    public SQLTickets(String myPool) throws SQLException, NamingException {
        super(myPool);
        this.version = myPool;
    }

    /**
     * 
     * @param xEstanque
     * @return
     * @throws SQLException 
     */
    public List<TuplasTickets> getListaTickets(String xEstanque) throws SQLException {
        
        Connection conn = PGconectar();
        List<TuplasTickets> tp = new ArrayList<>();
        
        try {
         

            PreparedStatement st = conn.prepareStatement("SELECT * from Tickets where estanque = ?");
            st.setString(1, xEstanque);
            
            ResultSet rs = st.executeQuery();
            
            while (rs.next()) {
                
                tp.add( new TuplasTickets.
                        Builder().
                        Id(rs.getString("id")).
                        nTicket(rs.getString("nticket")).
                        Canal_compra(rs.getString("canal_compra")).
                        Minutos_comprados(rs.getString("minutos_comprados")).
                        Fecha(rs.getString("fecha")).
                        Observaciones(rs.getString("observaciones")).
                        build()
                         );
            }
            
        } catch (SQLException e) {

            System.out.println("Tickets por número de estanque Connection Failed!");

        } finally {

            conn.close();
        }
        
        return tp;
    }
}
