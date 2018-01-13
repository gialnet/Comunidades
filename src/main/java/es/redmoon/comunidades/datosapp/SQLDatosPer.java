
package es.redmoon.comunidades.datosapp;

import static es.redmoon.comunidades.sesion.PoolConn.PGconectar;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author antonio
 */
public class SQLDatosPer  { 
    
    
    /**
     * 
     * @return List<Tuplasdatosper_legal>
     * @throws SQLException 
     */
    public List<Tuplasdatosper_legal> ListaFormaJuridica() throws SQLException
    {
        
        List<Tuplasdatosper_legal> tf = new ArrayList<>();

        try (Connection conn = PGconectar();
                PreparedStatement st = conn.prepareStatement("SELECT * from datosper_legal order by id");
                ResultSet rs = st.executeQuery()) {


                    while (rs.next()) {

                        tf.add(new Tuplasdatosper_legal.Builder().
                                Id(rs.getInt("id")).
                                Forma_juridica(rs.getString("forma_juridica ")).
                                build());

                    }

        } catch (SQLException e) {
            System.out.println("SELECT * from datosper_legal Connection Failed!" + e.getMessage());
        }
        
        return tf;
    }
    
    /**
     * 
     * @param xUser
     * @return 
     * @throws SQLException 
     */
    public static byte[] getToken(String xUser) throws SQLException
    {
        
        byte[] myCertificado = null;

        try (Connection conn = PGconectar();
             PreparedStatement st = conn.prepareStatement("SELECT email,nif,nombre,tipo,certificado from user_app where email=?")) {

                st.setString(1, xUser.trim());

                try (ResultSet rs = st.executeQuery()) {

                    if (rs.next()) {

                        myCertificado = rs.getBytes("certificado");

                    }

            }
        } catch (SQLException e) {
            System.out.println("SELECT * from user_app Connection Failed!.getToken" + e.getMessage());
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
        
        String Resultado = null;

        try (Connection conn = PGconectar();
               CallableStatement st = conn.prepareCall("{ ? = call UpdateDatosPer(?,?,?,?,?,?,?,?,?,?,?) }") ) {

                st.registerOutParameter(1, Types.VARCHAR);
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

                Resultado = st.getString(1);

        } catch (SQLException e) {

            System.out.println("Error call UpdateDatosPer Connection Failed!" + e.getMessage());

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
        
        try (Connection conn = PGconectar(); 
                CallableStatement st = conn.prepareCall("{ call datospersepa (?,?,?,?,?) }")) {
            st.setString(1, entidad);
            st.setString(2, oficina);
            st.setString(3, sufijo);
            st.setString(4, NumeroRecibos);
            st.setString(5, xEmiteRemesa);
            
            st.execute();
            
        } catch (SQLException e) {

            System.out.println("DatosPerSEPA Connection Failed!" + e.getMessage());

        }
    }
    
    
}