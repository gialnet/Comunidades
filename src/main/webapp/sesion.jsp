<%-- 
    Document   : sesion
    Created on : 25-sep-2013, 3:02:20
    Author     : antonio
--%>

<%@page session="true" %>
<%
    
    HttpSession sesion = request.getSession();

    if (sesion.getAttribute("xUser") == null)
    {
%>
    <jsp:forward page="index.jsp">
        <jsp:param name="Error" value="Usuario y/o clave no validas"/>
    </jsp:forward>    
<%
    }
%>