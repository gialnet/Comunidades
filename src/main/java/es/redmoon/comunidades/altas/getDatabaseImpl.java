
package es.redmoon.comunidades.altas;

import static es.redmoon.comunidades.altas.PoolConnAltas.PGconectar;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author antonio
 */
public class getDatabaseImpl implements IgetDatabase {

    private String ip;
    private String databasename;
    
    @Override
    public boolean getDatabaseForLogin(String xUser, String xPass) throws SQLException {
        try (Connection conn = PGconectar();
               PreparedStatement st
                    = conn.prepareStatement("SELECT ip,databasename from customers_users where mail=? and passwd=?") ) {

                st.setString(1, xUser.trim());
                st.setString(2, xPass.trim());

                try (ResultSet rs = st.executeQuery()) {

                    if (rs.next()) {

                        this.ip = rs.getString("ip");
                        this.databasename = rs.getString("databasename");

                    } else {
                        //System.err.println("Error en login usuario sql session:"+xUser);
                        System.out.println("Usuario o contraseña invalidos");
                        return false;
                    }
            }
        } catch (SQLException e) {
            System.out.println("customers_users Connection Failed!" + e.getMessage());
            return false;
        }

        return true;
    }

    @Override
    public void LogSesion(String IP, String HostName, String URI, String mail) throws SQLException {
        try (Connection conn = PGconectar();
                PreparedStatement st = conn.prepareStatement("INSERT INTO LogSesion (IP,HOSTNAME,URI, mail) VALUES (?,?,?,?)")) {

                st.setString(1, IP.trim());
                st.setString(2, HostName.trim());
                st.setString(3, URI.trim());
                st.setString(4, mail.trim());

                st.execute();

        } catch (SQLException e) {
            System.out.println("LogSesion Connection Failed!" + e.getMessage());
        }
    }
    
    @Override
    public String getIp() {
        return ip.trim();
    }

    @Override
    public String getDatabasename() {
        return databasename.trim();
    }

    
    
}
