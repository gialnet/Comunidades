
package es.redmoon.comunidades.datosapp;

import static es.redmoon.comunidades.sesion.PoolConn.PGconectar;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.naming.NamingException;
import org.apache.commons.lang3.StringUtils;

/**
 *
 * @author antonio
 */
public class DatosPerImpl implements IDatosPer {

    private String Nif;
    private String Nombre;
    private String Direccion;
    private String Objeto;
    private String Poblacion;
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
    private String EntidadPresenta; //     varchar(4), -- para las domiciliaciones
    private String OficinaPresenta; //     varchar(4), -- para las domiciliaciones
    private String Sufijo; //             varchar(3), -- para las domiciliaciones
    private int periodicidad_er;
    private String EmiteRemesas;
    private String Presupuestos;
    
    @Override
    public void ReadDatosPer() throws SQLException, NamingException {

        try (Connection conn = PGconectar();
                PreparedStatement st = conn.prepareStatement("SELECT * from datosper where id=1");
                ResultSet rs = st.executeQuery()) {

                    if (rs.next()) {

                        this.Nif = (StringUtils.isEmpty(rs.getString("nif"))) ? "" : rs.getString("nif").trim();

                        this.Nombre = (StringUtils.isEmpty(rs.getString("nombre"))) ? "" : rs.getString("nombre");

                        this.Direccion = (StringUtils.isEmpty(rs.getString("direccion"))) ? "" : rs.getString("direccion");
                        this.Objeto = (StringUtils.isEmpty(rs.getString("objeto"))) ? "" : rs.getString("objeto");
                        this.Poblacion = (StringUtils.isEmpty(rs.getString("poblacion"))) ? "" : rs.getString("poblacion");

                        this.Movil = (StringUtils.isEmpty(rs.getString("movil"))) ? "" : rs.getString("movil");
                        this.Mail = (StringUtils.isEmpty(rs.getString("mail"))) ? "" : rs.getString("mail");

                        this.forma_juridica = (StringUtils.isEmpty(rs.getString("forma_juridica"))) ? "" : rs.getString("forma_juridica");

                        this.CNAE = (StringUtils.isEmpty(rs.getString("cnae"))) ? "" : rs.getString("cnae");

                        this.IBAN = (StringUtils.isEmpty(rs.getString("iban"))) ? "" : rs.getString("iban");

                        this.BIC = (StringUtils.isEmpty(rs.getString("bic"))) ? "" : rs.getString("bic");

                        this.url_web = (StringUtils.isEmpty(rs.getString("url_web"))) ? "" : rs.getString("url_web");
                        this.url_tsa = (StringUtils.isEmpty(rs.getString("url_tsa"))) ? "" : rs.getString("url_tsa");

                        this.fax = (StringUtils.isEmpty(rs.getString("fax"))) ? "" : rs.getString("fax");
                        this.fecha_constitucion = (StringUtils.isEmpty(rs.getString("fecha_constitucion"))) ? "" : rs.getString("fecha_constitucion");
                        this.EntidadPresenta = (StringUtils.isEmpty(rs.getString("entidadpresenta"))) ? "" : rs.getString("entidadpresenta");
                        this.OficinaPresenta = (StringUtils.isEmpty(rs.getString("oficinapresenta"))) ? "" : rs.getString("oficinapresenta");
                        this.Sufijo = (StringUtils.isEmpty(rs.getString("sufijo"))) ? "" : rs.getString("sufijo");
                        this.EmiteRemesas = (StringUtils.isEmpty(rs.getString("emiteremesas"))) ? "" : rs.getString("emiteremesas");

                        this.periodicidad_er = rs.getInt("periodicidad_er");

                    }

                    DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                    this.Fecha = df.format(new Date());

                    df = null;

        } catch (SQLException e) {
            System.out.println("SELECT * from datosper where id=1 Connection Failed!" + e.getMessage());
        }
        
    }

    @Override
    public String getNif() {
        return Nif;
    }

    @Override
    public String getNombre() {
        return Nombre;
    }

    @Override
    public String getDireccion() {
        return Direccion;
    }

    @Override
    public String getObjeto() {
        return Objeto;
    }

    @Override
    public String getPoblacion() {
        return Poblacion;
    }

    @Override
    public String getMovil() {
        return Movil;
    }

    @Override
    public String getFax() {
        return fax;
    }

    @Override
    public String getMail() {
        return Mail;
    }

    @Override
    public String getUrl_web() {
        return url_web;
    }

    @Override
    public String getUrl_tsa() {
        return url_tsa;
    }

    @Override
    public String getFecha_constitucion() {
        return fecha_constitucion;
    }

    @Override
    public String getForma_juridica() {
        return forma_juridica;
    }

    @Override
    public String getSociedades() {
        return Sociedades;
    }

    @Override
    public String getFecha() {
        return Fecha;
    }

    @Override
    public String getCNAE() {
        return CNAE;
    }

    @Override
    public String getIBAN() {
        return IBAN;
    }

    @Override
    public String getBIC() {
        return BIC;
    }

    @Override
    public String getEntidadPresenta() {
        return EntidadPresenta;
    }

    @Override
    public String getOficinaPresenta() {
        return OficinaPresenta;
    }

    @Override
    public String getSufijo() {
        return Sufijo;
    }

    @Override
    public int getPeriodicidad_er() {
        return periodicidad_er;
    }

    @Override
    public String getEmiteRemesas() {
        return EmiteRemesas;
    }

    @Override
    public String getPresupuestos() {
        return Presupuestos;
    }    
    
}
