
package es.redmoon.comunidades.altas;

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

/**
 *
 * @author antonio
 */
public class ServletLoginByUserPass extends HttpServlet {

    /**
     * Processes requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, SQLException, NamingException {
        
        response.setContentType("text/html;charset=UTF-8");
        
        String xUser = request.getParameter("xUser");
        String xPass = request.getParameter("xPass");
        
        //System.out.print(xUser+"passw"+xPass);
        
        // Leer los datos de procedencia HOST, IP, URL
        String IP= request.getRemoteAddr();
        String HOST= request.getRemoteHost();
        String URI= request.getRequestURI();        

        RequestDispatcher rd =null;
        
        // Crear la conexión a la base de datos para poder leer
        // la base de datos de cada usuario
        // Solo se necesita para hace login y recuperar la base de datos
        // a la que pertenece, ya no se usa más a lo largo de la vida
        // del aplicativo
        SQLConnEntryPoint myConn = new SQLConnEntryPoint();
        
        // Aqui comprobamos el usuario y la contraseña
        IgetDatabase ss = new getDatabaseImpl();
        
        // Anotar los datos del la petición
        ss.LogSesion(IP, HOST, URI, xUser);

        if (ss.getDatabaseForLogin(xUser, xPass))
        {
            String sURL = "https://" + ss.getIp() 
            + "/comunidades/ServletSesion.servlet?xUser="+ xUser
            + "&xPass="+xPass
            + "&databasename="+ss.getDatabasename();

            //System.out.println(sURL);                

            //RequestDispatcher rd=request.getRequestDispatcher(sURL);
            //rd.forward(request, response);
            myConn=null;
            response.sendRedirect(sURL);
        }
        else
        {
            myConn=null;
            response.getWriter().println("<h1>Usuario o contraseña erroneos<h1>");
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
            Logger.getLogger(ServletLoginByUserPass.class.getName()).log(Level.SEVERE, null, ex);
        } catch (NamingException ex) {
            Logger.getLogger(ServletLoginByUserPass.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(ServletLoginByUserPass.class.getName()).log(Level.SEVERE, null, ex);
        } catch (NamingException ex) {
            Logger.getLogger(ServletLoginByUserPass.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Login vía usuario y contraseña";
    }// </editor-fold>
}
