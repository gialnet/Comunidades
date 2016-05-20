
package es.redmoon.comunidades.session;

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
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, SQLException, NamingException {
        
        response.setContentType("text/html;charset=UTF-8");
        
        String xUser = request.getParameter("xUser");
        String xPass = request.getParameter("xPass");
        String xDatabaseName = request.getParameter("databasename");
                
        try {
            
            RequestDispatcher rd =null;
            // Obtenemos los valores de sesión
            SQLSesion mySesion= new SQLSesion(xDatabaseName);
        
            if (mySesion.GetDataSessionUser(xUser))
            {
                // Asignamos los valores de sesión
                HttpSession sesion = request.getSession();
                
                sesion.setAttribute("xIDUser", mySesion.getxIDUser());
                sesion.setAttribute("xDataBaseName",xDatabaseName);
                sesion.setAttribute("xUser",mySesion.getxUser());
                sesion.setAttribute("UserTipo",mySesion.getUserTipo());
                sesion.setAttribute("NIF", mySesion.getNIFUser());
                sesion.setAttribute("RazonSocial",mySesion.getRazonSocial());
                sesion.setAttribute("FormaJuridica", mySesion.getFormaJuridica());
                sesion.setAttribute("Database", mySesion.getDatabase());
                sesion.setAttribute("NumeroMaxUsuarios", mySesion.getNumeroMaxUsuarios());
                sesion.setAttribute("Fecha", mySesion.getFecha());
                
                sesion.setAttribute("TipoCuenta", mySesion.getTipo_de_cuenta());

                // permisos en formato JSON {"panel": "no", "clientes":"yes"...}
                sesion.setAttribute("permisos", mySesion.getPermisos());
                sesion.setAttribute("myLocale", mySesion.getMyLocale());
                
                // Crear la lista de servicios autorizados
                sesion.setAttribute("Burofax", mySesion.getBurofax());
                sesion.setAttribute("Firma", mySesion.getFirma());
                sesion.setAttribute("Almacenamiento", mySesion.getAlmacenamiento());
                sesion.setAttribute("Indexacion", mySesion.getIndexacion());
                sesion.setAttribute("myHD", mySesion.getMyHD());
                
                // vista de administrador
                if (mySesion.getUserTipo().equalsIgnoreCase("administrador"))
                {
                    rd=request.getRequestDispatcher("BrowsePolizasAdmin.jsp");
                }
                // vista de clientes
                else if (mySesion.getUserTipo().equalsIgnoreCase("cliente"))
                {
                    rd=request.getRequestDispatcher("BrowsePolizasClientes.jsp");
                }
                else
                    rd=request.getRequestDispatcher("BrowsePolizasClientes.jsp");
                
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
            System.err.println("Error en login");
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
