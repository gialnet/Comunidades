/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



/**
 * Lista de recibos de una póliza
 * @returns {Conectar}
 */

function LeerTickets()
{

    var pag=window.pagina;
    var tama=window.pagsize;
    var xIDPoliza=document.getElementById("xIDPoliza").value;
    
    
    var url='AjaxTickets.servlet';
    var dataToSend='accion=TicketsByEstanque&pagina='+pag +'&size='+tama+'&xIDPoliza='+xIDPoliza;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaRecibos(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaRecibos(pageRequest) {


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
                CrearTablaRecibos(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}

/**
 * 
 * @param {type} myJson
 * @returns {undefined}
 */
function CrearTablaRecibos(myJson)
{

    var tabla = new grid("oTabla");
    var j = 0;
    var myfila=window.fila;

    var obj = JSON.parse(myJson);

    // borrar las tuplas de consultas anteriores
    deleteLastRow("oTabla");
    
    //alert(myJson);
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].n_recibo);
        var row = tabla.AddRowTable(j + 1);

        //tabla.AddRowCellText(row, 0, obj[j].id);
        var celda = tabla.AddRowCellText(row, 0, obj[j].id);
        celda.setAttribute('hidden', 'true'); // ocultar la columna ID
        tabla.AddRowCellText(row, 1, obj[j].n_recibo );
        tabla.AddRowCellText(row, 2, obj[j].estado_cliente );
        tabla.AddRowCellText(row, 3, obj[j].efecto );
        tabla.AddRowCellText(row, 4, obj[j].total_recibo );
        
        tabla.AddRowCellText(row, 5,
        '<ul class="table-controls">'+
        '<li><a onclick="ShowRecibo('+(j+1)+');" class="btn tip" title="Ver Recibo"><i class="icon-eye-open"></i></a> </li>'+
        '</ul>');
    
        window.fila++;
        myfila=window.fila;
    }
    obj=null;


}


/**
 * Mostrar los datos de un recibo
 * @param {type} numFila
 * @returns {undefined}
 */
function ShowRecibo(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    
    window.location.href = 'ShowReciboCliente.jsp?xIDRecibo='+oCelda.innerHTML;
}

