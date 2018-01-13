
package es.redmoon.comunidades.sesion;

import es.redmoon.comunidades.datosapp.DatosPerImpl;
import es.redmoon.comunidades.datosapp.IDatosPer;
import java.io.IOException;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.NamingException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author antonio
 * 
 * El formulario de control de acceso invoca este servicio para comprobar
 * los datos de usuario y contraseña para una determinada base de datos 
 * parámetro "databasename".
 * 
 * Para su correcto funcionamiento tienen que existir los tres parámetros
 * xUser, xPass y databasename
 * 
 * Si todo es correcto se establecerán las variables de sesión 
 * 
 */
public class ServletSesion extends HttpServlet {

    /**
     * Processes requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     * @throws java.sql.SQLException
     * @throws javax.naming.NamingException
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, SQLException, NamingException {
        
        response.setContentType("text/html;charset=UTF-8");
        
        String xUser = request.getParameter("xUser");
        String xPass = request.getParameter("xPass");
        String xDatabaseName = request.getParameter("databasename");
        
        CrearConnFactory factory= new CrearConnFactory();
                
        SQLConn ss = factory.CrearNewConnFactory(xDatabaseName);
        //ss.LogSesionTerceros(String IP, String HostName, String URI, String mail);
        
        try {
            
            RequestDispatcher rd =null;
            // Obtenemos los valores de sesión
            ISesion mySesion= new SesionImpl();
        
            if (mySesion.GetDataSessionUser(xUser))
            {
                // Asignamos los valores de sesión
                HttpSession sesion = request.getSession();
                
                // Leemos los datos de la Comunidad del Pozo
                IDatosPer dp = new DatosPerImpl();
                mySesion.GetDataSessionPozo(dp);
                
                // Asignamos variables de sesión
                sesion.setAttribute("xDataBaseName",xDatabaseName);
                sesion.setAttribute("xIDFinca", mySesion.getxIDFinca());
                sesion.setAttribute("xComunero",mySesion.getxComunero());
                sesion.setAttribute("xNIFComunero", mySesion.getxNIFComunero());
                sesion.setAttribute("xNombreComunero", mySesion.getxNombreComunero());
                
                sesion.setAttribute("RazonSocial",mySesion.getRazonSocial());
                sesion.setAttribute("FormaJuridica", mySesion.getFormaJuridica());
                
                if (mySesion.getxIDFinca().equalsIgnoreCase("regador"))
                    rd=request.getRequestDispatcher("regador.jsp");
                else
                    rd=request.getRequestDispatcher("main.jsp");
                
                rd.forward(request, response);
            }
            else
            {
                //System.err.println("Error en login usuario:"+xUser);
                rd=request.getRequestDispatcher("index.jsp?xMsj=Error en usuario o contraseña.");
                rd.forward(request, response);
            }
            
             
            
        }catch (ServletException e) 
        {
            System.err.println("Error en login" + e.getMessage());
        }
        
        
        
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP
     * <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (SQLException ex) {
            Logger.getLogger(ServletSesion.class.getName()).log(Level.SEVERE, null, ex);
        } catch (NamingException ex) {
            Logger.getLogger(ServletSesion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Handles the HTTP
     * <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (SQLException ex) {
            Logger.getLogger(ServletSesion.class.getName()).log(Level.SEVERE, null, ex);
        } catch (NamingException ex) {
            Logger.getLogger(ServletSesion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
