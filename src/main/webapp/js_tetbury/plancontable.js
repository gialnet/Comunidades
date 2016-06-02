/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var accion = 'ListaCuentasSaldos';
/**
 * Todas las cuentas
 * @returns {undefined}
 */
function LeerCuentasSaldosTodos(xYear)
{
     var pag=window.pagina;
    var tama=window.pagsize;
    CallRemote('AjaxServlet.servlet', 'accion=ListaCuentasSaldos&xYear='+xYear+'&pagina='+pag +'&size='+tama);
    //LeerSaldoCuenta();
    
}

// conta-BrowseCuentasContables.jsp
function LeerCuentasContables(xYear)
{
    accion = 'ListaCuentasSaldos';
    var pag=window.pagina;
    var tama=window.pagsize;
    var xCuenta=document.getElementById("xCuenta").value;
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=ListaCuentasSaldos&xYear='+xYear+'&pagina='+pag +'&size='+tama+'&xCuenta='+xCuenta;
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    
    conn.pageRequest.onreadystatechange = function() { ListaCuentasSaldos(conn.pageRequest); };
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
function ListaCuentasSaldos(pageRequest) {


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
                CrearTablaTuplasCuentasSaldos(pageRequest.responseText);
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
function CrearTablaTuplasCuentasSaldos(myJson)
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

        tabla.AddRowCellText(row, 0, obj[j].cuenta);
        tabla.AddRowCellText(row, 1, obj[j].concepto);
        tabla.AddRowCellNumber(row, 2, obj[j].debe);
        tabla.AddRowCellNumber(row, 3, obj[j].haber);
        tabla.AddRowCellNumber(row, 4, obj[j].saldo);
        
        tabla.AddRowCellText(row, 5,
               '<div onclick="EditarCuenta('+(j+1)+');"><a href="#" class="btn tip" title="Editar cuenta"> <i class="icon-pencil"> </i> </a></div>');

    }
    
    obj=null;


}

function EditarCuenta(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    // http://localhost:8080/FacturaRedmoon/
    window.location.href = 'conta-AddCuentaContable.jsp?xIDCuenta='+oCelda.innerHTML;
}


/**
 * Un determinado filtro de cuentas
 * @returns {undefined}
 */
function LeerCuentasContablesByCuenta(xYear)
{
     var pag=window.pagina;
    var tama=window.pagsize;

    var xCuenta=document.getElementById("xCuenta").value;
     var xConcepto=document.getElementById("xConcepto").value;
        var paramConcepto = '';
    if(xConcepto.length>0)
        paramConcepto = '&xConcepto='+xConcepto;
    
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=ListaCuentasSaldosByCuenta&xYear='+xYear+'&pagina='+pag +'&size='+tama+'&xCuenta='+xCuenta+paramConcepto;
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    conn.pageRequest.onreadystatechange = function() { ListaCuentasSaldos(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    
    return conn;

    //LeerSaldoCuenta();
}


/**
 * Un determinado filtro de cuentas
 * @returns {undefined}
 */
function LeerCuentasContablesByConcepto(xYear)
{
     var pag=window.pagina;
    var tama=window.pagsize;
    var xCuenta=document.getElementById("xCuenta").value;
    var xConcepto=document.getElementById("xConcepto").value;
    
        var paramCuenta = '';
       
    if(xCuenta.length>0)
        paramCuenta = '&xCuenta='+xCuenta;
    
     //alert(xCuenta+"param:"+paramCuenta);
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=ListaCuentasSaldosByConcepto&xYear='+xYear+'&pagina='+pag +'&size='+tama+'&xConcepto='+xConcepto+paramCuenta;
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    conn.pageRequest.onreadystatechange = function() { ListaCuentasSaldos(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    //alert('despues del envio');
    
    return conn;
    
}


function paginaSiguientePlan(xYear){
    
      var xConcepto=document.getElementById("xConcepto").value;
       var xCuenta=document.getElementById("xCuenta").value;
       //alert(xConcepto+xCuenta);
       var dataToSend='';
        if(xCuenta.length>0 && xConcepto.length>0){
            //alert('cuenta y concepto');
            dataToSend='accion=ListaCuentasSaldosByConcepto&xYear='+xYear+'&xConcepto='+xConcepto+'&xCuenta='+xCuenta;
        }
        else if(xCuenta.length>0){
             //alert('cuenta ');
            dataToSend='accion=ListaCuentasSaldos&xYear='+xYear+'&xCuenta='+xCuenta;
             //alert(dataToSend);
        }
        else if(xConcepto.length>0){
         //alert(' concepto');
            dataToSend='accion=ListaCuentasSaldosByConcepto&xYear='+xYear+'&xConcepto='+xConcepto;
        }
        else{
             //alert('ninguno');
             dataToSend='accion=ListaCuentasSaldos&xYear='+xYear;
        }
        //alert(dataToSend);
      // alert('xCuenta='+xCuenta+'&xConcepto='+xConcepto+"&"+window.accion);
    conn.NextPage(dataToSend,conn);
}

function paginaAnteriorPlan(xYear){
    
     var xConcepto=document.getElementById("xConcepto").value;
       var xCuenta=document.getElementById("xCuenta").value;
       var dataToSend='';
        if(xCuenta.length>0 && xConcepto.length>0){
            alert('cuenta y concepto');
            dataToSend='accion=ListaCuentasSaldosByConcepto&xYear='+xYear+'&xConcepto='+xConcepto+'&xCuenta='+xCuenta;
        }
        else if(xCuenta.length>0){
             alert('cuenta');
            dataToSend='accion=ListaCuentasSaldos&xYear='+xYear+'&xCuenta='+xCuenta;
        }
        else if(xConcepto.length>0){
            dataToSend='accion=ListaCuentasSaldosByConcepto&xYear='+xYear+'&xConcepto='+xConcepto;
        }
        else{
             dataToSend='accion=ListaCuentasSaldos&xYear='+xYear;
        }
        //alert(dataToSend);
    conn.PrevPage(dataToSend,conn);
}