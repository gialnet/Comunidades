//
// Leer datos de Oracle via Ajax y PHP
//
// Hacer una llamada http post asincrona
//
// ejemplo: url_parametros='xIDExpe=94175';
// ejemplo: CallRemote('Redmoon_php/serializado_SeguiSolicitudes.php', url_parametros)
//
function CallRemote(url, dataToSend) {

    var pageRequest = false;

    // Crear el objeto en funcion de si es Internet Explorer y resto de navegadores	
    if (window.XMLHttpRequest) {
        pageRequest = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        try {
            pageRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                pageRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
            }
        }
    }
    else
        return false;

    //
    // al objeto pageRequest le asignamos una función para procesar el evento onreadystatechange
    // esta se encarga de enviar la petición y leer la respuesta en un objeto javascript en el navegador
    //
    //alert('CallRemote');
    pageRequest.onreadystatechange = function() {
        ProcRespuesta(pageRequest, dataToSend);
    };

    // enviamos la peticion

    if (dataToSend) {
        pageRequest.open('POST', url, true);
        pageRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        pageRequest.send(dataToSend);
        //alert('CallRemote dataToSend');
    }
    else {
        pageRequest.open('GET', url, true);
        pageRequest.send(null);
    }
    return true;
}


//
//Recibe la respuesta del servidor
//
function ProcRespuesta(pageRequest, url) {


    if (pageRequest.readyState === 4)
    {
        if (pageRequest.status === 200)
        {
            // Solo descomentar para depuración
            //alert(pageRequest.responseText);
            if (pageRequest.responseText === 'Error')
                alert(pageRequest.responseText);
            else
            {
                // cadena que contiene el resultado del servidor
                // el servidor envia mediante el comando echo su contenido a la variable pageRequest.responseText
                // ejemplo: echo 'Ok';
                //alert(pageRequest.responseText);
                // hace lo que se quiera con esa cadena
                // aqui seguiria el codigo ...
                //alert(url.toString().substring(0, 24));
                                
                if (url.toString().substring(0, 21) === "accion=fact_recibidas")
                    CrearTablaRecibidas(pageRequest.responseText);
                if (url.toString().substring(0, 24) === "accion=recibidasByNombre")
                    CrearTablaRecibidas(pageRequest.responseText);
                if (url.toString().substring(0, 35) === "accion=recibidasByNombreAndConcepto")
                    CrearTablaRecibidas(pageRequest.responseText);
                //recibidasByNombreAndConcepto
                if (url.toString().substring(0, 20) === "accion=fact_emitidas")
                    CrearTablaEmitidas(pageRequest.responseText);
                 if (url.toString().substring(0, 23) === "accion=emitidasByNombre")
                    CrearTablaEmitidas(pageRequest.responseText);
                                                      //          1         2
                                                      //01234567890123456789012345
                //alert(pageRequest.responseText);
                //alert(url.toString());
                if (url.toString().substring(0, 25) === "accion=LeerDatosProveedor")
                    {
                        /*
                        var arrayparam = url.split('=');
                        arrayparam = arrayparam[2].split('&');
                        //alert(url);
                        var idLista = arrayparam[0];
                        //alert(pageRequest.responseText);
                        //alert(idLista);*/
                        LeerDatosProveedor(pageRequest.responseText);
                    }
                    
                 if (url.toString().substring(0, 24) === "accion=LeerDatosClientes")
                    {
                        /*var arrayparam = url.split('=');
                        arrayparam = arrayparam[2].split('&');
                        //alert(url);
                        var idLista = arrayparam[0];*/
                        //alert(pageRequest.responseText);
                        LeerDatosClientes(pageRequest.responseText);
                    }
                                                      //          1         2
                                                      //0123456789012345678901234
                if (url.toString().substring(0, 19) === "accion=NuevaFactura")
                    {
                        alert(pageRequest.responseText);
                    }
                    
                                
                if (url.toString().substring(0, 22) === "accion=LeerSaldoCuenta")
                    {
                        //alert(pageRequest.responseText);
                        PutSaldoenHTML(pageRequest.responseText);
                    }
                    
                
                if (url.toString().substring(0, 25) === "accion=ListaCuentasSaldos")
                    {
                        //alert(pageRequest.responseText);
                        CrearTablaTuplasCuentasSaldos(pageRequest.responseText);
                    }
                    
                if (url.toString().substring(0, 19) === "accion=ListaNominas")
                    {
                        //alert(pageRequest.responseText);
                        CrearTablaNominas(pageRequest.responseText);
                    }
                                                      //0123456789012345678901234567890
                if (url.toString().substring(0, 27) === "accion=ListaSeguridadSocial")
                    {
                        //alert(pageRequest.responseText);
                        CrearTablaSeguridadSocial(pageRequest.responseText);
                    }
                if (url.toString().substring(0, 24) === "accion=ListaHaciendaIRPF")
                    {
                        //alert(pageRequest.responseText);
                        CrearTablaIRPF(pageRequest.responseText);
                    }
                    
                if (url.toString().substring(0, 23) === "accion=ListaHaciendaIVA")
                    {
                        //alert(pageRequest.responseText);
                        CrearTablaIVA(pageRequest.responseText);
                    }
                    
                if (url.toString().substring(0, 30) === "accion=ListaImpuestoSociedades")
                    {
                        //alert(pageRequest.responseText);
                        CrearTablaSociedades(pageRequest.responseText);
                    }
                /*if(url=='/AjaxServlet')
                 HacerBusqueda();*/
                //alert(url.toString());
              //alert(pageRequest.responseText);

            }


        }
    }
    else
        return;
}
