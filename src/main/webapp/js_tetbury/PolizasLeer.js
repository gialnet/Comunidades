/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



/**
 * Lista de polizas
 * @returns {Conectar}
 */

function LeerPolizas()
{

    var pag=window.pagina;
    var tama=window.pagsize;
    
    
    var url='AjaxPolizas.servlet';
    var dataToSend='accion=PolizasByID&pagina='+pag +'&size='+tama;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaPolizas(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaPolizas(pageRequest) {


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
                CrearTablaPolizas(pageRequest.responseText);
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
function CrearTablaPolizas(myJson)
{

    var tabla = new grid("oTabla");
    var j = 0;
    var myfila=window.fila;

    var obj = JSON.parse(myJson);

    // borrar las tuplas de consultas anteriores
    deleteLastRow("oTabla");
    
    //alert(myJson);
    //alert(obj.length - 1);
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

        //tabla.AddRowCellText(row, 0, obj[j].id);
        var celda = tabla.AddRowCellText(row, 0, obj[j].id);
        celda.setAttribute('hidden', 'true'); // ocultar la columna ID
        tabla.AddRowCellText(row, 1, obj[j].nif );
        tabla.AddRowCellText(row, 2, obj[j].nombre );
        tabla.AddRowCellText(row, 3, obj[j].poliza );
        tabla.AddRowCellText(row, 4, obj[j].efecto );
        tabla.AddRowCellText(row, 5, obj[j].riesgo_asegurado );
        
        tabla.AddRowCellText(row, 6,
        '<ul class="table-controls">'+
        '<li><a onclick="ShowPoliza('+(j+1)+');" class="btn tip" title="Ver Póliza"><i class="icon-eye-open"></i></a> </li>'+
        '<li><a onclick="ShowListaRecibos('+(j+1)+');" class="btn tip" title="Ver Recibos"><i class="icon-money"></i></a> </li>'+
        '<li><a onclick="ShowListaSiniestros('+(j+1)+');" class="btn tip" title="Ver Siniestros"><i class="icon-bell"></i></a> </li>'+
        '</ul>');
    
        window.fila++;
        myfila=window.fila;
    }
    obj=null;


}

/*
 * Leer lista de polizas por riesgo
 * 
 */
function LeerPolizasByRiesgo()
{
    var pag=window.pagina;
    var tama=window.pagsize;
    var xRiesgo=document.getElementById("xRiesgo").value;
    
    
    var url='AjaxPolizas.servlet';
    var dataToSend='accion=PolizasByRiesgo&pagina='+pag +'&size='+tama+'&xRiesgo='+xRiesgo;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaPolizas(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/*
 * Leer lista de polizas por riesgo
 * 
 */
function LeerPolizasByBuscar()
{
    var pag=window.pagina;
    var tama=window.pagsize;
    var xBuscar=document.getElementById("xBuscar").value;
    
    
    var url='AjaxPolizas.servlet';
    var dataToSend='accion=PolizasByBuscar&pagina='+pag +'&size='+tama+'&xBuscar='+xBuscar;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaPolizas(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

//
// Mostrar los datos de una póliza
//
function ShowPoliza(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    
    window.location.href = 'ShowPoliza.jsp?xIDPoliza='+oCelda.innerHTML;
}

/**
 * 
 * @param {type} numFila
 * @returns {undefined}
 */
function ShowListaSiniestros(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    
    window.location.href = 'BrowseSiniestrosPoliza.jsp?xIDPoliza='+oCelda.innerHTML;
}

/**
 * 
 * @param {type} numFila
 * @returns {undefined}
 */
function ShowListaRecibos(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    
    window.location.href = 'BrowseRecibosClientes.jsp?xIDPoliza='+oCelda.innerHTML;
}

/*
 * Leer lista de polizas de un NIF
 * 
 */
function LeerPolizasByNIF()
{
    var pag=window.pagina;
    var tama=window.pagsize;
    
    var url='AjaxPolizas.servlet';
    var dataToSend='accion=PolizasByNIF&pagina='+pag +'&size='+tama;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaPolizas(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}