
/**
 * Lista de partidas de un presupuesto
 * @returns {Conectar}
 */

function LeerPresupuesto()
{

    var pag=window.pagina;
    var tama=window.pagsize;
    var id_presu=document.getElementById('xIDPresupuesto').value;
    //alert(id_presu);
    var url='ServletAjaxPresupuestos.servlet';
    var dataToSend='accion=ListaPresupuesto&pagina='+pag +'&size='+tama+'&xIDPresupuesto='+id_presu;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaPresupuesto(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaPresupuesto(pageRequest) {


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
                CrearTablaPresupuestos(pageRequest.responseText);
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
function CrearTablaPresupuestos(myJson)
{

    var tabla = new grid("oTabla");
    var j = 0;
    var myfila=window.fila;

    var obj = JSON.parse(myJson);

    // borrar las tuplas de consultas anteriores
    deleteLastRow("oTabla");
    
    //alert(myJson);
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

        //tabla.AddRowCellText(row, 0, obj[j].id);
        var celda = tabla.AddRowCellText(row, 0, obj[j].id);
        celda.setAttribute('hidden', 'true'); // ocultar la columna ID
        tabla.AddRowCellText(row, 1, obj[j].Capitulo );
        tabla.AddRowCellText(row, 2, obj[j].TipoGasto );
        tabla.AddRowCellText(row, 3, obj[j].CuentaGasto );
        tabla.AddRowCellText(row, 4, obj[j].Partida );
        
        celda=tabla.AddRowCellNumber(row, 5, obj[j].LocaleImporte );
        celda.setAttribute('id', 'oImporte'+myfila);
        celda.setAttribute('onclick', 'GetCellImporte(this.id);');
        
        tabla.AddRowCellText(row, 6,
        '<ul class="table-controls"><li ><a  onclick="UpdatePresupuesto('+(j+1)+');"  class="btn tip" title="Editar"> <i class="icon-refresh"> </i> </a></li>'+
        '</ul>');
    
        window.fila++;
        myfila=window.fila;
    }
    obj=null;


}

/**
 * Editar el importe de una partida
 * 
 * @param {type} myID
 * @returns {undefined}
 */

function GetCellImporte(myID)
{
    var oValor=document.getElementById(myID);
    var stringID=myID.toString();
    var campo;
    
   
    if (oValor.innerHTML.toString().substring(0,6) ==='<input')
        oValor.innerHTML=document.getElementById('importe').value;
    else
        {
            campo='<input name="importe" onblur="InputToRowCellHtml(this.id,'+stringID+');" value="'+
                    oValor.innerHTML+'" type="text" id="concepto" size="60" maxlength="90" onkeypress="detectar_tecla(event, this.id,'+
                    stringID+')" />';
            oValor.innerHTML=campo;
        }

    document.getElementById('importe').focus();
   
}




/**
 * Actualizar los datos de un socio
 * @param {type} numFila
 * @returns {undefined}
 */
function UpdatePresupuesto(numFila)
{
    //
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];

    //window.location.href = 'NewSocio.jsp?xIDSocio='+oCelda.innerHTML;
}

/**
 * Alta de un nuevo socio
 * @returns {undefined}
 */
function NuevoPresupuesto()
{
    // paso un cero para que sea un alta
    //window.location.href = 'NewSocio.jsp?xIDSocio=0';
}

function newCapitulo(){
     var idPre = $('#xCapitulo').val();   
    
    
}

/**
 * Añadir una partida al presupuesto
 * @returns {undefined}
 */
function newPartida(){
    var idPre = $('#xIDPre').val();    
    var nombre_partida = $('#xPartida').val();
    var capitulo = $('#xTipoCapitulo').val();
    var tipo_prov = $('#xTipoProv').val();
    var importe = $('#xImporte').val();
    
    //alert('nombre part:'+nombre_partida+'- capi:'+capitulo+'-tipo_prov:'+tipo_prov+'-'+'-id_pre:'+idPre);
 
    window.location.href = 'ServletAddPartida.servlet?xIdPre='+idPre+'&xNomPartida='+nombre_partida+'&xIDCapitulo='+capitulo
            +'&xTipoProvee='+tipo_prov+'&xImporte='+importe;
}

function seleccionarGrupoGasto()
{
    //alert($("#listaClientes option:selected").val());
    document.getElementById("xIDGrupoGasto").value = $("#grupoGasto option:selected").val();
    //id_customers_type $('option:selected', this).attr('mytag');
   


}



            

function seleccionarProveedor() {
    // alert($("#listaClientes option:selected").val());
    document.getElementById("xIDCodProveedor").value = $("#listaProveedores option:selected").val();
    //id_customers_type $('option:selected', this).attr('mytag');
    document.getElementById("xTipoProv").value = $("#listaProveedores option:selected").attr('id_suppliers_type');


}


