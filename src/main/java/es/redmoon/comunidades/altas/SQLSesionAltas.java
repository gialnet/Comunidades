
package es.redmoon.comunidades.altas;

import static es.redmoon.comunidades.altas.PoolConnAltas.PGconectar;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.Security;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.naming.NamingException;
import org.apache.commons.codec.binary.Hex;
import org.bouncycastle.jce.provider.BouncyCastleProvider;


/**
 *
 * @author antonio
 */
public class SQLSesionAltas extends PoolConnAltas {
    
    
    private String xMail;
    private String ip;
    private String databasename;
    private String passdatabase;
    private String descargo_token;
    private String mode_access;
    private String CADataBaseName; // nombre de la base de datos campo AutoridadCA
    private byte[] certificado;
    
    

    public SQLSesionAltas() throws SQLException, NamingException {
        super();
    }

    /**
     * Control del modo de acceso
     * En la tabla AutoridadCA guardamos un campo denominado mode_access que puede tomar
     * dos valores single para configuraciones de un una sola base de datos
     * shared para un servidor de múltiples bases de datos
     * @throws SQLException 
     */
    public void ModeAccess() throws SQLException
    {
        
        try (Connection conn = PGconectar()) {

            try (PreparedStatement st = conn.prepareStatement("select mode_access,databasename from AutoridadCA where id=1")) {

                try (ResultSet rs = st.executeQuery()) {
                    if (rs.next()) {
                        this.mode_access = rs.getString("mode_access");
                        this.CADataBaseName = rs.getString("databasename");
                    }
                }
            }
        } catch (SQLException e) {
            System.out.println("AutoridadCA Connection Failed!" + e.getMessage());
        }

    }
    
    /**
     * Comprobar el acceso del usuario a través de la tabla de usuarios
     * @param xUser
     * @param xPass
     * @param token
     * @return
     * @throws SQLException
     * @throws NamingException 
     * @throws java.security.NoSuchAlgorithmException 
     * @throws java.security.NoSuchProviderException 
     */
    public boolean CheckLogin(String xUser, String xPass, byte[] token) 
            throws SQLException, NamingException, NoSuchAlgorithmException, NoSuchProviderException
    {
        
        Security.addProvider(new BouncyCastleProvider());

        MessageDigest mda = MessageDigest.getInstance("SHA-512", "BC");
        byte[] digesta = mda.digest(token);

        //System.out.println(digesta);
        char[] sha512 = Hex.encodeHex(digesta);
        //System.out.println(Hex.encodeHex(digesta));

        try (Connection conn = PGconectar()) {

            try (PreparedStatement st
                    = conn.prepareStatement("SELECT ip,databasename from customers_users where mail=?")) {
                st.setString(1, xUser.trim());

                try (ResultSet rs = st.executeQuery()) {

                    if (rs.next()) {

                        this.xMail = xUser;
                        this.ip = rs.getString("ip");
                        this.databasename = rs.getString("databasename");

                    } else {
                        //System.err.println("Error en login usuario sql session:"+xUser);
                        AccionesErrorLogin();
                        return false;
                    }

                }
            }
        } catch (SQLException e) {
            System.out.println("customers_users Connection Failed!" + e.getMessage());
            return false;
        }

        return true;
    }
    
    
    
    /**
     * Login con solo la dirección de correo electrónico identidad federada
     * con Google+, para el alta en el servicio
     * @param xUser
     * @return
     * @throws SQLException
     * @throws NamingException 
     */
    public boolean CheckMailExist(String xUser) 
            throws SQLException, NamingException
    {
             
        try (Connection conn = PGconectar()) {

            // conectando con jdbc/myPNSystemConfig
            PreparedStatement st
                    = conn.prepareStatement("SELECT ip,databasename from customers_users where mail=?");
            st.setString(1, xUser.trim());

            try (ResultSet rs = st.executeQuery()) {

                if (rs.next()) {

                    this.xMail = xUser;
                    this.ip = rs.getString("ip");
                    this.databasename = rs.getString("databasename");
                    rs.close();
                    conn.close();

                } else {
                    //System.err.println("Error en login usuario sql session:"+xUser);
                    conn.close();
                    return false;
                }
            }
        } catch (SQLException e) {
            System.out.println("customers_users Connection Failed!" + e.getMessage());
            return false;
        }

        return true;
    }
    
    /**
     * 
     */
    private void AccionesErrorLogin()
    {
        // Realizar acciones despues de un fallo de login
    }

    public String getxMail() {
        return xMail.trim();
    }

    public String getIp() {
        return ip.trim();
    }

    public String getDatabasename() {
        return databasename.trim();
    }

    public String getPassdatabase() {
        return passdatabase;
    }

    public String getDescargo_token() {
        return descargo_token;
    }

    public byte[] getCertificado() {
        return certificado;
    }

    public String getMode_access() {
        return mode_access;
    }

    public String getCADataBaseName() {
        return CADataBaseName;
    }
    
    
    /**
     * Guardar los datos de acceso en la tabla LogSesion
     * @param IP
     * @param HostName
     * @param URI
     * @param mail
     * @throws SQLException 
     */
    public void LogSesion(String IP, String HostName, String URI, String mail) throws SQLException
    {       
        
        try (Connection conn = PGconectar()) {

            try (PreparedStatement st = conn.prepareStatement("INSERT INTO LogSesion (IP,HOSTNAME,URI, mail) VALUES (?,?,?,?)")) {
                st.setString(1, IP.trim());
                st.setString(2, HostName.trim());
                st.setString(3, URI.trim());
                st.setString(4, mail.trim());

                st.execute();

            }
        } catch (SQLException e) {
            System.out.println("LogSesion Connection Failed!" + e.getMessage());
        }
        
        
    }

    /**
     * Login a través de usuario y contraseña
     * @param xUser
     * @param xPass
     * @return 
     * @throws java.sql.SQLException 
     */
    public boolean CheckLogin(String xUser, String xPass) throws SQLException {
        
        
        try (Connection conn = PGconectar()) {

            try (PreparedStatement st
                    = conn.prepareStatement("SELECT ip,databasename from customers_users where mail=? and passwd=?")) {

                st.setString(1, xUser.trim());
                st.setString(2, xPass.trim());

                try (ResultSet rs = st.executeQuery()) {

                    if (rs.next()) {

                        this.xMail = xUser;
                        this.ip = rs.getString("ip");
                        this.databasename = rs.getString("databasename");

                    } else {
                        //System.err.println("Error en login usuario sql session:"+xUser);
                        AccionesErrorLogin();
                        return false;
                    }

                }
            }
        } catch (SQLException e) {
            System.out.println("customers_users Connection Failed!" + e.getMessage());
            return false;
        }

        return true;
    }
    
    
}