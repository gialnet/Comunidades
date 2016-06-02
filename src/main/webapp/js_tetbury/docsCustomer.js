var selectLista = 0;
var oTable;
var idMoverCarpeta = 0;
var selCarpeta = 0;
var docCompartir = 0;
var sizePag=15;
var numPag=1;
var conn=null;
var connClientes=null;

$(document).ready(function() {
    LeerDocs(0);
    loadCarpetas();
    LeerClientes();
   
//Añadir una nueva carpeta
    $("#btnNuevaCarpeta").click(function(e) {
        e.preventDefault();
         bootbox.prompt("Crear nueva carpeta:", "Cancelar", "Crear Carpeta", function(result)
         {
         
        if (result != null) {
         
        
         //CallRemote('php/redmoon/nuevaCarpeta.php',parametros);
            
            $.ajax({
                data:{
                    xIDCliente:window.xIDCliente,
                    xName:result,
                    accion:'NewCarpetaCliente'
                    
                },
                type:'POST',
                url: "ServletAjaxMyHD.servlet",
                
                context: document.body
                }).done(function() {
                //alert('carpteta creada
                    loadCarpetas();
            });
         }
         
         
         
    });


});



//Cargar tabla

                    





});


/**
* Cargar la lista de carpteas

 * @returns {undefined} */
function loadCarpetas()
{
           //alert('entra'); 

    $('#listaCarpetas').empty();
    $.getJSON(
            "ServletAjaxMyHD.servlet?accion=ListaCarpetasCustomer&xIDCliente="+window.xIDCliente,
            function(data)
            {
                //alert(data);
                //lista de carpetas
                var items = [];
                items.push(
                        '<li id="0"><a onclick="activarCarpeta(0)" href="#">Todos los documentos</a></li>'
                        );
                $.each(data, function(key, val)
                {
                    
                    if (key.id != 0) {
                        items.push(
                                '<li id="' + val.id + '"><i style="cursor:pointer;" title="Eliminar Carpeta" tooltip="Eliminar Carpeta" class="icon-trash" onclick="eliminarCarpeta('



                                + val.id + ')"></i><a onclick="activarCarpeta(' + val.id + ')" href="#">' + val.nombre + '</a></li>');
                    }
                });
                $('<ul/>'

                        , {
                    'id': 'ulCarpetas',
                    'class':'nav nav-list',
                    html:items.join(
                            '')
                }).appendTo(
                        '#listaCarpetas'
                        );
                //lista mover a carpeta

                var itemsMover = [];
                $.each(data, function(key, val)
                {
                    if (val.id != 0) {
                        itemsMover.push(
                                '<option value="' + val.id + '">'
                                + val.nombre + '</option>'


                                );
                        // $('#selectCarpetas').append($('<option>').text(value).attr('value', value));
                    }
                });
                //alert(itemsMover.join(''));
                $('#selectCarpetas').append(itemsMover.join(''));
                
            });
            
            
            //loadListaDocs();

}


/**
 * Activar la búsqueda en una carpeta
 * @param {type} idLista
 * @returns {undefined}
 */
function activarCarpeta(idLista) {
                    selectLista = idLista;
                    $('#ulCarpetas li').removeClass('active');
                    $('#' + idLista).addClass("active");
                    LeerDocs(idLista);
}

/**
 * Eliminar una carpeta
 * @param {type} idCarpeta
 * @returns {undefined}
 */
function eliminarCarpeta(idCarpeta) {
                    window.selCarpeta = idCarpeta;

                    
                    //alert(idCarpeta);

                    
                    //$('#' + idCarpeta).remove();
                    
                   
                                        bootbox.dialog("¿Está seguro de que desea eliminar la carpeta? ",
                                                [{
                                                        "label": "Cancelar",
                                                        "callback": function() {
                                                            console.log("eliminacion cancelada");
                                                        }
                                                    }, {
                                                        "label": "Eliminar",
                                                        "class": "btn-primary",
                                                        "callback": function() {
                                                            $.ajax({
                                                                data:{
                                                                    xIDCarpeta:idCarpeta,
                                                                    accion:'DropCarpeta'

                                                                },
                                                                type:'POST',
                                                                url: "ServletAjaxMyHD.servlet",

                                                                context: document.body
                                                                }).done(function() {
                                                                //alert('carpteta creada
                                                                    loadCarpetas();
                                                            });
                   
                                                        }
                                                    }]);

}



/**
 * Recibe la respuesta del servidor
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaDocs(pageRequest) {


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
                CrearTablaTuplasDocs(pageRequest.responseText);
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
function CrearTablaTuplasDocs(myJson)
{

    var tabla = new grid("data-table");
    var j = 0;

    var obj = JSON.parse(myJson);

    // borrar las tuplas de consultas anteriores
    //deleteLastRow("data-table");
    $("#data-table").empty();
    //alert(obj.length);
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

       

        //tabla.AddRowCellText(row, 0, obj[j].id);
        var celda = tabla.AddRowCellText(row, 0, obj[j].id);
        celda.setAttribute('hidden', 'true'); // ocultar la columna ID
       
        tabla.AddRowCellText(row, 1, obj[j].filename);
        tabla.AddRowCellText(row, 2, obj[j].fecha);
        tabla.AddRowCellText(row, 3,           
           '<ul class="table-controls"><li><a onclick="verDoc(\''+obj[j].id+'\')" class="btn tip" title="Ver Documento"><i class="icon-eye-open"></i></a></li>'+
           '<li><a onclick="downloadDoc(\''+obj[j].id+'\')" class="btn tip" title="Descargar Documento"><i class="icon-download-alt"></i></a></li>'+
           '<li><a href="#myModal" onclick="cambiarIDDoc(' + obj[j].id + ')" class="btn tip" title="Mover a Carpeta" data-toggle="modal"> <i class="icon-folder-open"> </i> </a></li>'+
           '</ul>');
    
           //AsientosMovimientoTabla(j+1);
    }
    obj=null;


}

function LeerDocs(xIDCarpeta)
{
    
    //alert('entra');
    var pag=window.numPag;
    var tama=window.sizePag;
    var url='ServletAjaxMyHD.servlet';
    var dataToSend='accion=ListaDocumentosCustomer&xIDCliente='+window.xIDCliente+'&xIDCarpeta='+xIDCarpeta+'&pagina='+pag +'&size='+tama;
    //alert('dataToSend'+dataToSend);
    conn = new Conectar(url, dataToSend);
    
    conn.pageRequest.onreadystatechange = function() { ListaDocs(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    //alert('despues del envio');
    //conn.NextPage('accion=ListaCuentasSaldos&xYear=2013');
    //conn.PrevPage('accion=ListaCuentasSaldos&xYear=2013');
    //var vJSON=conn.pageRequest.responseText;
    
}


function verDoc(idDoc){
    //verDocHDServlet
    
    
    window.location.href = 'verDocHDServlet.servlet?xID='+idDoc+'&xDownload=0';
}

function downloadDoc(idDoc){
    //verDocHDServlet
    
    
    window.location.href = 'verDocHDServlet.servlet?xID='+idDoc+'&xDownload=1';
}

function cambiarIDDoc(idDoc){
    window.docCompartir = idDoc;
}


//guardar los cambios de mover una carpeta
function saveChangeCarpeta() {
   
    $.ajax({
                data:{
                    xIDDoc:window.docCompartir,
                    xIDCarpeta:$("#selectCarpetas").val(),
                    accion:'ChangeCarpeta'
                    
                },
                type:'POST',
                url: "ServletAjaxMyHD.servlet",
                
                context: document.body
                }).done(function() {
                //alert('carpteta creada
                    $.jGrowl("El documento ha sido cambiado de carpeta");
            });
    idMoverCarpeta = 0;
}



function paginaAnterior(conn){
    
        //alert(window.selCarpeta);
         conn.PrevPage('accion=ListaDocumentosCustomer&xIDCliente='+window.xIDCliente+'&xIDCarpeta='+window.selCarpeta,conn);
}

function paginaSiguiente(conn){
        //alert(window.selCarpeta);
    
          conn.NextPage('accion=ListaDocumentosCustomer&xIDCliente='+window.xIDCliente+'&xIDCarpeta='+window.selCarpeta,conn); 
}




/**
 * Recibe la respuesta del servidor
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaClientes(pageRequest) {


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
                CrearTablaTuplasClientes(pageRequest.responseText);
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
function CrearTablaTuplasClientes(myJson)
{

    var tabla = new grid("tableClientes");
    var j = 0;
    //alert(myJson);
    var obj = JSON.parse(myJson);

    // borrar las tuplas de consultas anteriores
    //deleteLastRow("data-table");
    $("#tableClientes").empty();
    //alert(obj.length);
    
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

       

        //tabla.AddRowCellText(row, 0, obj[j].id);
        var celda = tabla.AddRowCellText(row, 0, '<input type="checkbox" name="checkRow" class="styled" value="' + obj[j].ID + '" />');
        //celda.setAttribute('hidden', 'true'); // ocultar la columna ID
       
        tabla.AddRowCellText(row, 1, obj[j].Nombre);
        tabla.AddRowCellText(row, 2, obj[j].Nif);
        tabla.AddRowCellText(row, 3, obj[j].Mail);
        
    
           //AsientosMovimientoTabla(j+1);
    }
    obj=null;


}

function LeerClientes()
{
    
    //alert('entra');
    var pag=window.numPag;
    var tama=window.sizePag;
    var url='ServletAjaxMyHD.servlet';
    var dataToSend='accion=ListaClientes&pagina='+pag +'&size='+tama;
    //alert('dataToSend'+dataToSend);
    connClientes = new Conectar(url, dataToSend);
    
    connClientes.pageRequest.onreadystatechange = function() { ListaClientes(connClientes.pageRequest); };
    //alert('onreadystatechange');
    connClientes.Enviar();
    //alert('despues del envio');
    //conn.NextPage('accion=ListaCuentasSaldos&xYear=2013');
    //conn.PrevPage('accion=ListaCuentasSaldos&xYear=2013');
    //var vJSON=conn.pageRequest.responseText;
    
}


function paginaAnteriorClientes(conn){
    
        //alert(window.selCarpeta);
         connClientes.PrevPage('accion=ListaClientes',connClientes);
}

function paginaSiguienteClientes(conn){
        //alert(window.selCarpeta);
    
          connClientes.NextPage('accion=ListaClientes',connClientes); 
}


function saveCompartir() {


                    // $('#myModal').hide();

                    var oTableCompartir = $('#select-all').dataTable();
                    var sData = $('input', oTableCompartir.fnGetNodes()).serialize();
                    //alert( "The following data would have been submitted to the server: \n\n"+sData );

                    var items = [];
                    $('input:checked', oTableCompartir.fnGetNodes()).each(function() {


                        items.push($(this).val());


                    });
                    var datos = items.join(',');

                    //var parametros = 'xIDDoc=' + window.docCompartir + '&xIDCliente=' + datos;
                    //alert(parametros);
                    //CallRemote('php/redmoon/compartirDoc.php', parametros);
                    
                    //alert(datos);
                   
                    
                     $.ajax({
                data:{
                    xIDDoc:window.docCompartir,
                    xUsuariosCompartir:datos,
                    accion:'CompartirDocumento'
                    
                },
                type:'POST',
                url: "ServletAjaxMyHD.servlet",
                
                context: document.body
                }).done(function() {
                //alert('carpteta creada
                    $.jGrowl("El documento ha sido compartido");
            });
}



