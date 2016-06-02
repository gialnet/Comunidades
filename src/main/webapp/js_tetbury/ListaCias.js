/**
 * 
 * @returns {Conectar}
 */
function LeerCias()
{

    var pag=window.pagina;
    var tama=window.pagsize;
    
    var url='AjaxCias.servlet';
    var dataToSend='accion=ListaCias';
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaCias(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaCias(pageRequest) {


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
                LeerDatosCias(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}
/**
 * Llenar una lista de opciones con nombres
 * @param {type} myJson
 * @returns {undefined}
 */
function LeerDatosCias(myJson)
{
    

    var obj = JSON.parse(myJson);
        
    //alert(myJson);

   for (j = 0; j <= (obj.length - 1); j++)
    {
        
        $('#listaCias').append($('<option>', { 
            value: obj[j].code,
            text : obj[j].nombre
    }));
    }
    
    /*
    var xCliente = document.getElementById('xIDCliente').value;
    if( xCliente.length>0 )
        setClienteIndex(xCliente); */
    
}


/**
 * Ventana desplegable para buscar por nombre
 * @returns {undefined}
 */
function seleccionarCia()
{
    //alert($("#listaCias option:selected").val());
    document.getElementById("xCode").value = $("#listaCias option:selected").val();
    
}



/**
 * Poner el indice de un select de clientes para las modificaciones de facturas
 * @param {type} xCliente
 * @returns {undefined}
 */
function setClienteIndex(xCliente)
{

    $('#listaClientes').select2('val',xCliente);

}

//
// invocar el servlet que muestra el PDF
//
function VerPDF()
{
    var xCode = document.getElementById('xCode').value;
    var xDesde = document.getElementById('xDesde').value;
    var xHasta = document.getElementById('xHasta').value;
    
    //alert('?xCodeCia='+xCode+'&xDesde='+xDesde+'&xHasta='+xHasta);
    
    window.location.href = 'ServletpdfListadoPolizas.servlet?xCodeCia='+xCode+'&xDesde='+xDesde+'&xHasta='+xHasta;
}
