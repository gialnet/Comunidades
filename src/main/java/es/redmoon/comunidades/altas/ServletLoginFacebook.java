/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package es.redmoon.comunidades.altas;

import java.io.IOException;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author antonio
 */
public class ServletLoginFacebook extends HttpServlet {

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
        
        //String xPais = request.getParameter("locale").substring(0, 2).toUpperCase();
        String xMail = request.getParameter("email");
        String xNombre = request.getParameter("name");
        String xGenero = request.getParameter("gender");
        String xPlus = request.getParameter("link");
        
        // Leer los datos de procedencia HOST, IP, URL
        String IP= request.getRemoteAddr();
        String HOST= request.getRemoteHost();
        String URI= request.getRequestURI();
        
        SQLSesionAltas mySesion= new SQLSesionAltas();
        // Anotar los datos del la petición
        mySesion.LogSesion(IP, HOST, URI, xMail);
        
    // si ya existe la cuenta, está dado de alta en customers_users con un 
    // email igual al que nos proporciona Facebook
        
    if (mySesion.CheckMailExist(xMail))
    {
        // Asignamos los valores de sesión y entramos
    
        String sURL = "https://" + mySesion.getIp() 
                + "/comunidades/ServletSesion.servlet?xUser="+ xMail
                + "&xNombre="+ xNombre
                + "&xPass="+mySesion.getPassdatabase()
                + "&databasename="+mySesion.getDatabasename();

        //System.out.println(sURL);                

        //RequestDispatcher rd=request.getRequestDispatcher(sURL);
        //rd.forward(request, response);
        response.sendRedirect(sURL);
    

    }
    else
    {
        // No exite como usuario en la base de datos
        // asignar una base de datos nueva
        SQLAltaServicio as = new SQLAltaServicio();

        as.SolicitudAltaServicio(xNombre, xMail, xGenero, xPlus);
        response.getWriter().println("<h1>Su solicitud ha sido enviada, le informaremos en su correo<h1>");
        
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
            Logger.getLogger(ServletLoginFacebook.class.getName()).log(Level.SEVERE, null, ex);
        } catch (NamingException ex) {
            Logger.getLogger(ServletLoginFacebook.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(ServletLoginFacebook.class.getName()).log(Level.SEVERE, null, ex);
        } catch (NamingException ex) {
            Logger.getLogger(ServletLoginFacebook.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Login vía Facebook";
    }// </editor-fold>
}
