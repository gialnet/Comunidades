
package es.redmoon.comunidades.tickets;

import es.redmoon.comunidades.sesion.PoolConn;
import static es.redmoon.comunidades.sesion.PoolConn.PGconectar;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.naming.NamingException;
import org.apache.commons.lang3.StringUtils;

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
    public List<TuplasTickets> getListaTickets(int NumPage, int SizePage, String xEstanque) throws SQLException {
        
        Connection conn = PGconectar();
        List<TuplasTickets> tp = new ArrayList<>();
        
        try {
         

            int Offset = SizePage * (NumPage-1);
            PreparedStatement st = conn.prepareStatement("SELECT * from Tickets where estanque = ? order by id desc LIMIT ? OFFSET ?");
            st.setInt(1, Integer.parseInt(xEstanque) );
            st.setInt(2, SizePage);
            st.setInt(3, Offset);
            
            ResultSet rs = st.executeQuery();
            
            while (rs.next()) {
                
                tp.add( new TuplasTickets.
                        Builder().
                        Id(rs.getString("id")).
                        nTicket((StringUtils.isEmpty(rs.getString("nticket"))) ? "": rs.getString("nticket")).
                        Canal_compra(rs.getString("canal_compra")).
                        Minutos_comprados((StringUtils.isEmpty(rs.getString("minutos_comprados"))) ? "Llenado": rs.getString("minutos_comprados")).
                        Fecha_buy(rs.getString("fecha_buy")).
                        Pendiente(rs.getString("pendiente")).
                        Observaciones((StringUtils.isEmpty(rs.getString("observaciones"))) ? "": rs.getString("observaciones")).
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
    
    /**
     * 
     * @param xEstanque
     * @throws SQLException 
     */
    public void CompraLleno(String xEstanque) throws SQLException
    {
        Connection conn = PGconectar();

        try {
         


            PreparedStatement st = conn.prepareStatement("SELECT ComprarTicketLlenado(?)");
            st.setInt(1, Integer.parseInt(xEstanque) );
            
            ResultSet rs = st.executeQuery();
            
            rs.next();
            
        } catch (SQLException e) {

            System.out.println("ComprarTicketLlenado Connection Failed!");

        } finally {

            conn.close();
        }
    }
    
    /**
     * 
     * @param xEstanque
     * @param xMinutos
     * @throws SQLException 
     */
    public void CompraMinutos(String xEstanque, String xMinutos) throws SQLException
    {
        Connection conn = PGconectar();

        try {
         
            PreparedStatement st = conn.prepareStatement("SELECT ComprarTicketMinutos(?,?)");
            st.setInt(1, Integer.parseInt(xEstanque) );
            st.setInt(2, Integer.parseInt(xMinutos) );
            
            ResultSet rs = st.executeQuery();
            
            rs.next();
            
        } catch (SQLException e) {

            System.out.println("ComprarTicketLlenado Connection Failed!");

        } finally {

            conn.close();
        }
    }

    
}
