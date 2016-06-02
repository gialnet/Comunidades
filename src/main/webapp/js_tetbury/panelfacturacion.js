
/**
 * Actualizar todo facturación
 * @returns {Conectar}
 */
function ActualizarTodo()
{
    
    //window.location.href = 'ServletActualizarBalance?xYear='+xYear+'&xUser='+xUser;
    
    var url='ServletActualizarFacturacion.servlet';
    var dataToSend='';
    
    //alert(dataToSend);
    
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { RefrescarVistaFacturacion(conn.pageRequest); };

    conn.Enviar();
    
    return conn;   
    
}

/**
 * Para la imagen animada de realizando proceso
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function RefrescarVistaFacturacion(pageRequest) {


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
                PararAnimacionFacturacion();
                //return pageRequest.responseText;
            }


        }
    }
    else
        return;
}

/**
 * Alerta de proceso concluido
 * @returns {undefined}
 */
function PararAnimacionFacturacion()
{
    alert('Proceso concluido, voy a refrescar los datos de la página');
    window.location.href = 'PanelFacturacion.jsp';
}