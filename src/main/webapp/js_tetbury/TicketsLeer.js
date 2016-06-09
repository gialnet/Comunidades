

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
        tabla.AddRowCellText(row, 4, obj[j].fecha_buy );
        if (obj[j].pendiente==='S')
            tabla.AddRowCellText(row, 5, 'Pendiente' );
        else
            tabla.AddRowCellText(row, 5, 'Realizado' );
        
        tabla.AddRowCellText(row, 6, obj[j].observaciones);
    
        window.fila++;
        myfila=window.fila;
    }
    obj=null;


}

/**
 * 
 * @returns {Conectar}
 */
function ComprarTicket()
{
    var pag=window.pagina;
    var tama=window.pagsize;
    var xEstanque=document.getElementById("xEstanque").value;
    var xMinutos=document.getElementById("minutos").value;
    var minu;
    var url='AjaxTickets.servlet';
    var dataToSend;
    var message = document.getElementById("mensaje");
    message.innerHTML = "Los minutos NO se han escrito de forma correcta";
    
        minu=parseInt(xMinutos,10);
        if (isNaN(minu) && $('#llenado').is(':checked')===false)
            {
                $('#collapseExample').collapse('show');
                return;
            }
    
    if ( $('#llenado').is(':checked') )
        dataToSend='accion=ComprarTicketLlenado&pagina='+pag +'&size='+tama+'&xEstanque='+xEstanque;
    else
        dataToSend='accion=ComprarTicketMinutos&pagina='+pag +'&size='+tama+'&xEstanque='+xEstanque+'&xMinutos='+minu;
            
    var conn = new Conectar(url, dataToSend);
    conn.pageRequest.onreadystatechange = function() { RespCompraTicket(conn.pageRequest); };

    conn.Enviar();
    
    return conn;   
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function RespCompraTicket(pageRequest) {


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
                GoToMain();
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}

/**
 * 
 * @returns {undefined}
 */
function GoToMain()
{
    window.location.href = 'main.jsp';
}

/**
 * 
 * @returns {undefined}
 */
function GoToComprar()
{
    window.location.href = 'comprar.jsp';
}

function GoToListado()
{
    window.location.href = 'SetUpListados.jsp';
}

/**
 * 
 * @returns {undefined}
 */
function QuitarMensaje()
{
    $('#collapseExample').collapse('hide');
}