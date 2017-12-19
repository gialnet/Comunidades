
package es.redmoon.comunidades.sesion;

import es.redmoon.comunidades.datosapp.SQLDatosPer;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Locale;
import javax.naming.NamingException;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 * Soporte para crear el objeto de sesión
 * @author antonio
 */
public class SQLSesion extends PoolConn {
    
    private final String version;
    private String xIDUser;
    private String xUser;
    private String NIF;
    private String RazonSocial;
    private String NIFUser;
    private String NombreUsuario;
    private String UserTipo;
    private String FormaJuridica;
    private String Database;
    private String NumeroMaxUsuarios;
    private String Fecha;
    private byte[] myCertificado;
    private int tipo_de_cuenta;
    
    private String permisos;
    private Locale myLocale;
    
    // Servicios disponibles
    
    private String Firma="no";
    private String Burofax="no";
    private String Almacenamiento="no";
    private String Indexacion="no";
    private String myHD="yes";
    private String LimiteUsuarios="1";
    
    //Terceros
    private int xIDTercero;
    private String xMailTercero;

    public SQLSesion(String DataBase) throws SQLException, NamingException {
        
        super(DataBase);
        this.version=DataBase;
    }

    
    /**
     * Se entra en función del código de estanque o mediante staff para el
     * regador
     * @param xUser
     * @return
     * @throws SQLException
     * @throws NamingException 
     */
    public boolean GetDataSessionUser(String xUser) throws SQLException, NamingException
    {
        
        if (xUser.equalsIgnoreCase("staff"))
        {
            this.xIDUser = "00";
            this.xUser= "regador";
            this.NIFUser= "00";
            this.NombreUsuario= "00";
            SetSessionVar();
            return true;
        }
        
        try (Connection conn = PGconectar()) {
            //System.err.println("Error en login usuario:"+xUser);
            
            try (PreparedStatement st = conn.prepareStatement("SELECT * from vw_propiedades where codigo=?"))
            {
            st.setString(1, xUser.trim());
            //st.setString(2, xPass);
            
            try (ResultSet rs = st.executeQuery())
            {

                if (rs.next()) {
                    this.xIDUser = rs.getString("codigo");
                    this.xUser=rs.getString("comunero");
                    this.NIFUser=rs.getString("nif");
                    this.NombreUsuario=rs.getString("nombre");
                    //this.UserTipo=rs.getString("tipo");
                    //this.myCertificado=rs.getBytes("certificado");
                    //this.permisos=(StringUtils.isEmpty(rs.getString("permisos"))) ? "{\"panel\":\"yes\",\"clientes\":\"yes\",\"ventas\":\"yes\",\"proveedores\":\"yes\"}": rs.getString("permisos");
                    
                    // Parte de las variables de sesión de la tabla DatosPer
                    SetSessionVar();
                }
                else
                {
                    //System.err.println("Error en login usuario sql session:"+xUser);
                    AccionesErrorLogin();
                    return false;
                }
            }
        
            }
           
        }
        catch (SQLException e) {
            System.out.println("SELECT from comuneros Connection Failed!.CheckLogin" + e.getMessage());
            return false;
        }
        
        return true;
    }
    
    /**
     * Log de sesión de terceros (sesión de clientes de nuestros clientes)
     * @param IP
     * @param HostName
     * @param URI
     * @param mail
     * @throws SQLException 
     */
     public void LogSesionTerceros(String IP, String HostName, String URI, String mail) throws SQLException
    {
        
        try (Connection conn = PGconectar()) {

            try (PreparedStatement st
                    = conn.prepareStatement("INSERT INTO LogSesionTerceros (IP,HOSTNAME,URI, mail) VALUES (?,?,?,?)")) 
            {
                st.setString(1, IP.trim());
                st.setString(2, HostName.trim());
                st.setString(3, URI.trim());
                st.setString(4, mail.trim());

                st.execute();

            }
        } catch (SQLException e) {
            System.out.println("LogSesionTerceros Connection Failed!" + e.getMessage());
        }
        
    }
     
     /**
      * Comprobar que el tercero es un cliente de clientes
      * @param xUser
      * @return
      * @throws SQLException
      * @throws NamingException 
      */
   public int CheckMailGoogleTerceros(String xUser) 
            throws SQLException, NamingException
    {
        
        try (Connection conn = PGconectar()) {

            try (PreparedStatement st
                    = conn.prepareStatement("SELECT id,mail from customers where mail=?")) {

                st.setString(1, xUser.trim());

                try (ResultSet rs = st.executeQuery()) {

                    if (rs.next()) {

                        this.xIDTercero = rs.getInt("id");
                        this.xMailTercero = rs.getString("mail");

                    } else {
                        //System.err.println("Error en login usuario sql session:"+xUser);
                        return -1;
                    }
                }
            }

        } catch (SQLException e) {
            System.out.println("customers Connection Failed!" + e.getMessage());

            return -1;
        }
     
        
        return this.xIDTercero;
    }
    
    /**
     * Refrescar los valores de sesión después de un cambio de datos en la tabla
     * DatosPer, cambiando el NIF y por lo tanto la forma jurídica.
     * 
     * @param xUser
     * @return
     * @throws SQLException
     * @throws NamingException 
     */
    public boolean RefreshSesionVars(String xUser) throws SQLException, NamingException
    {
                
        try (Connection conn = PGconectar()) {

            try (PreparedStatement st
                    = conn.prepareStatement("SELECT email,nif,nombre,tipo,certificado from user_app where email=?")) {
                
                st.setString(1, xUser.trim());

                try (ResultSet rs = st.executeQuery()) {

                    if (rs.next()) {

                        this.NIFUser = rs.getString("nif");
                        this.NombreUsuario = rs.getString("nombre");
                        this.UserTipo = rs.getString("tipo");
                        this.myCertificado = rs.getBytes("certificado");

                        // Parte de las variables de sesión de la tabla DatosPer
                        SetSessionVar();
                    }

                }
            }
        } catch (SQLException e) {
            System.out.println("SELECT * from user_app Connection Failed!. RefreshSesionVars" + e.getMessage());
            return false;
        }
        
        return true;
    }
    
    /**
     * Establece las variables de sesión de la aplicación de facturación
     * @throws SQLException
     * @throws NamingException 
     */
    private void SetSessionVar() throws SQLException, NamingException
    {
        // Establecer las variables de sesión
        // Lee los datos desde DatosPer
        SQLDatosPer mySQLDatosPer = new SQLDatosPer(version);
        
        this.NIF = mySQLDatosPer.getNif();
        this.RazonSocial=mySQLDatosPer.getNombre();
        this.FormaJuridica=mySQLDatosPer.getForma_juridica();
        
        this.myLocale=mySQLDatosPer.getMyLocale();
        
        // con este datos nos vamos a la tabla PoliticaCuentas        
        this.tipo_de_cuenta=mySQLDatosPer.getTipo_de_cuenta();
        
            
        // y leemos la variable JSON servicios autorizados 
        //getServicios();
        
        // this.Database=null; de la parte de criptografía
        // this.NumeroMaxUsuarios=null; de la parte de criptografía
        
        //this.Fecha=mySQLDatosPer.getFecha();
        
        mySQLDatosPer = null;
    }
    
    private void AccionesErrorLogin()
    {
        // Realizar acciones despues de un fallo de login
    }
    
    /**
     * Leer la lista de servicios autorizados para el cliente
     * @param xIDUser
     * @throws SQLException 
     */
    private void getServicios() throws SQLException
    {
        
        String servicios;

        try (Connection conn = PGconectar()) {

            try (PreparedStatement st = conn.prepareStatement("SELECT * from PoliticaCuentas where id=?")) {

                st.setInt(1, this.tipo_de_cuenta);

                try (ResultSet rs = st.executeQuery()) {

                    if (rs.next()) {

                        servicios = rs.getString("servicios");

                        JSONObject jsonObject = null;

                        try {
                            jsonObject = (JSONObject) new JSONParser().parse(servicios);
                        } catch (ParseException e) {
                            throw new RuntimeException("Unable to parse json " + servicios + e.getMessage());
                        }

                        /*
                     * '{   "Firma": "yes",
                            "Burofax":  "yes",
                            "Almacenamiento": "no",
                            "Indexacion":  "no",
                            "LimiteUsuarios": "1"
                        }'::json
                         */
                        Firma = (String) jsonObject.get("Firma");
                        Burofax = (String) jsonObject.get("Burofax");
                        Almacenamiento = (String) jsonObject.get("Almacenamiento");
                        Indexacion = (String) jsonObject.get("Indexacion");
                        myHD = (String) jsonObject.get("myHD");
                        LimiteUsuarios = (String) jsonObject.get("LimiteUsuarios");

                    }

                }

            }

        } catch (SQLException e) {
            System.out.println("SELECT * from PoliticaCuentas Connection Failed!" + e.getMessage());
        }
        
    }
    
    
    /**
     * Pendiente de implementar para futuras versiones
     */
    private void MapaOpciones()
    {
        HashMap hMap = new HashMap();
        
        hMap.put("BrowseBancosMovimientos.jsp", "yes");
        
        boolean blnExists = hMap.containsKey("BrowseBancosMovimientos.jsp");
        
    }

    // **************************************************************
    // *********************** getters ******************************
    // **************************************************************
    
    public String getxIDUser() {
        return xIDUser;
    }
    
    public String getxUser() {
        return xUser;
    }

    public String getNIF() {
        return NIF;
    }

    public String getRazonSocial() {
        return RazonSocial;
    }

    public String getFormaJuridica() {
        return FormaJuridica;
    }

    public String getDatabase() {
        return Database;
    }

    public String getNumeroMaxUsuarios() {
        return NumeroMaxUsuarios;
    }

    public String getFecha() {
        return Fecha;
    }

    public String getNIFUser() {
        return NIFUser;
    }

    public String getNombreUsuario() {
        return NombreUsuario;
    }

    public String getUserTipo() {
        return UserTipo;
    }

    public String getBurofax() {
        return Burofax;
    }

    public String getFirma() {
        return Firma;
    }

    public String getAlmacenamiento() {
        return Almacenamiento;
    }

    public String getIndexacion() {
        return Indexacion;
    }

    public byte[] getMyCertificado() {
        return myCertificado;
    }

    public int getTipo_de_cuenta() {
        return tipo_de_cuenta;
    }

    public String getLimiteUsuarios() {
        return LimiteUsuarios;
    }

    public String getMyHD() {
        return myHD;
    }

    public int getxIDTercero() {
        return xIDTercero;
    }

    public String getxMailTercero() {
        return xMailTercero;
    }

    public String getPermisos() {
        return permisos;
    }

    public Locale getMyLocale() {
        return myLocale;
    }

    
    
    
}
