
package es.redmoon.comunidades.regador;

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
public class SQLRegador extends PoolConn {
    private final String version;

    /**
     * Constructor de la clase de compañías
     * @param myPool
     * @throws SQLException
     * @throws NamingException 
     */
    public SQLRegador(String myPool) throws SQLException, NamingException {
        super(myPool);
        this.version = myPool;
    }
    
    
    /**
     * Crea una lista de riegos pendientes
     * @return
     * @throws SQLException 
     */
    public List<TuplasVw_pendiente_riego> getListaRiegosPendientes(int NumPage, int SizePage) throws SQLException {
        
        List<TuplasVw_pendiente_riego> tp = new ArrayList<>();

        try (Connection conn = PGconectar()) {

            int Offset = SizePage * (NumPage - 1);
            try (PreparedStatement st = conn.prepareStatement("SELECT * from vw_pendiente_riego order by estanque,id LIMIT ? OFFSET ?")) {
                st.setInt(1, SizePage);
                st.setInt(2, Offset);

                try (ResultSet rs = st.executeQuery()) {

                    while (rs.next()) {

                        tp.add(new TuplasVw_pendiente_riego.Builder().
                                Id(rs.getString("id")).
                                Estanque(rs.getString("estanque")).
                                Canal_compra(rs.getString("canal_compra")).
                                Tipo(rs.getString("tipo")).
                                Minutos_saldo(rs.getString("minutos_saldo")).
                                Nombre(rs.getString("nombre")).
                                Anejo(rs.getString("anejo")).
                                Ordenriego(rs.getString("ordenriego")).
                                build()
                        );
                    }
                }
            }

        } catch (SQLException e) {

            System.out.println("vw_pendiente_riego Connection Failed!" + e.getMessage());

        }

        return tp;
    }
    
    /**
     * 
     * @return
     * @throws SQLException 
     */
    public List<TuplasVw_pendiente_riego> getRiegosPendientesByPool() throws SQLException {
        
        
        List<TuplasVw_pendiente_riego> tp = new ArrayList<>();

        try (Connection conn = PGconectar()) {

            try (PreparedStatement st = conn.prepareStatement("SELECT * from ft_pendiente_riego()")) {

                try (ResultSet rs = st.executeQuery()) {

                    while (rs.next()) {

                        tp.add(new TuplasVw_pendiente_riego.Builder().
                                Id("1").
                                Estanque(rs.getString("tfestanque")).
                                Tipo(rs.getString("tftipo")).
                                Minutos_saldo(rs.getString("tfminutos_saldo")).
                                Nombre(rs.getString("tfnombre")).
                                build()
                        );
                    }
                }
            }

        } catch (SQLException e) {

            System.out.println("ft_pendiente_riego() Connection Failed!" + e.getMessage());

        }

        return tp;
    }
        
}