
<%@include file="sesion.jsp" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
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

    <title>Listados de tickets de riego</title>

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
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Comprar</a></li>
            <li class="active"><a href="contacto.jsp">Contacto</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>

    <div class="container">

      <header>
      <div class="starter-template">
          <h1>Listados de consumos de agua de riego</h1>
      </div>
      </header>
        <form>
        <div class="form-group">
          <label for="xDesde">Fecha desde</label>
          <input type="text" class="form-control" id="xDesde" onclick="QuitarMensaje();" placeholder="01-01-2016">
        </div>
        <div class="form-group">
          <label for="xHasta">hasta</label>
          <input type="text" class="form-control" id="xHasta" onclick="QuitarMensaje();" placeholder="31-12-2016">
        </div>
        <button type="button" class="btn btn-default btn-lg" onclick="TicketsListados();">
            <span class="glyphicon glyphicon-print" aria-hidden="true"></span> Imprimir
          </button>
       <div class="collapse" id="collapseMensaje">
        <div class="well" id="mensaje">
            <h3>No hay resultados para el rango solicitado</h3>
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
    <script src="js_tetbury/TicketsListados.js"></script>
    <script type="text/javascript" src="js_tetbury/grid.js"></script>
    <script type="text/javascript" src="js_tetbury/conta-comAJAX.js"></script>
    
    
  </body>
</html>
