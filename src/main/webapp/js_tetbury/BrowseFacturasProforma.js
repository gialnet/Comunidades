
/**
 * 
 * @returns {Conectar}
 */
function LeerFacturasProforma()
{
    //alert(Nombre);
    
    var pag=window.pagina;
    var tama=window.pagsize;
    var url='AjaxServlet.servlet';
    var dataToSend='accion=fact_proforma&pagina='+pag+'&size='+tama;
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    
    conn.pageRequest.onreadystatechange = function() { LeerFactuProforma(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    
    return conn;
}

function LeerFactuProforma(pageRequest) {


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
                CrearTablaProforma(pageRequest.responseText);
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
function CrearTablaProforma(myJson) {

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
        
        tabla.AddRowCellText(row, 5,
        '<ul class="table-controls">'+
        '<li><a onclick="VerPDF('+obj[j].id+');" class="btn tip" title="Ver Factura"><i class="icon-eye-open"></i></a> </li>'+
        '<li> <a onclick="UpdateFact('+obj[j].id+');" class="btn tip" title="Editar factura"> <i class="icon-pencil"> </i> </a></li>'+ 
        '<li><a onclick="SendEmailFact('+obj[j].id+');" class="btn tip" title="Enviar por e-Mail"> <i class="icon-envelope-alt"> </i> </a></li></ul>');
       

    }
    
    obj=null;

}


//
// 
//
function VerPDF(idFact)
{
    

    window.location.href = 'pdfServletProforma.servlet?xID='+idFact;
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
function UpdateFact(idFact)
{

    window.location.href = 'newFacturaProforma.jsp?xIDFactura='+idFact;
}

//
// Enviar un correo
//
function SendEmailFact(idFact)
{
    
    // SendMailFact
    CallRemote('AjaxServlet.servlet', 'accion=SendMailFactProforma&xIDFact='+idFact);
    
}

