/*
 * Altas en el servicio
 */
package es.redmoon.comunidades.altas;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import javax.naming.NamingException;

/**
 * Acciones para dar de alta a los clientes
 * @author antonio
 */
public class SQLAltaServicio extends PoolConnAltas {

    public SQLAltaServicio() throws SQLException, NamingException {
        super();
    }

    /**
     * Asignar una base de datos disponible a un nuevo usuario
     * @param xNombre
     * @param xMail
     * @param xPais
     * @return
     * @throws SQLException 
     */
    public int AltaServicio(String xNombre, String xMail, int xPais) throws SQLException
    {
                 
         int id_newuser=0;
         byte[] adjunto=null;
         String cuerpo="";
         String url = "https://www.myempresa.eu/ServletVerifyMail?url_wellcome=";
         
        // System.out.println(url);
         
        try (Connection conn = PGconectar();
             PreparedStatement st = 
                     conn.prepareStatement("Select xidlibre,xurl_wellcome,xtoken from AltaServicio(?,?,?)")) {
            
                    st.setString(1, xNombre);
                    st.setString(2, xMail);
                    st.setInt(3, xPais);

                    try (ResultSet rs = st.executeQuery())
                    {

                        if (rs.next())
                        {
                            id_newuser = rs.getInt("xidlibre");
                            cuerpo = url + rs.getString("xurl_wellcome");
                            adjunto = rs.getBytes("xtoken");

                            cuerpo = "Copie esta url en su navegador: " + cuerpo ;

                            System.out.println(cuerpo);
                            System.out.println(adjunto.length);

                            // enviar un mail de confirmación
                            SendEmail se = new SendEmail();
                            se.EnviarWithAdjunto(xMail, "Mensaje de bienvenida a myEmpresa.eu", cuerpo, adjunto);

                        }
                
                }
            
        } catch (SQLException e) {
            System.out.println("AltaServicio() Connection Failed!"+ e.toString());
        }
        
        
        return id_newuser;
    }
    
    /**
     * 
     * @param xNombre
     * @param xMail
     * @param xGenero
     * @param xPlus
     * @throws SQLException 
     */
    public void SolicitudAltaServicio(String xNombre, String xMail, String xGenero, String xPlus) throws SQLException
    {
         
        try (Connection conn = PGconectar()) {
            
                try (PreparedStatement st = conn.prepareStatement("Select SolicitudAltaServicio(?,?,?,?,?)"))
                {

                    //st.registerOutParameter(1,Types.INTEGER);
                    st.setString(1, xNombre);
                    st.setString(2, xMail);
                    st.setString(3, xGenero);
                    st.setString(4, xPlus);

                    try (ResultSet rs = st.executeQuery())
                    {

                        int id_newuser;
                        if (rs.next())
                        {
                            id_newuser = rs.getInt("xidlibre");

                        }
                        else
                            id_newuser=0;


                    }
                }
        } catch (SQLException e) {
            System.out.println("AltaServicio() Connection Failed!"+ e.toString());
        }
        
        
    }
    
    
    /**
     * Alta en el servicio vía Google
     * Pedir una base de datos disponible mediante su url de bienvenida
     * @return
     * @throws SQLException 
     */
    public String AltaServicioGoogle() throws SQLException
    {
        
        String url_wellcome=null;
        
        try (Connection conn = PGconectar()) {


            try (CallableStatement st = conn.prepareCall("{ ? = call PeticionAltaServicioGoogle() }"))
            {
            st.registerOutParameter(1,Types.VARCHAR);
            
            st.execute();
            
            url_wellcome=st.getString(1);
            
            }
        }
        
        return url_wellcome;
    }
    
}