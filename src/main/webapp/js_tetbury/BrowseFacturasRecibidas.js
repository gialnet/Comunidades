





/**
 * Busqueda de clientes por nombre
 * @returns {undefined}
 */
function RecibidasByNombre(){
    
    var pag=1; 
    var tama=10; 
    var xNombre = document.getElementById('xNombre').value;
    
    var xConcepto = document.getElementById('xConcepto').value;
    var direccion = '';
    
    if(xNombre.length>0 && xConcepto.length>0){
        direccion='accion=recibidasByNombreAndConcepto&pagina='+pag +'&size='+tama+'&xNombre='+xNombre+'&xConcepto='+xConcepto;
    }
    else if(xNombre.length>0 && xConcepto.length===0)
        direccion='accion=recibidasByNombre&pagina='+pag +'&size='+tama+'&xNombre='+xNombre;
    else if(xNombre.length===0 && xConcepto.length>0)
        direccion='accion=recibidasByConcepto&pagina='+pag +'&size='+tama+'&xConcepto='+xConcepto;
    else
        direccion='accion=fact_recibidas'+'&pagina='+pag +'&size='+tama;
    //direccion='accion=recibidasByNombre&pagina='+pag +'&size='+tama+'&xNombre='+xNombre;
    //alert(direccion);
    CallRemote('AjaxServlet.servlet', direccion);
}

function RecibidasByConcepto(){
    
    var pag=1; 
    var tama=10; 
    var xNombre = document.getElementById('xNombre').value;
    
    var xConcepto = document.getElementById('xConcepto').value;
    var direccion = '';
    
    if(xNombre.length>0 && xConcepto.length>0){
        direccion='accion=recibidasByNombreAndConcepto&pagina='+pag +'&size='+tama+'&xNombre='+xNombre+'&xConcepto='+xConcepto;
    }
    else if(xNombre.length>0 && xConcepto.length===0)
        direccion='accion=recibidasByNombre&pagina='+pag +'&size='+tama+'&xNombre='+xNombre;
    else if(xNombre.length===0 && xConcepto>0)
        direccion='accion=recibidasByConcepto&pagina='+pag +'&size='+tama+'&xConcepto='+xConcepto;
    else
        direccion='accion=fact_recibidas'+'&pagina='+pag +'&size='+tama;
    //direccion='accion=recibidasByNombre&pagina='+pag +'&size='+tama+'&xNombre='+xNombre;
    //alert(direccion);
    CallRemote('AjaxServlet.servlet', direccion);
}


/**
 * 
 * @param {type} conn
 * @returns {undefined}
 */
function NextPageReci(conn)
{
    window.pagina++;
    var pag=window.pagina;
    var tama=window.pagsize;
    var xNombre = document.getElementById('xNombre').value;    
    var direccion='';
    
     if(xNombre.length>0){
       
        direccion='accion=recibidasByNombre&pagina='+pag +'&size='+tama+'&xNombre='+xNombre;
    }
    else
        direccion='accion=fact_recibidas'+'&pagina='+pag +'&size='+tama;
    
    
    
    document.getElementById("xPag").innerHTML=window.pagina;
    //alert(direccion);
    conn.NextPage(direccion, conn);
    
}

/**
 * 
 * @param {type} conn
 * @returns {undefined}
 */
function PrevPageReci(conn)
{
    
    window.pagina--;
    if (window.pagina <1)
        window.pagina=1;
    
    var pag=window.pagina;
    var tama=window.pagsize;
    
    var xNombre = document.getElementById('xNombre').value;    
    var direccion='';
    
    if(xNombre.length>0){
       
        direccion='accion=recibidasByNombre&pagina='+pag +'&size='+tama+'&xNombre='+xNombre;
    }
    else
        direccion='accion=fact_recibidas'+'&pagina='+pag +'&size='+tama;
    
    
    
    document.getElementById("xPag").innerHTML=window.pagina;
    
    conn.PrevPage(direccion, conn);
    //alert(direccion);
    
}
