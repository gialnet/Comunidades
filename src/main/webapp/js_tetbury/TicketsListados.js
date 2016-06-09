

/**
 * Lista de tickets
 * @returns {Conectar}
 */

function TicketsListados()
{

    var pag=window.pagina;
    var tama=window.pagsize;
    var xDesde = document.getElementById('xDesde').value;
    var xHasta = document.getElementById('xHasta').value;
    
    
    var url='AjaxTickets.servlet';
    var dataToSend='accion=TicketsCuenta&xDesde='+xDesde+'&xHasta='+xHasta;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { TicketsCuenta(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function TicketsCuenta(pageRequest) {


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
                ContarLosTickets(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}


/**
 * 
 * @param {type} cuantos
 * @returns {undefined}
 */
function ContarLosTickets(cuantos)
{
    //var obj = JSON.parse(myJson);
    
    if (cuantos > 0)
        Imprimir();
    else
        {
            $('#collapseMensaje').collapse('show');
        }
}

function QuitarMensaje()
{
    $('#collapseMensaje').collapse('hide');
}


/**
 * 
 * @returns {undefined}
 */
function Imprimir()
{
    var xDesde = document.getElementById('xDesde').value;
    var xHasta = document.getElementById('xHasta').value;

    //alert('?xCodeCia='+xCode+'&xDesde='+xDesde+'&xHasta='+xHasta);

    window.location.href = 'ServletListadoTickets.servlet?xDesde='+xDesde+'&xHasta='+xHasta;
}
