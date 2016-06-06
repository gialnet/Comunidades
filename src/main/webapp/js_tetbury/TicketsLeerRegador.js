

/**
 * Lista de tickets pendientes de riego
 * @returns {Conectar}
 */

function LeerTicketsPendientesRegador()
{

    var pag=window.pagina;
    var tama=window.pagsize;
    
    var url='AjaxRegador.servlet';
    var dataToSend='accion=getRiegosPendientesByPool&pagina='+pag +'&size='+tama;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaRiegosPendientes(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaRiegosPendientes(pageRequest) {


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
                CrearTablaRiegosPendientes(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}

function CrearTablaRiegosPendientes(myJson)
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
        tabla.AddRowCellText(row, 1, obj[j].estanque );
        
        if (obj[j].tipo==='L')
            tabla.AddRowCellText(row, 2, 'LLenar' );
        else
            tabla.AddRowCellText(row, 2, obj[j].tipo );
        
        if (obj[j].tipo==='L')
            tabla.AddRowCellText(row, 3, 'X' );
        else
            tabla.AddRowCellText(row, 3, obj[j].minutos_saldo );
        
        tabla.AddRowCellText(row, 4, obj[j].nombre );
    
        window.fila++;
        myfila=window.fila;
    }
    obj=null;


}



/**
 * 
 * @returns {Conectar}
 */
function LeerTicketsRegador()
{

    var pag=window.pagina;
    var tama=window.pagsize;
    
    var url='AjaxRegador.servlet';
    var dataToSend='accion=getListaRiegosPendientes&pagina='+pag +'&size='+tama;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaRiegos(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaRiegos(pageRequest) {


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
                CrearTablaRiegos(pageRequest.responseText);
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
function CrearTablaRiegos(myJson)
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
        tabla.AddRowCellText(row, 1, obj[j].estanque );
        
        if (obj[j].tipo==='L')
            tabla.AddRowCellText(row, 2, 'LLenar' );
        else
            tabla.AddRowCellText(row, 2, obj[j].tipo );
        
        if (obj[j].tipo==='L')
            tabla.AddRowCellText(row, 3, 'X' );
        else
            tabla.AddRowCellText(row, 3, obj[j].minutos_saldo );
        
        tabla.AddRowCellText(row, 4, obj[j].nombre );
    
        window.fila++;
        myfila=window.fila;
    }
    obj=null;


}

/**
 * 
 * @returns {undefined}
 */
function QuitarMensaje()
{
    $('#collapseExample').collapse('hide');
}