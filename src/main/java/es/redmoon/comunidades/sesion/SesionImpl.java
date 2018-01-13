package es.redmoon.comunidades.sesion;

import es.redmoon.comunidades.datosapp.IDatosPer;
import static es.redmoon.comunidades.sesion.PoolConn.PGconectar;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.naming.NamingException;

/**
 *
 * @author antonio
 */
public class SesionImpl implements ISesion {

    private String xIDFinca;
    private String xComunero;
    private String xNIFComunero;
    private String xNombreComunero;
    private String RazonSocial;
    private String FormaJuridica;

    

    @Override
    public void GetDataSessionPozo(IDatosPer dp) throws SQLException, NamingException {
        
        this.RazonSocial=dp.getNombre();
        this.FormaJuridica=dp.getForma_juridica();
    }
    
    @Override
    public boolean GetDataSessionUser(String xUser) throws SQLException, NamingException
    {
        
        if (xUser.equalsIgnoreCase("staff"))
        {
            this.xIDFinca = "00";
            this.xComunero= "regador";
            this.xNIFComunero= "00";
            this.xNombreComunero= "00";
            return true;
        }
        
        try (Connection conn = PGconectar();
               PreparedStatement st = conn.prepareStatement("SELECT * from vw_propiedades where codigo=?") ) {
            //System.err.println("Error en login usuario:"+xUser);
            
            st.setString(1, xUser.trim());
            //st.setString(2, xPass);
            
            try (ResultSet rs = st.executeQuery())
            {

                if (rs.next()) {
                    
                    // ID de la propiedad identifica de forma única la finca número secuencia
                    // asignado de forma automática por el sistema
                    this.xIDFinca = rs.getString("codigo");
                    
                    // ID del comunero de la finca no tiene porqué ser el propietario
                    // puede ser quien lo representa
                    //this.xUser=rs.getString("comunero");
                    this.xComunero=rs.getString("comunero");
                    
                    this.xNIFComunero=rs.getString("nif");
                    this.xNombreComunero=rs.getString("nombre");                    
                    
                }
                else
                {
                    //System.err.println("Error en login usuario sql session:"+xUser);
                    //AccionesErrorLogin();
                    return false;
                }
        
            }
           
        }
        catch (SQLException e) {
            System.out.println("SELECT from comuneros Connection Failed!.CheckLogin" + e.getMessage());
            return false;
        }
        
        return true;
    }

    @Override
    public String getxIDFinca() {
        return xIDFinca;
    }

    @Override
    public String getxComunero() {
        return xComunero;
    }

    @Override
    public String getxNIFComunero() {
        return xNIFComunero;
    }

    @Override
    public String getxNombreComunero() {
        return xNombreComunero;
    }

    @Override
    public String getRazonSocial() {
        return RazonSocial;
    }

    @Override
    public String getFormaJuridica() {
        return FormaJuridica;
    }
    
        
}
