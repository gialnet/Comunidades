
function LeerFacturasEmitidas()
{
    //alert(Nombre);
    
    var pag=window.pagina;
    var tama=window.pagsize;
    var url='AjaxServlet.servlet';
    var dataToSend='accion=fact_emitidas&pagina='+pag+'&size='+tama;
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    
    conn.pageRequest.onreadystatechange = function() { LeerFactuEmitidas(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    
    return conn;
}

function LeerFactuEmitidas(pageRequest) {


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
                CrearTablaEmitidas(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}


/**
 * Crear la tabla de Facturas Recibidas
 * @param {type} myJson
 * @returns {undefined}
 */
function CrearTablaEmitidas(myJson) {

    var tabla = new grid("oTabla");
    var j = 0;

    //alert(myJson);
    
    var obj = JSON.parse(myJson);

    deleteLastRow("oTabla");
    
//alert(obj.length);
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

        var celda = tabla.AddRowCellText(row, 0, obj[j].id);
        celda.setAttribute('hidden', 'true'); // ocultar la columna ID
        tabla.AddRowCellText(row, 1, obj[j].numero);
        tabla.AddRowCellText(row, 2, obj[j].nombre);
        tabla.AddRowCellNumber(row, 3, obj[j].fecha);
        tabla.AddRowCellNumber(row, 4, obj[j].total);
      
        if(obj[j].estado==='PAGADA')
            tabla.AddRowCellText(row, 5,'<span class="label label-success">'+ obj[j].estado+'</span>');
        else
            tabla.AddRowCellText(row, 5,'<span class="label label-info">'+ obj[j].estado+'</span>');
        
        //Comprobamos si está pagada o no para cambiar entre pagar y cancelar pago
        var cobro;
         if(obj[j].estado==='PAGADA')
           cobro = '<li><a onclick="CancelarCobrarFact('+(j+1)+');" class="btn tip" title="Anular el cobro de la factura"> <i class="icon-ban-circle"> </i> </a></li>';        

        else
           cobro ='<li><a onclick="CobrarFact('+(j+1)+');" class="btn tip" title="Cobrar la factura"> <i class="icon-money"> </i> </a></li>';        

        
        tabla.AddRowCellText(row, 6,
        '<ul class="table-controls">'+
        '<li><a onclick="VerPDF('+(j+1)+');" class="btn tip" title="Ver Factura"><i class="icon-eye-open"></i></a> </li>'+
        '<li> <a onclick="UpdateFact('+(j+1)+');" class="btn tip" title="Editar factura"> <i class="icon-pencil"> </i> </a></li>'+ 
        '<li><a onclick="SendEmailFact('+(j+1)+');" class="btn tip" title="Enviar por e-Mail"> <i class="icon-envelope-alt"> </i> </a></li>'+
        cobro+
        '</ul>');
       

    }
    
    obj=null;

}


//
// Abrir el formulario para cobrar una factura
//
function CobrarFact(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    
    window.location.href = 'CobrarFactura.jsp?xIDFactura='+oCelda.innerHTML;
}

//
// Abrir el formulario para cobrar una factura
//
function CancelarCobrarFact(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    
    window.location.href = 'CancelarCobrarFactura.do?xIDFactura='+oCelda.innerHTML;
}



//
// Abrir el formulario para editar un cliente
//
function UpdateFact(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    
    window.location.href = 'newFactura.jsp?xIDFactura='+oCelda.innerHTML;
}

//
// Enviar un correo
//
function SendEmailFact(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    // SendMailFact
    CallRemote('AjaxServlet.servlet', 'accion=SendMailFact&xIDFact='+oCelda.innerHTML);
    
}

/**
 * Busqueda de clientes por nombre
 * @returns {undefined}
 */
function EmitidasByNombre(){
    var pag=1; 
    var tama=10; 
    var xNombre = document.getElementById('xNombre').value;
    var direccion='accion=emitidasByNombre&pagina='+pag +'&size='+tama+'&xNombre='+xNombre;
    //alert(direccion);
    CallRemote('AjaxServlet.servlet', direccion);
}

/*
 * 
 * @returns {undefined}
 */
function EmitidasByNumero(){
    var pag=1; 
    var tama=10; 
    var xNombre = document.getElementById('xNumero').value;
    var direccion='accion=emitidasByNumero&pagina='+pag +'&size='+tama+'&xNombre='+xNombre;
    //alert(direccion);
    CallRemote('AjaxServlet.servlet', direccion);
}


/**
 * 
 * @returns {undefined}
 */
function NextPageEmitidas()
{
    window.pagina++;
    var pag=window.pagina;
    var tama=window.pagsize;
    var xNombre = document.getElementById('xNombre').value;    
    var direccion='';
    
     if(xNombre.length>0){
       
        direccion='accion=emitidasByNombre&pagina='+pag +'&size='+tama+'&xNombre='+xNombre;
    }
    else
        direccion='accion=fact_emitidas'+'&pagina='+pag +'&size='+tama;
    
    
    
    document.getElementById("xPag").innerHTML=window.pagina;
    //alert(direccion);
    CallRemote('AjaxServlet.servlet', direccion);
}

/**
 * 
 * @returns {undefined}
 */
function PrevPageEmitidas()
{
    
    window.pagina--;
    if (window.pagina <1)
        window.pagina=1;
    
    var pag=window.pagina;
    var tama=window.pagsize;
    
    var xNombre = document.getElementById('xNombre').value;    
    var direccion='';
    
    if(xNombre.length>0){
       
        direccion='accion=emitidasByNombre&pagina='+pag +'&size='+tama+'&xNombre='+xNombre;
    }
    else
        direccion='accion=fact_emitidas'+'&pagina='+pag +'&size='+tama;
    
    
    
    document.getElementById("xPag").innerHTML=window.pagina;
    //alert(direccion);
    CallRemote('AjaxServlet.servlet', direccion);
}
