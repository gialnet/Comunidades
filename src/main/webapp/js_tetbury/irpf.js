
/**
 * 
 * @returns {Conectar}
 */
function LeerIRPF()
{
    var pag=window.pagina;
    var tama=window.pagsize;
    var url='AjaxServlet.servlet';

    //alert(xCuenta);

    var dataToSend='accion=ListaHaciendaIRPF&pagina='+pag+'&size='+tama;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaIRPF(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaIRPF(pageRequest) {


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
                CrearTablaCrearTablaIRPF(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}

//
// Crear tabla de IRPF
//
function CrearTablaIRPF(myJson) {

    var tabla = new grid("oTabla");
    var j = 0;

    var obj = JSON.parse(myJson);
    deleteLastRow("oTabla");
    //alert(obj.length);
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

        var celda = tabla.AddRowCellText(row, 0, obj[j].id);
        tabla.AddRowCellText(row, 1, obj[j].Naturaleza);
        tabla.AddRowCellText(row, 2, obj[j].NRC);
        tabla.AddRowCellNumber(row, 3, obj[j].LocaleImporte)
        tabla.AddRowCellText(row, 4, obj[j].year_fiscal);
        tabla.AddRowCellText(row, 5, obj[j].periodo);
        tabla.AddRowCellText(row, 6,
        '<ul class="table-controls">'+
        '<li><a onclick="IngresoIRPF('+(j+1)+');" class="btn tip" title="Pagar IRPF"> <i class="icon-money"> </i> </a></li>'+
        '<li><a onclick="AnularPagoIRPF('+(j+1)+');" class="btn tip" title="Anular pago IRPF"> <i class="icon-pencil"> </i> </a></li></ul>');
       
    }
    
    obj=null;

}

/**
 * Realizar el pago del IRPF
 * @param {type} numFila
 * @returns {undefined}
 */
function IngresoIRPF(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    window.location.href = 'IngresoTributo.jsp?xIDTributo='+oCelda.innerHTML+'&xCall=BrowseIVA.jsp';
}

/**
 * Anular el pago
 * @param {type} numFila
 * @returns {undefined}
 */
function AnularPagoIRPF(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    var Naturaleza = document.getElementById(xID).cells[1];
    var xNRC = document.getElementById(xID).cells[2];
    
    window.location.href = 'DeshacerIngresoTributo.jsp?xIDTributo='+oCelda.innerHTML+
            '&xCall=BrowseIVA.jsp&Naturaleza='+Naturaleza.innerHTML+
            '&xNRC='+xNRC.innerHTML;
}
