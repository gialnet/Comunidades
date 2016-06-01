
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<title>Facturación</title>
<link href="css/main.css" rel="stylesheet" type="text/css" />
<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>

<script type="text/javascript" src="js/plugins/forms/jquery.uniform.min.js"></script>

<script type="text/javascript" src="js/files/bootstrap.min.js"></script>

<script type="text/javascript" src="js/files/login.js"></script>

</head>

<body class="no-background">

	<!-- Fixed top -->
	<div id="top">
		<div class="fixed">
			<a href="inicio.jsp" title="" class="logo"><img src="img/LogoPoliza.gif" alt="" /></a>
		</div>
	</div>
	<!-- /fixed top -->


    <!-- Login block -->
    <div class="login">
        <div class="navbar">
            <div class="navbar-inner">
                <h6><i class="icon-user"></i>Login page</h6>
                <div class="nav pull-right">
                    <a href="#" class="dropdown-toggle navbar-icon" data-toggle="dropdown"><i class="icon-cog"></i></a>
                    <ul class="dropdown-menu pull-right">
                        <li><a href="#"><i class="icon-plus"></i>registrar</a></li>
                        <li><a href="#"><i class="icon-refresh"></i>recuperar contraseña</a></li>
                        
                    </ul>
                </div>
            </div>
        </div>
        <div class="well">
            <form action="ServletSesion.servlet" class="row-fluid">
                <%
                    String mensaje = request.getParameter("xMsj");
                    if( mensaje!=null && mensaje.length()>0)
                         out.write("<div class=\"control-group\"><p class=\"text-error\">"+mensaje+"</p></div>");
                %>
                <input type="hidden" name="databasename" id="databasename" value="jdbc/myOwnerCommu00">
                <div class="control-group">
                    <label class="control-label">Username:</label>
                    <div class="controls"><input class="span12" type="text" name="xUser" placeholder="username" /></div>
                </div>
                
                <div class="control-group">
                    <label class="control-label">Password:</label>
                    <div class="controls"><input class="span12" type="password" name="xPass" placeholder="password" /></div>
                </div>

                <div class="control-group">
                    <div class="controls"><label class="checkbox inline"><input type="checkbox" name="checkbox1" class="styled" value="" checked="checked">Remember me</label></div>
                </div>

                <div class="login-btn"><input type="submit" value="Log me in" class="btn btn-danger btn-block" /></div>
            </form>
        </div>
    </div>
    <!-- /login block -->


	<!-- Footer -->
	<div id="footer">
		<div class="copyrights">2016 &copy;  Póliza Informática.</div>
		<ul class="footer-links">
			<li><a href="" title=""><i class="icon-cogs"></i>Contactar con el administrador</a></li>
			<li><a href="" title=""><i class="icon-screenshot"></i>Reportar bug</a></li>
		</ul>
	</div>
	<!-- /footer -->

</body>
</html>
