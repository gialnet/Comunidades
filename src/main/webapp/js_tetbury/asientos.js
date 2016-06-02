/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* **********************************************************************************************************************

                    conta-BrowseAsientos.jsp vista general de asientos

*************************************************************************************************************************/
function LeerAsientos(xYear)
{
    var pag=window.pagina;
    var tama=window.pagsize;
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=ListaAsientos&xYear='+xYear+'&pagina='+pag +'&size='+tama;
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    
    conn.pageRequest.onreadystatechange = function() { ListaAsientos(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    //alert('despues del envio');
    //conn.NextPage('accion=ListaCuentasSaldos&xYear=2013');
    //conn.PrevPage('accion=ListaCuentasSaldos&xYear=2013');
    //var vJSON=conn.pageRequest.responseText;
    return conn;
}




function LeerAsientosByConcepto(xYear)
{
    var pag=window.pagina;
    var tama=window.pagsize;
    
    var xConcepto=document.getElementById("xConcepto").value;
   
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=ListaAsientosConcepto&xYear='+xYear+'&pagina='+pag +'&size='+tama+'&xConcepto='+xConcepto;
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    
    conn.pageRequest.onreadystatechange = function() { ListaAsientos(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    //alert('despues del envio');
    //conn.NextPage('accion=ListaCuentasSaldos&xYear=2013');
    //conn.PrevPage('accion=ListaCuentasSaldos&xYear=2013');
    //var vJSON=conn.pageRequest.responseText;
    return conn;
}


/**
 * Recibe la respuesta del servidor
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaAsientos(pageRequest) {


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
                CrearTablaTuplasAsientos(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}


/**
 * Leer el JSON on las tuplas de TuplasCuentasSaldos
 * @param {type} myJson
 * @returns {undefined}
 */
function CrearTablaTuplasAsientos(myJson)
{

    var tabla = new grid("oTabla");
    var j = 0;

    var obj = JSON.parse(myJson);

    // borrar las tuplas de consultas anteriores
    deleteLastRow("oTabla");
    
    //alert(obj.length);
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

       

        //tabla.AddRowCellText(row, 0, obj[j].id);
        var celda = tabla.AddRowCellText(row, 0, obj[j].id);
        celda.setAttribute('hidden', 'true'); // ocultar la columna ID
        tabla.AddRowCellText(row, 1, 
        '<div id="xTabla'+(j+1)+'">'+
        obj[j].concepto +'<div  class="number"><a  onclick="ToogleAsientosMovimientoTabla('+(j+1)+');"></a></div></div>');
        tabla.AddRowCellNumber(row, 2, obj[j].fecha);
        tabla.AddRowCellNumber(row, 3, obj[j].periodo);
        tabla.AddRowCellText(row, 4,           
           '<ul class="table-controls"><li ><a  onclick="VerDiarioApunte('+(j+1)+');"  class="btn tip" title="Editar asiento"> <i class="icon-refresh"> </i> </a></li></ul>');
    
           AsientosMovimientoTabla(j+1);
    }
    obj=null;


}

/* **********************************************************************************************************************

                    AsientosMovimiento (*)

*************************************************************************************************************************/

/**
 * Crear una tabla que muestra el detalle de un apunte en el diario de operaciones
 * @param {type} numFila
 * @returns {Conectar}
 */
function AsientosMovimientoTabla(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];    
    var xIDAsiento=oCelda.innerHTML;
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=AsientosMovimiento&xIdAsiento='+xIDAsiento;
    //alert('dataToSend'+dataToSend);
    var conn2 = new Conectar(url, dataToSend);
    
    conn2.pageRequest.onreadystatechange = function() { ListaMovimientoTabla(conn2.pageRequest,numFila); };
    //alert('onreadystatechange');
    conn2.Enviar();
    
    return conn2;
}

/**
 * Mostrar y ocultar la tabla de detalle
 * @param {type} numFila
 * @returns {undefined}
 */
function ToogleAsientosMovimientoTabla(numFila)
{
   var visible = document.getElementById('xDiarioTabla'+numFila).style.display;
   
   if(visible === 'none')
       document.getElementById('xDiarioTabla'+numFila).style.display='';
   else
       document.getElementById('xDiarioTabla'+numFila).style.display='none';
}


/**
 * Recibe la respuesta del servidor
 * @param {type} pageRequest
 * @param {type} numFila
 * @returns {unresolved}
 */
function ListaMovimientoTabla(pageRequest,numFila) {


    if (pageRequest.readyState === 4)
    {
        if (pageRequest.status === 200)
        {
            // Solo descomentar para depuración
            //alert(pageRequest.responseText);
            if (pageRequest.responseText === 'Error')
                alert(pageRequest.responseText+'->ListaMovimiento');
            else
            {
                CrearTablaTuplasDiarioTabla(pageRequest.responseText,numFila);
                //return pageRequest.responseText;
            }
        }
    }
    else
        return;
}


/**
 * 
 * @param {type} myJson (*)
 * @param {type} numFila
 * @returns {undefined}
 */
function CrearTablaTuplasDiarioTabla(myJson,numFila)
{
    
  
    
    var cad = '<br/><br/><div class="table-overflow"><table class="table" id="xDiarioTabla'+numFila+'" style="display:none;">'+
        '<thead>'+
        '<tr><td><a class="item-title" title="" href="#">Cuenta</a></td><td>'+
        '<a class="item-title" title="" href="#">Concepto</a></td><td><a class="item-title" title=""'+
        ' href="#">Debe</a></td><td><a class="item-title" title="" href="#">Haber</a></td></tr></thead>'+
        '</table></div>';
    var celda;
    var row;
    
    //alert(cad);
   $('#xTabla'+numFila).append(cad);
    
    //$('#xTabla'+numFila).append('hola');

    var tabla = new grid("xDiarioTabla"+numFila);
    var j = 0;

    var obj = JSON.parse(myJson);

    // borrar las tuplas de consultas anteriores
    deleteLastRow("xDiarioTabla"+numFila);
    
    //alert(obj.length);
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        row = tabla.AddRowTable(j + 1);

        celda = tabla.AddRowCellText(row, 0, obj[j].id);
        celda.setAttribute('hidden', 'true');
        tabla.AddRowCellText(row, 1, obj[j].cuenta);
        tabla.AddRowCellText(row, 2, obj[j].concepto);
        if (obj[j].debe_haber==='D')
            {
                tabla.AddRowCellNumber(row, 3, obj[j].LocaleImporte);
                tabla.AddRowCellNumber(row, 4, '');
            }
        else
            {
                tabla.AddRowCellNumber(row, 3, '');
                tabla.AddRowCellNumber(row, 4, obj[j].LocaleImporte);
            }
        

    }
    
    obj=null; 
    //$('div#xTabla'+numFila).append('<ul id="xDiarioTabla'+numFila+'" class="plus-list" style="display:none;"><li>Cuenta</li><li>Concepto</li><li>Debe</li><li>Haber</li></ul>');
    

/**
 * 
 *  <table class="table table-striped table-bordered">
		                   
		                    <tbody>
                                        <tr>
		                            <td>Ventas</td>
                                            <td> </td>
                                            <td style="text-align: right; color: blue; font-size: large;"><%= datospanel.getsSumaVentas() %></td>
		                            
		                        </tr>
 */
}


/**
 * Lanza el evento para ver el detalle de un asiento del diario
 * @param {integer} numFila
 * @returns {@exp;oCelda@pro;innerHTML}
 */
function VerDiarioApunte(numFila)
{

    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    //document.getElementById('xTablaAsiento').style.visibility = 'visible'; //'hidden'
    document.getElementById('xIDAsiento').value=oCelda.innerHTML;
    //alert(oCelda.innerHTML);
    //AsientosMovimiento();
    
    window.location.href = 'conta-NewAsiento.jsp?xIDAsiento='+oCelda.innerHTML;
    
    
    
    return oCelda.innerHTML;
}







/* ****************************************
 *              AsientosMovimiento
******************************************* */
function AsientosMovimiento()
{
    var xIDAsiento=document.getElementById('xIDAsiento').value;
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=AsientosMovimiento&xIdAsiento='+xIDAsiento;
    //alert('dataToSend'+dataToSend);
    var conn2 = new Conectar(url, dataToSend);
    
    conn2.pageRequest.onreadystatechange = function() { ListaMovimiento(conn2.pageRequest); };
    //alert('onreadystatechange');
    conn2.Enviar();
    //alert('despues del envio');
    return conn2;
}

/**
 * Recibe la respuesta del servidor
 * @param {HTTP request} pageRequest 
 * @returns {unresolved}
 */
function ListaMovimiento(pageRequest) {


    if (pageRequest.readyState === 4)
    {
        if (pageRequest.status === 200)
        {
            // Solo descomentar para depuración
            //alert(pageRequest.responseText);
            if (pageRequest.responseText === 'Error')
                alert(pageRequest.responseText+'->ListaMovimiento');
            else
            {
                CrearTablaTuplasDiario(pageRequest.responseText);
                //return pageRequest.responseText;
            }
        }
    }
    else
        return;
}

/**
 * Crear la tabla en el objeto DOM de la pagina HTML
 * @param {json} myJson
 * @returns {undefined}
 */
function CrearTablaTuplasDiario(myJson)
{

    var tabla = new grid("oDiario");
    var j = 0;

    var obj = JSON.parse(myJson);

    // borrar las tuplas de consultas anteriores
    deleteLastRow("oDiario");
    
    alert(myJson);
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

        tabla.AddRowCellText(row, 0, obj[j].cuenta);
        tabla.AddRowCellText(row, 1, obj[j].concepto);
        if (obj[j].debe_haber==='D')
            {
                tabla.AddRowCellNumber(row, 2, obj[j].importe);
                tabla.AddRowCellNumber(row, 3, '');
            }
        else
            {
                tabla.AddRowCellNumber(row, 2, '');
                tabla.AddRowCellNumber(row, 3, obj[j].importe);
            }
        

    }
    
    obj=null;


}


function paginaAnterior(xYear,conn){
    
     var xConcepto=document.getElementById("xConcepto").value;
     if(xConcepto.length>0)
         conn.PrevPage('xConcepto='+xConcepto+'&accion=ListaAsientosConcepto&xYear='+xYear,conn);
     else
         conn.PrevPage('accion=ListaAsientos&xYear='+xYear,conn);
}

function paginaSiguiente(xYear,conn){
    var xConcepto=document.getElementById("xConcepto").value;
     if(xConcepto.length>0)
         conn.NextPage('xConcepto='+xConcepto+'&accion=ListaAsientosConcepto&xYear='+xYear,conn); 
         else
          conn.NextPage('accion=ListaAsientos&xYear='+xYear,conn); 
}
