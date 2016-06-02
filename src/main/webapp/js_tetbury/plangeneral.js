/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var accion = 'accion=ListaPlanGeneral';

// conta-BrowseCuentasContables.jsp
function LeerPlanGeneral()
{
    var pag=window.pagina;
    var tama=window.pagsize;
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=ListaPlanGeneral&pagina='+pag +'&size='+tama;
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    
    conn.pageRequest.onreadystatechange = function() { ListaCuentas(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    //alert('despues del envio');
    return conn;
}

/**
 * Un determinado filtro de cuentas
 * @returns {undefined}
 */
function LeerPlanByCuenta()
{
     var xConcepto=document.getElementById("xConcepto").value;
     /*
     //alert(xConcepto)
    if(xConcepto.length>0){
        LeerPlanByCuentaAndConcepto();
        return;
    }*/
   // alert('pasa');
    window.accion = 'accion=CuentaPlanGeneral';
    var pag=window.pagina;
    var tama=window.pagsize;
    var xCuenta=document.getElementById("xCuenta").value;
    
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=CuentaPlanGeneral&pagina='+pag +'&size='+tama+'&xCuenta='+xCuenta;
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    conn.pageRequest.onreadystatechange = function() { ListaCuentas(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    //alert('despues del envio');
    //conn.NextPage('accion=ListaCuentasSaldos&xYear=2013');
    //conn.PrevPage('accion=ListaCuentasSaldos&xYear=2013');
    //var vJSON=conn.pageRequest.responseText;
    return conn;
    //CallRemote('AjaxContaServlet', 'accion=ListaCuentasSaldos&xYear='+xYear+'&xCuenta='+xCuenta+'&pagina='+pag +'&size='+tama);
    //LeerSaldoCuenta();
}

/**
 * Un determinado filtro de cuentas
 * @returns {undefined}
 */
function LeerPlanByCuentaAndConcepto()
{
   // alert('pasa');
    window.accion = 'accion=CuentaAndConceptoPlanGeneral';
    var pag=window.pagina;
    var tama=window.pagsize;
    var xCuenta=document.getElementById("xCuenta").value;
   var xConcepto=document.getElementById("xConcepto").value;
    var url='AjaxContaServlet';
    var dataToSend='accion=CuentaAndConceptoPlanGeneral&pagina='+pag +'&size='+tama+'&xCuenta='+xCuenta+'&xConcepto='+xConcepto;
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    conn.pageRequest.onreadystatechange = function() { ListaCuentas(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    //alert('despues del envio');
    //conn.NextPage('accion=ListaCuentasSaldos&xYear=2013');
    //conn.PrevPage('accion=ListaCuentasSaldos&xYear=2013');
    //var vJSON=conn.pageRequest.responseText;
    return conn;
    //CallRemote('AjaxContaServlet', 'accion=ListaCuentasSaldos&xYear='+xYear+'&xCuenta='+xCuenta+'&pagina='+pag +'&size='+tama);
    //LeerSaldoCuenta();
}
/**
 * Un determinado filtro de cuentas
 * @returns {undefined}
 */
function LeerPlanByConcepto()
{
     var xCuenta=document.getElementById("xCuenta").value;
    if(xCuenta.length>0){
        LeerPlanByCuentaAndConcepto();
        return;
    }
   // alert('pasa');
   window.accion = 'accion=ConceptoPlanGeneral';
     var pag=window.pagina;
    var tama=window.pagsize;
    var xConcepto=document.getElementById("xConcepto").value;
    
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=ConceptoPlanGeneral&pagina='+pag +'&size='+tama+'&xConcepto='+xConcepto;
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    conn.pageRequest.onreadystatechange = function() { ListaCuentas(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    //alert('despues del envio');
    //conn.NextPage('accion=ListaCuentasSaldos&xYear=2013');
    //conn.PrevPage('accion=ListaCuentasSaldos&xYear=2013');
    //var vJSON=conn.pageRequest.responseText;
    return conn;
    //CallRemote('AjaxContaServlet', 'accion=ListaCuentasSaldos&xYear='+xYear+'&xCuenta='+xCuenta+'&pagina='+pag +'&size='+tama);
    //LeerSaldoCuenta();
}



/**
 * Recibe la respuesta del servidor
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaCuentas(pageRequest) {


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
                CrearTablaTuplasCuentasPlan(pageRequest.responseText);
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
function CrearTablaTuplasCuentasPlan(myJson)
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
        tabla.AddRowCellText(row, 2,
               '<div onclick="HacerAlgo('+(j+1)+');"><a href="#" class="btn tip" title="Modificar datos"> <i class="icon-pencil"> </i> </a></div>');

    }
    
    obj=null;


}


function paginaSiguiente(){
      var xConcepto=document.getElementById("xConcepto").value;
       var xCuenta=document.getElementById("xCuenta").value;
      // alert('xCuenta='+xCuenta+'&xConcepto='+xConcepto+"&"+window.accion);
    conn.NextPage('xCuenta='+xCuenta+'&xConcepto='+xConcepto+"&"+window.accion,conn);
}

function paginaAnterior(){
      var xConcepto=document.getElementById("xConcepto").value;
       var xCuenta=document.getElementById("xCuenta").value;
    conn.PrevPage('xCuenta='+xCuenta+'&xConcepto='+xConcepto+"&"+window.accion,conn);
}