
package es.redmoon.comunidades.tickets;

import static es.redmoon.comunidades.sesion.PoolConn.PGconectar;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.lang3.StringUtils;

/**
 *
 * @author antonio
 */
public class TicketsImpl implements ITickets {

    @Override
    public List<TuplasTickets> getListaTickets(int NumPage, int SizePage, String xEstanque) throws SQLException {
        
        List<TuplasTickets> tp = new ArrayList<>();

        int Offset = SizePage * (NumPage - 1);
        
        try (Connection conn = PGconectar();
              PreparedStatement st = conn.prepareStatement("SELECT * from Tickets where estanque = ? order by id desc LIMIT ? OFFSET ?")  ) 
        {
            
                st.setInt(1, Integer.parseInt(xEstanque));
                st.setInt(2, SizePage);
                st.setInt(3, Offset);

                try (ResultSet rs = st.executeQuery()) {

                    while (rs.next()) {

                        tp.add(new TuplasTickets.Builder().
                                Id(rs.getString("id")).
                                nTicket((StringUtils.isEmpty(rs.getString("nticket"))) ? "" : rs.getString("nticket")).
                                Canal_compra(rs.getString("canal_compra")).
                                Minutos_comprados((StringUtils.isEmpty(rs.getString("minutos_comprados"))) ? "Llenado" : rs.getString("minutos_comprados")).
                                Fecha_buy(rs.getString("fecha_buy")).
                                Pendiente(rs.getString("pendiente")).
                                Observaciones((StringUtils.isEmpty(rs.getString("observaciones"))) ? "" : rs.getString("observaciones")).
                                build()
                        );
                    }
            }

        } catch (SQLException e) {

            System.out.println("Tickets por número de estanque Connection Failed!" + e.getMessage());

        }

        return tp;
    }

    @Override
    public void CompraLleno(String xEstanque) throws SQLException {
        
        try (Connection conn = PGconectar();
                PreparedStatement st = conn.prepareStatement("SELECT ComprarTicketLlenado(?)")) 
        {

                st.setInt(1, Integer.parseInt(xEstanque));

                try (ResultSet rs = st.executeQuery()) {
                    rs.next();
                }

        } catch (SQLException e) {

            System.out.println("ComprarTicketLlenado Connection Failed!" + e.getMessage());

        }
    }

    @Override
    public void CompraMinutos(String xEstanque, String xMinutos) throws SQLException {
        
        try (Connection conn = PGconectar();
                PreparedStatement st = conn.prepareStatement("SELECT ComprarTicketMinutos(?,?)")) {

                st.setInt(1, Integer.parseInt(xEstanque));
                st.setInt(2, Integer.parseInt(xMinutos));

                try (ResultSet rs = st.executeQuery()) {
                    rs.next();
            }

        } catch (SQLException e) {

            System.out.println("ComprarTicketLlenado Connection Failed!" + e.getMessage());

        }
    }

    @Override
    public int CuentaTickects(String estanque, String desde, String hasta) throws SQLException {
        
        StringBuilder SQLSentencia = new StringBuilder("Select * from tickets ");
        // Analizar las variables para configurar la sentencia SQL del listado
        if ((estanque.equals("00") || estanque.equals("")) || estanque==null)
        {
            // Todos los estanques
            SQLSentencia.append("where estanque is not null and pendiente='N' ");
        }
        else
        {
            // sólo una compañía
            SQLSentencia.append("where estanque=");
            SQLSentencia.append(estanque);
            SQLSentencia.append(" ");
        }
        
        DateFormat format = new SimpleDateFormat("dd-MM-yyyy");
        Date dateDesde=null;
        Date dateHasta=null;
        try {
            dateDesde = format.parse(desde);
            
        } catch (ParseException ex) {
            Logger.getLogger(ServletListadoTickets.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        try {
            dateHasta = format.parse(hasta);
        } catch (ParseException ex) {
            Logger.getLogger(ServletListadoTickets.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        if (dateDesde!=null )
        {
            // Desde una fecha
            SQLSentencia.append("and fecha_riego >=date('");
            SQLSentencia.append(desde);
            SQLSentencia.append("') ");
        }
        
        if (dateHasta!=null)
        {
            // Hasta una fecha
            SQLSentencia.append("and fecha_riego <=date('");
            SQLSentencia.append(hasta);
            SQLSentencia.append("') ");
        }
        
        SQLSentencia.append("order by id");
        
        //System.out.println(SQLSentencia.toString());
        
        int size=0;
        
        try (Connection conn = PGconectar()) {
            try (PreparedStatement st = conn.prepareStatement(SQLSentencia.toString())) {
                try (ResultSet rs = st.executeQuery()) {

                    while (rs.next()) {
                        size = 1;
                        return size;
                    }
                }
            }
        }
        
        
        return size;
    }
    
}
