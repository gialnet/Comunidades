

/**
 * 
 * @returns {Conectar}
 */
function DatosFormaJuridica()
{
    //alert(Nombre);
    var url='AjaxServlet.servlet';
    var dataToSend='accion=ListaFormasJuridicas';
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    
    conn.pageRequest.onreadystatechange = function() { LeerListaFormasJuridicas(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    
    return conn;
}

function LeerListaFormasJuridicas(pageRequest) {


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
                CrearSelectFormasJuridicas(pageRequest.responseText);
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
function CrearSelectFormasJuridicas(myJson)
{
    
     var obj = JSON.parse(myJson);
     //alert(obj.length);
     for (j = 0; j <= (obj.length - 1); j++)
    {
                 
        $('#listaFormaJuridica').append($('<option>', { 
            value: obj[j].id,
            text : obj[j].forma_juridica,
            forma_juridica : obj[j].forma_juridica
    }));
    }
    
    var xProv = document.getElementById('xIDFormaJuridica').value;
    if( xProv.length>0 )
        setFormasJuridicasIndex(xProv);
}

/**
 * Poner el indice de un select de proveedores para las modificaciones de facturas
 * @param {type} xProv
 * @returns {undefined}
 */
function setFormasJuridicasIndex(xProv)
{

    $('#listaFormaJuridica').select2('val',xProv);

}

function CheckValues()
{
    // comprobar que los valores de trimestre estan en el rango 1-4
    var xTri = document.getElementById('xTrimestre').value;
    
    if (xTri==='1' || xTri==='2' || xTri==='3' || xTri==='4')
        return true;
    else
        {
            alert('valores posibles 1,2,3,4');
            return false;
        }
}