
window.onload = mostrarTabla()


$("#botonModalCrearUsuario").click(function(){
    
    $.ajax({
        url:'controller/usuarioController.php',
        data: {
            "usuario": usuario_create.value,
            "accion": "crear",
            "dataUsuario": true
        },
        beforeSend: function(objeto){
            //$("#respuestaCrearUsuario").html("<img src='../imagenes/loader.gif'>");
        },
        success:function(data){
            if (data == 1){
                $("#modalCrearUsuario").modal("hide")
                mostrarTabla()
            }
        }
    })
})



function mostrarTabla(){
    $.ajax({
        url:'controller/usuarioController.php',
        data: {
            "accion": "tabla",
            "dataUsuario": true
        },
        beforeSend: function(objeto){
            //$("#respuestaCrearUsuario").html("<img src='../imagenes/loader.gif'>");
        },
        success:function(data){
            cadena = ""
            console.log(data)
            var parsed = JSON.parse(data)
            //console.log(parsed)
            cadena += 
            "<table id='table1' style='width:100%'>"+
                "<tr>"+
                    "<th>Usuario</th>"+
                    "<th>Dinero Disponible</th>"+
                    "<th>Apuesta</th>"+
                    "<th>Porcentaje apostado</th>"+
                    "<th>Dinero apostado</th>"+
                    "<th>Opciones</th>"+
                "</tr>";
            parsed.forEach(element => {
                cadena+=
                "<tr>"+
                    "<td>"+element.usuario+"</td>"+
                    "<td><div id='dinero_"+element.id+"'>"+element.dinero+"</div></td>"+
                    "<td>"+
                        "<select class='apuesta_color' name='colores_"+element.id+"' id='"+element.id+"'>"+
                            "<option value='negro'>Negro</option>"+
                            "<option value='verde'>Verde</option>"+
                            "<option value='rojo'>Rojo</option>"+
                        "</select>"+
                    "</td>";
                    if (element.dinero <= 1000){
                        cadena+=
                        "<td>"+
                            "<select class='apuesta_porcentaje' name='porcentaje_"+element.id+"' id='porcentaje_"+element.id+"'>"+
                                "<option value='0' disabled selected>Porcentaje</option>"+
                                "<option value='100'>100%</option>"+
                            "</select>"+
                        "</td>";
                    } else{
                        cadena+=
                        "<td>"+
                            "<select class='apuesta_porcentaje' name='porcentaje_"+element.id+"' id='porcentaje_"+element.id+"'>"+
                                "<option value='0' disabled selected>Porcentaje</option>"+
                                "<option value='11'>11%</option>"+
                                "<option value='12'>12%</option>"+
                                "<option value='13'>13%</option>"+
                                "<option value='14'>14%</option>"+
                                "<option value='15'>15%</option>"+
                                "<option value='16'>16%</option>"+
                                "<option value='17'>17%</option>"+
                                "<option value='18'>18%</option>"+
                                "<option value='19'>19%</option>"+
                            "</select>"+
                        "</td>";
                    }
                    cadena+=
                    "<td><div class='dineroApostado' id='apostado_"+element.id+"'></div></td>"+
                    "<td>"+
                        "<div class='row justify-content-center'>"+
                            "<div class='col'>"+
                                "<button class='btn btn-success btn-sm' type='button' onclick='editUserModal(\""+element.id+"\");'><i class='fa fa-edit'></i></button>"+
                            "</div>"+
                            "<div class='col'>"+
                                "<button class='btn btn-danger btn-sm' type='button' onclick='removeUser(\""+element.id+"\");'><i class='fa fa-times'></i></button>"+
                            "</div>"+
                        "</div>"+
                    "</td>"+
                "</tr>";
                
            })
            cadena += "</table>";
            $("#tablaUsuarios").html(cadena)

            
            $(".apuesta_porcentaje").change(function(){
                let elemento = $(this)
                let res = (elemento[0].id).split("_")
                let id = res[1]
                let dinero_actual = $("#dinero_"+res[1]).html()
                $("#apostado_"+res[1]).html( dinero_actual*((elemento[0].value)/100) )
            })
        }
    })
    
}

function editUserModal(id){

    $.ajax({
        url:'controller/usuarioController.php',
        data: {
            "id_usuario": id,
            "accion": "show",
            "dataUsuario": true
        },
        beforeSend: function(objeto){
            //$("#respuestaCrearUsuario").html("<img src='../imagenes/loader.gif'>");
        },
        success:function(data){
            console.log(data)
            var parsed = JSON.parse(data)
            $("#usuario_edit").val(parsed[0].usuario)
            $("#id_edit").val(parsed[0].id)
            $("#modalEditarUsuario").modal("show")
        }
    })
}

$("#botonModalEditarUsuario").click(function(){

    $.ajax({
        url:'controller/usuarioController.php',
        data: {
            "id_usuario": id_edit.value,
            "usuario": usuario_edit.value,
            "dinero": dinero_edit.value,
            "accion": "edit",
            "dataUsuario": true
        },
        beforeSend: function(objeto){
            //$("#respuestaCrearUsuario").html("<img src='../imagenes/loader.gif'>");
        },
        success:function(data){
            if (data == 1){
                $("#modalEditarUsuario").modal("hide")
                mostrarTabla()
            }
        }
    })
})

function removeUser(id){
    if (confirm('¿Estas seguro de eliminar este usuario de la base de datos?')){
        $.ajax({
            url:'controller/usuarioController.php',
            data: {
                "id_usuario": id,
                "accion": "remove",
                "dataUsuario": true
            },
            beforeSend: function(objeto){
                //$("#respuestaCrearUsuario").html("<img src='../imagenes/loader.gif'>");
            },
            success:function(data){
                
                if (data == 1){
                    mostrarTabla()
                }
            }
        })
    }
}

$("#botonApostar").click(function(){
    let arrayApuesta = $(".apuesta_color")
    let arrayDineroApostado = $(".dineroApostado")
    let objApuesta = {}
    
    for (let i = 0; i < arrayApuesta.length; i++) {
        objApuesta[arrayApuesta[i].id] = [arrayApuesta[i].value, arrayDineroApostado[i].innerHTML]
    }
    
    $.ajax({
        url:'controller/apuestaController.php',
        data: {
            "apuesta": objApuesta,
            "accion": "calcularApuesta",
            "dataApuesta": true
        },
        beforeSend: function(objeto){
            //$("#respuestaCrearUsuario").html("<img src='../imagenes/loader.gif'>");
        },
        success:function(data){
            //console.log(data)
            switch (data) {
                case "negro":
                    $("#respuestaColor").html("<div class='box black'></div> Ganó Negro")
                break;
                case "verde":
                    $("#respuestaColor").html("<div class='box green'></div> Ganó Verde")
                break;
                case "rojo":
                    $("#respuestaColor").html("<div class='box red'></div> Ganó Rojo")
                break;
            }
            mostrarTabla()
        }
    })
})

$("#botonLimpiar").click(function(){
    $("#respuestaColor").html("")
})