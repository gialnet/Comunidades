
<%@page import="es.redmoon.comunidades.estanques.TuplasEstanques"%>
<%@page import="es.redmoon.comunidades.estanques.SQLEstanques"%>
<%@page import="es.redmoon.comunidades.comuneros.TuplasComuneros"%>
<%@page import="es.redmoon.comunidades.comuneros.SQLComuneros"%>
<%@include file="sesion.jsp" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:useBean id="comunero" class="es.redmoon.comunidades.comuneros.BeanComuneros" scope="session"/>
<jsp:useBean id="estanque" class="es.redmoon.comunidades.estanques.BeanEstanques" scope="session"/>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="favicon.ico">

    <title>Panel de opciones Comunidades</title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap-3.3.6-dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="starter-template.css" rel="stylesheet">
    
    <link href="css/redmoon.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="assets/js/ie-emulation-modes-warning.js"></script>
    
    <script type="text/javascript" src="js_tetbury/grid.js"></script>
    <script type="text/javascript" src="js_tetbury/conta-comAJAX.js"></script>
    <script type="text/javascript" src="js_tetbury/TicketsLeer.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Comunidades Prodacon</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Inicio</a></li>
            <li><a href="#about">Información</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>

    <div class="container">

        <%
            String database = (String) sesion.getAttribute("xDataBaseName");
            String xCodigo = (String) sesion.getAttribute("xIDUser");
            SQLComuneros myOwner = new SQLComuneros(database);
            SQLEstanques myPool = new SQLEstanques(database);
            
            TuplasComuneros TuOwner = myOwner.getComuneroByCodigo(xCodigo);
            //TuplasEstanques TuPool = myPool.getEstanqueByCodigo(xCodigo);
            
            if (xCodigo != null && !xCodigo.isEmpty()) {
                
                comunero.setNombre(TuOwner.getNombre());

            }
            else
            {
                comunero.setNombre("");
            }
            
            %>
      <div class="starter-template">
          <h1>Comunidad <span><%= sesion.getAttribute("RazonSocial")%></span></h1>
          <p class="lead"> <span class="active"><%= comunero.getNombre() %>, </span> aqu&iacute; encontraras los datos de consumo  as&iacute;­ como podr&aacute; realizar la compra de suministros de agua.</p>
      </div>
        <input type="hidden" name="xEstanque" id="xEstanque" value="<%= xCodigo %>">
        <div class="table-responsive">
            <table class="table table-hover" id="oTabla">
            <thead>
                    <tr>
                        <td width="1%" hidden="hidden"><strong>id</strong></td>
                        <td width="10%"><strong>&numero; Ticket</strong></td>
                        <td width="10%"><strong>Canal</strong></td>
                        <td width="10%"><strong>Min&uacute;tos</strong></td>
                        <td width="15%"><strong>Fecha</strong></td>
                        <td width="20%"><strong>Observaciones</strong></td>
                        <td width="15%"></td>
                    </tr>
        </table>
        <div class="table-footer">

            <div class="pagination">
                <ul>
                    <li><a onclick="conn.PrevPage('accion=TicketsByEstanque&xEstanque='+document.getElementById('xEstanque').value);">Anterior</a></li>

                    <li class="active"><a href="#" id="xPag">1</a></li>

                    <li><a onclick="conn.NextPage('accion=TicketsByEstanque&xEstanque='+document.getElementById('xEstanque').value);">Siguiente</a></li>
                </ul>
            </div>
                        <script>
            
                            var pag=1; //window.pagina;
                            var tama=10; //window.pagsize;
                            
                            //alert(direccion);
                            // El nif lo toma del objeto sesión
                            var conn=LeerTickets();
                        </script>
            </div>
        </div>

    </div><!-- /.container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
    <script src="bootstrap-3.3.6-dist/js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="assets/js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>
