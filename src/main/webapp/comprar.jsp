
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
    <meta name="description" content="comprar tickets de suministro de agua">
    <meta name="author" content="Antonio Perez Caballero">
    <link rel="icon" href="favicon.ico">

    <title>comprar tickets de suministro de agua</title>

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
            <li><a href="main.jsp">Inicio</a></li>
            <li class="active"><a href="#">Comprar</a></li>
            <li><a href="contacto.jsp">Contacto</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>

    <div class="container">

        <%
            String database = (String) sesion.getAttribute("xDataBaseName");
            
            // identifica el estanque 
            String xEstanque = (String) sesion.getAttribute("xIDUser");
            String xComunero = (String) sesion.getAttribute("xUser");
            
            SQLComuneros myOwner = new SQLComuneros(database);
            SQLEstanques myPool = new SQLEstanques(database);
            
            TuplasComuneros TuOwner = myOwner.getComuneroByCodigo(xComunero);
            //TuplasEstanques TuPool = myPool.getEstanqueByCodigo(xCodigo);
            
            if (xEstanque != null && !xEstanque.isEmpty()) {
                
                comunero.setNombre(TuOwner.getNombre());

            }
            else
            {
                comunero.setNombre("");
            }
            
            %>
      <div class="starter-template">
          <h1>Comunidad <span><%= sesion.getAttribute("RazonSocial")%></span></h1>
          <p class="lead"> <span class="active"><%= comunero.getNombre() %>, </span> aqu&iacute; puedes comprar tickets de suministros de agua que se cargar&aacute;n en tu cuenta bancaria mediante domiciliaci&oacute;n.</p>
      </div>
      
      <form class="form-horizontal">
        <input type="hidden" name="xEstanque" id="xEstanque" value="<%= xEstanque %>">
        
        <div class="form-group">
            <label for="llenado" class="col-sm-2 control-label">Alberca</label>
            <div class="col-sm-10 checkbox">
              <input type="checkbox" value="" id="llenado">Llenado completo
          </div>
        </div>
        <div class="form-group">
            <label for="minutos" class="col-sm-2 control-label">Minutos</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="minutos" onfocus="QuitarMensaje()" placeholder="Tiempo en fragmentos de 15 minútos como mínimo">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="button" class="btn btn-default" id="enviar"  onclick="ComprarTicket()">Comprar</button>
            </div>
      </div>
      <div class="collapse" id="collapseExample">
        <div class="well" id="mensaje">
          Esto parece que está mal
        </div>
      </div>
      </form>
    </div><!-- /.container -->

    

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
    <script src="bootstrap-3.3.6-dist/js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="assets/js/ie10-viewport-bug-workaround.js"></script>
    <script>
        $('#llenado').on('click', function () {
            
          if ($(this).is(':checked'))
            $('#minutos').attr('disabled', true);
          else
            $('#minutos').attr('disabled', false);
        });
   </script>
    
  </body>
</html>
