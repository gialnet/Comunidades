
package es.redmoon.comunidades.datosper;

import es.redmoon.comunidades.session.PoolConn;
import static es.redmoon.comunidades.session.PoolConn.PGconectar;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import javax.naming.NamingException;
import org.apache.commons.lang3.StringUtils;

/**
 *
 * @author antonio
 */
public class SQLDatosPer extends PoolConn  {

    private final String version;
    private String Nif;
    private String Nombre;
    private String Direccion;
    private String Objeto;
    private String Poblacion;
    private String Pais_ISO3166;
    private String Moneda;
    private String Movil;
    private String fax;
    private String Mail;
    private String url_web;
    private String url_tsa;
    private String fecha_constitucion;
    private String forma_juridica;
    private String Sociedades;
    private String Fecha;
    private String CNAE;
    private String IBAN;
    private String BIC;
    private int tipo_de_cuenta; // 1 free, 2 premiun, 3 enterprise, 4 advisor
    private String EntidadPresenta; //     varchar(4), -- para las domiciliaciones
    private String OficinaPresenta; //     varchar(4), -- para las domiciliaciones
    private String Sufijo; //             varchar(3), -- para las domiciliaciones
    private int periodicidad_er;
    private String EmiteRemesas;
    private String Presupuestos;
    private Locale myLocale=Locale.GERMANY;
    
    public String getNif() {
        return Nif;
    }

    public String getNombre() {
        return Nombre;
    }

    public String getDireccion() {
        return Direccion;
    }

    public String getObjeto() {
        return Objeto;
    }

    public String getPoblacion() {
        return Poblacion;
    }

    public String getPais_ISO3166() {
        return Pais_ISO3166;
    }

    public String getMoneda() {
        return Moneda;
    }

    public String getMovil() {
        return Movil;
    }

    public String getMail() {
        return Mail;
    }

    public String getForma_juridica() {
        return forma_juridica;
    }

    public String getSociedades() {
        return Sociedades;
    }

    public String getFecha() {
        return Fecha;
    }

    public String getCNAE() {
        return CNAE;
    }

    public int getTipo_de_cuenta() {
        return tipo_de_cuenta;
    }

    public String getUrl_web() {
        return url_web;
    }

    public String getUrl_tsa() {
        return url_tsa;
    }

    public String getFax() {
        return fax;
    }

    public String getIBAN() {
        return IBAN;
    }

    public String getBIC() {
        return BIC;
    }

    public String getFecha_constitucion() {
        return fecha_constitucion;
    }

    public String getEntidadPresenta() {
        return EntidadPresenta;
    }

    public String getOficinaPresenta() {
        return OficinaPresenta;
    }

    public String getSufijo() {
        return Sufijo;
    }

    public int getPeriodicidad_er() {
        return periodicidad_er;
    }

    public String getEmiteRemesas() {
        return EmiteRemesas;
    }

    public String getPresupuestos() {
        return Presupuestos;
    }

    public Locale getMyLocale() {
        return myLocale;
    }
    
    
    /**
     * 
     * @throws SQLException 
     */
    public SQLDatosPer(String DataBase) throws SQLException, NamingException
    {
        super(DataBase);
        this.version=DataBase;
        
        Connection conn = PGconectar();
        
        try {
            
            PreparedStatement st = conn.prepareStatement("SELECT * from datosper where id=1");
            
            ResultSet rs = st.executeQuery();

                if (rs.next()) {
                    
                    
                    this.Nif= (StringUtils.isEmpty(rs.getString("nif"))) ? "": rs.getString("nif").trim();
                    
                    this.Nombre=(StringUtils.isEmpty(rs.getString("nombre"))) ? "": rs.getString("nombre");
                    
                    this.Direccion=(StringUtils.isEmpty(rs.getString("direccion"))) ? "": rs.getString("direccion");
                    this.Objeto=(StringUtils.isEmpty(rs.getString("objeto"))) ? "": rs.getString("objeto");
                    this.Poblacion=(StringUtils.isEmpty(rs.getString("poblacion"))) ? "": rs.getString("poblacion");
                    
                    // país en formato ISO
                    this.Pais_ISO3166=(StringUtils.isEmpty(rs.getString("pais_iso3166"))) ? "": rs.getString("pais_iso3166");
                    
                    // derivar la moneda en función del país
                    SetupLocale(Pais_ISO3166);
                    
                    this.Movil=(StringUtils.isEmpty(rs.getString("movil"))) ? "": rs.getString("movil");
                    this.Mail=(StringUtils.isEmpty(rs.getString("mail"))) ? "": rs.getString("mail");
                    
                    this.forma_juridica=(StringUtils.isEmpty(rs.getString("forma_juridica"))) ? "": rs.getString("forma_juridica");
                    
                    this.CNAE=(StringUtils.isEmpty(rs.getString("cnae"))) ? "": rs.getString("cnae");
                                        
                    this.IBAN=(StringUtils.isEmpty(rs.getString("iban"))) ? "": rs.getString("iban");
                    
                    this.BIC=(StringUtils.isEmpty(rs.getString("bic"))) ? "": rs.getString("bic");
                    
                    this.tipo_de_cuenta=rs.getInt("tipo_de_cuenta");
                    
                    this.url_web=(StringUtils.isEmpty(rs.getString("url_web"))) ? "": rs.getString("url_web");
                    this.url_tsa=(StringUtils.isEmpty(rs.getString("url_tsa"))) ? "": rs.getString("url_tsa");
                    
                    this.fax=(StringUtils.isEmpty(rs.getString("fax"))) ? "": rs.getString("fax");
                    this.fecha_constitucion=(StringUtils.isEmpty(rs.getString("fecha_constitucion"))) ? "": rs.getString("fecha_constitucion");
                    this.EntidadPresenta=(StringUtils.isEmpty(rs.getString("entidadpresenta"))) ? "": rs.getString("entidadpresenta");
                    this.OficinaPresenta=(StringUtils.isEmpty(rs.getString("oficinapresenta"))) ? "": rs.getString("oficinapresenta");
                    this.Sufijo=(StringUtils.isEmpty(rs.getString("sufijo"))) ? "": rs.getString("sufijo");
                    this.EmiteRemesas=(StringUtils.isEmpty(rs.getString("emiteremesas"))) ? "": rs.getString("emiteremesas");
                    
                    this.periodicidad_er=rs.getInt("periodicidad_er");

                }
                   
           DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
           this.Fecha = df.format(new Date());
           
           df=null;
           rs.close();
        }
        catch (SQLException e) {
            System.out.println("SELECT * from datosper where id=1 Connection Failed!");
        }
        finally{
            conn.close();
        }
    }

    private void SetupLocale(String Pais_ISO3166)
    {
        // Alemania,Austria,Bélgica,Chipre,Eslovaquia,Eslovenia,Estonia,España,
        // Finlandia,Francia,Grecia,Irlanda,Italia,Letonia,Luxemburgo,Malta,
        // Países Bajos,Portugal
        switch (Pais_ISO3166) {
            case "DE":  // PAISES UNION EUROPEA CON MONEDA EURO
                {
                    myLocale=Locale.GERMANY;
                    break;
                }
            case "AU":
                {
                    myLocale=Locale.GERMANY;
                    break;
                }
            case "BE": 
                {
                    myLocale = Locale.GERMANY;
                    break;
                }
            case "CY":
                {
                    myLocale=Locale.GERMANY;
                    break;
                }
            case "SK":
                {
                    myLocale=Locale.GERMANY;
                    break;
                }
            case "SI": 
                {
                    myLocale = Locale.GERMANY;
                    break;
                }
            case "EE":
                {
                    myLocale=Locale.GERMANY;
                    break;
                }
            case "ES":
                {
                    myLocale=Locale.GERMANY;
                    break;
                }
            case "FI": 
                {
                    myLocale = Locale.GERMANY;
                    break;
                }
            case "FR":
                {
                    myLocale=Locale.GERMANY;
                    break;
                }
            case "GR":
                {
                    myLocale=Locale.GERMANY;
                    break;
                }
            case "IE": 
                {
                    myLocale = Locale.GERMANY;
                    break;
                }
            case "IT":
                {
                    myLocale=Locale.GERMANY;
                    break;
                }
            case "LV":
                {
                    myLocale=Locale.GERMANY;
                    break;
                }
            case "LU": 
                {
                    myLocale = Locale.GERMANY;
                    break;
                }
            case "MT":
                {
                    myLocale=Locale.GERMANY;
                    break;
                }
            case "NL":
                {
                    myLocale=Locale.GERMANY;
                    break;
                }
            case "PT": 
                {
                    myLocale = Locale.GERMANY;
                    break;
                }
            // PAISES UNION EUROPEA CON MONEDA PROPIA
            // Bulgaria, República Checa, Dinamarca, Croacia, Lituania, Hungría, Polonia, Rumanía, Suecia y Reino Unido
            case "BG": 
                {
                    myLocale = new Locale("bg", "BG");
                    break;
                }
            case "CZ":
                {
                    myLocale=new Locale("cz", "CZ");
                    break;
                }
            case "DK":
                {
                    myLocale=new Locale("dk", "DK");
                    break;
                }
            case "HR": 
                {
                    myLocale = new Locale("hr", "HR");
                    break;
                }
            case "LT":
                {
                    myLocale=new Locale("lt", "LT");
                    break;
                }
            case "HU":
                {
                    myLocale= new Locale("hu", "HU");
                    break;
                }
            case "PL": 
                {
                    myLocale = new Locale("pl", "PL");
                    break;
                }
            case "RO":
                {
                    myLocale= new Locale("ro", "RO");
                    break;
                }
            case "SE":
                {
                    myLocale= new Locale("se", "SE");
                    break;
                }
            case "GB": 
                {
                    myLocale = Locale.UK;
                    break;
                }    
            default:
                myLocale=Locale.GERMANY;
                break;
        }
    }
    /**
     * 
     * @throws SQLException 
     */
    public List<Tuplasdatosper_legal> ListaFormaJuridica() throws SQLException
    {
       
        Connection conn = PGconectar();
        
        List<Tuplasdatosper_legal> tf = new ArrayList<>();
        
        try {
            
            PreparedStatement st = conn.prepareStatement("SELECT * from datosper_legal order by id");
                //st.setInt(1, id);
            
            ResultSet rs = st.executeQuery();

                while (rs.next()) {

                    tf.add(new Tuplasdatosper_legal.Builder().
                            Id(rs.getInt("id")).
                            Forma_juridica(rs.getString("forma_juridica ")).
                            build());
                    
                }
        }
        catch (SQLException e) {
            System.out.println("SELECT * from datosper_legal Connection Failed!");
        }
        finally{
            conn.close();
        }
        
        return tf;
    }
    
    /**
     * 
     * @param xUser
     * @throws SQLException 
     */
    public byte[] getToken(String xUser) throws SQLException
    {
        Connection conn = PGconectar();
        byte[] myCertificado=null;
        
        try {

            PreparedStatement st = conn.prepareStatement("SELECT email,nif,nombre,tipo,certificado from user_app where email=?");
            st.setString(1, xUser.trim());
            
            ResultSet rs = st.executeQuery();

                if (rs.next()) {
                    
                    myCertificado=rs.getBytes("certificado");
                                        
                }
           
           rs.close();
        }
        catch (SQLException e) {
            System.out.println("SELECT * from user_app Connection Failed!.getToken");
            conn.close();
        }
        finally{
            conn.close();
        }
        
        return myCertificado;
    }
    
    
    /**
     * Actualizar los datos de la empresa
     * @param xIBAN
     * @param xBIC
     * @param nif
     * @param nombre
     * @param direccion
     * @param objeto
     * @param poblacion
     * @param movil
     * @param xFax
     * @param mail
     * @param xURL
     * @return
     * @throws SQLException 
     */
    public String UpdateRazon(String xIBAN,String xBIC, String nif, String nombre, 
            String direccion, String objeto, String poblacion, String movil, 
            String xFax, String mail, String xURL) throws SQLException
    {
        Connection conn = PGconectar();
        String Resultado=null;

        try {

                                                                             //1 2 3 4 5 6 7 8 9 0 1
            CallableStatement st = conn.prepareCall("{ ? = call UpdateDatosPer(?,?,?,?,?,?,?,?,?,?,?) }");
            st.registerOutParameter(1,Types.VARCHAR);
            st.setString(2, xIBAN);
            st.setString(3, xBIC);
            st.setString(4, nif);
            st.setString(5, nombre);
            st.setString(6, direccion);
            st.setString(7, objeto);
            st.setString(8, poblacion);
            st.setString(9, movil);
            st.setString(10, xFax);
            st.setString(11, mail);
            st.setString(12, xURL);
            
            st.execute();
            Resultado=st.getString(1);
            
            st.close();

        } catch (SQLException e) {

            System.out.println("Error call UpdateDatosPer Connection Failed!");


        } finally {

            conn.close();
        }
        
        return Resultado;
    }
    
    
    
    /**
     * 
     * @param entidad
     * @param oficina
     * @param sufijo
     * @param NumeroRecibos
     * @throws SQLException 
     */
    public void DatosSEPA(String entidad, String oficina, String sufijo, 
            String NumeroRecibos, boolean EmiteRemesa) throws SQLException
    {

        String xEmiteRemesa=null;
        
        if (EmiteRemesa)
            xEmiteRemesa="SI";
        else
            xEmiteRemesa="NO";
        
        try (Connection conn = PGconectar(); CallableStatement st = conn.prepareCall("{ call datospersepa (?,?,?,?,?) }")) {
            st.setString(1, entidad);
            st.setString(2, oficina);
            st.setString(3, sufijo);
            st.setString(4, NumeroRecibos);
            st.setString(5, xEmiteRemesa);
            
            st.execute();
            
            st.close();
            conn.close();

        } catch (SQLException e) {

            System.out.println("DatosPerSEPA Connection Failed!");


        }
    }
    
    
}
