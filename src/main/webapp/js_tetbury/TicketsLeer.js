

/**
 * Lista de tickets
 * @returns {Conectar}
 */

function LeerTickets()
{

    var pag=window.pagina;
    var tama=window.pagsize;
    var xEstanque=document.getElementById("xEstanque").value;
    
    
    var url='AjaxTickets.servlet';
    var dataToSend='accion=TicketsByEstanque&pagina='+pag +'&size='+tama+'&xEstanque='+xEstanque;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaTickets(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaTickets(pageRequest) {


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
                CrearTablaTickets(pageRequest.responseText);
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
function CrearTablaTickets(myJson)
{

    var tabla = new grid("oTabla");
    var j = 0;
    var myfila=window.fila;

    //alert(myJson);
    var obj = JSON.parse(myJson);

    // borrar las tuplas de consultas anteriores
    deleteLastRow("oTabla");
    
    
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].n_recibo);
        var row = tabla.AddRowTable(j + 1);

        //tabla.AddRowCellText(row, 0, obj[j].id);
        var celda = tabla.AddRowCellText(row, 0, obj[j].id);
        celda.setAttribute('hidden', 'true'); // ocultar la columna ID
        tabla.AddRowCellText(row, 1, obj[j].nticket );
        tabla.AddRowCellText(row, 2, obj[j].canal_compra );
        tabla.AddRowCellText(row, 3, obj[j].minutos_comprados );
        tabla.AddRowCellText(row, 4, obj[j].fecha );
        tabla.AddRowCellText(row, 5, obj[j].observaciones);
    
        window.fila++;
        myfila=window.fila;
    }
    obj=null;


}
