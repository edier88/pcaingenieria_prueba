
window.onload = mostrarTabla()

var myModalCrearUsuario = new bootstrap.Modal(document.getElementById('modalCrearUsuario'), {keyboard: true})
var myModalEditarUsuario = new bootstrap.Modal(document.getElementById('modalEditarUsuario'), {keyboard: true})

botonModalCrearUsuario.addEventListener("click", () => {
    
    var datos = new FormData();
    datos.append("usuario", usuario_create.value)
    datos.append("accion", "crear")
    datos.append("dataUsuario", true)

    axios({
        url:'controller/usuarioController.php',
        method: 'post',
        responseType: 'json',
        data: datos
    })
    .then((res) => {
        if(res.status==200) {
            return res.data
        }
        console.log(res)
    })
    .catch((error) => {
        console.log('Error de conexión ' + error)
    })
    .then((res) => {
        mostrarTabla()
        myModalCrearUsuario.hide()
    })
})



function mostrarTabla(){

    // Aqui puede estar un loader corriendo
    axios({
        url:'controller/usuarioController.php',
        method: 'get',
        responseType: 'json',
        params:{
            "accion": "tabla",
            "dataUsuario": true
        }
    })
    .then((res) => {
        if(res.status==200) {
            return res.data // Le paso la respuesta al segundo ".then"
        }
        console.log(res);
        
    })
    .catch((error) => {
        //mensaje.innerText = 'Error de conexión ' + err;
        console.log('Error de conexión ' + error);
    })
    .then((res) => {
        // Aquí se puede apagar el loader
        let cadena = 
        `<table id="table1" style="width:100%">
            <tr>
                <th>Usuario</th>
                <th>Dinero Disponible</th>
                <th>Apuesta</th>
                <th>Porcentaje apostado</th>
                <th>Dinero apostado</th>
                <th>Opciones</th>
            </tr>`
        res.forEach(element => {
            cadena+=
            `<tr>
                <td>${element.usuario}</td>
                <td><div id="dinero_${element.id}">${element.dinero}</div></td>
                <td>
                    <select class="apuesta_color" name="colores_${element.id}" id="${element.id}">
                        <option value="negro">Negro</option>
                        <option value="verde">Verde</option>
                        <option value="rojo">Rojo</option>
                    </select>
                </td>`
                if (element.dinero <= 1000){
                    cadena+=
                    `<td>
                        <select class="apuesta_porcentaje" name="porcentaje_${element.id}" id="porcentaje_${element.id}">
                            <option value="0" disabled selected>Porcentaje</option>
                            <option value="100">100%</option>
                        </select>
                    </td>`
                } else{
                    cadena+=
                    `<td>
                        <select class="apuesta_porcentaje" name="porcentaje_${element.id}" id="porcentaje_${element.id}">
                            <option value="0" disabled selected>Porcentaje</option>
                            <option value="11">11%</option>
                            <option value="12">12%</option>
                            <option value="13">13%</option>
                            <option value="14">14%</option>
                            <option value="15">15%</option>
                            <option value="16">16%</option>
                            <option value="17">17%</option>
                            <option value="18">18%</option>
                            <option value="19">19%</option>
                        </select>
                    </td>`
                }
                cadena+=
                `<td><div class="dineroApostado" id="apostado_${element.id}"></div></td>
                <td>
                    <div class="row justify-content-center">
                        <div class="col">
                            <button class="btn btn-success btn-sm" type="button" onclick="editUserModal(${element.id});"><i class="fa fa-edit"></i></button>
                        </div>
                        <div class="col">
                            <button class="btn btn-danger btn-sm" type="button" onclick="removeUser(${element.id});"><i class="fa fa-times"></i></button>
                        </div>
                    </div>
                </td>
            </tr>`
            
        })
        cadena += "</table>"
        tablaUsuarios.innerHTML = cadena
        
        var apuestaPorcentaje = document.querySelectorAll(".apuesta_porcentaje")
        apuestaPorcentaje.forEach(element => {
            element.addEventListener("change", () =>{
                let res = (element.id).split("_")
                let dinero_actual = document.getElementById("dinero_"+res[1])
                let dinero_apostado = document.getElementById("apostado_"+res[1])
                dinero_apostado.innerHTML = ( (dinero_actual.innerHTML)*((element.value)/100) )
            })
        })
    })    
}

function editUserModal(id){
    axios({
        url:'controller/usuarioController.php',
        method: 'get',
        responseType: 'json',
        params:{
            "id_usuario": id,
            "accion": "show",
            "dataUsuario": true
        }
    })
    .then((res) => {
        if(res.status==200) {
            return res.data // Le paso la respuesta al segundo ".then"
        }
    })
    .catch((error) => {
        //mensaje.innerText = 'Error de conexión ' + err;
        console.log('Error de conexión ' + error);
    })
    .then((res) => {
        // Aquí se puede apagar el loader
        console.log(res)
        usuario_edit.value = res[0].usuario
        id_edit.value = res[0].id
        myModalEditarUsuario.show()
    })
}

botonModalEditarUsuario.addEventListener("click", () =>{

    var datos = new FormData()
    datos.append("id_usuario", id_edit.value)
    datos.append("usuario", usuario_edit.value)
    datos.append("dinero", dinero_edit.value)
    datos.append("accion", "edit")
    datos.append("dataUsuario", true)

    axios({
        url:'controller/usuarioController.php',
        method: 'post',
        responseType: 'json',
        data: datos
    })
    .then((res) => {
        if(res.status==200) {
            return res.data
        }
    })
    .catch((error) => {
        console.log('Error de conexión ' + error)
    })
    .then((res) => {        
        myModalEditarUsuario.hide()
        mostrarTabla()
    })
})

function removeUser(id){
    if (confirm('¿Estas seguro de eliminar este usuario de la base de datos?')){

        var datos = new FormData();
        datos.append("id_usuario", id)
        datos.append("accion", "remove")
        datos.append("dataUsuario", true)

        axios({
            url:'controller/usuarioController.php',
            method: 'post',
            responseType: 'json',
            data: datos
        })
        .then((res) => {
            if(res.status==200) {
                return res.data
            }
            console.log(res)
        })
        .catch((error) => {
            console.log('Error de conexión ' + error)
        })
        .then((res) => {
            mostrarTabla()
        })
    }
}

botonApostar.addEventListener("click", () =>{

    let arrayApuesta = document.querySelectorAll(".apuesta_color")
    let arrayDineroApostado = document.querySelectorAll(".dineroApostado")
    
    let objApuesta = {}
    
    for (let i = 0; i < arrayApuesta.length; i++) {
        objApuesta[arrayApuesta[i].id] = [arrayApuesta[i].value, arrayDineroApostado[i].innerHTML]
    }

    axios({
        url:'controller/apuestaController.php',
        method: 'get',
        responseType: 'json',
        params:{
            "apuesta": objApuesta,
            "accion": "calcularApuesta",
            "dataApuesta": true
        }
    })
    .then((res) => {
        if(res.status==200) {
            return res.data // Le paso la respuesta al segundo ".then"
        }
    })
    .catch((error) => {
        //mensaje.innerText = 'Error de conexión ' + err;
        console.log('Error de conexión ' + error);
    })
    .then((res) => {
        // Aquí se puede apagar el loader
        switch (res) {
            case "negro":
                respuestaColor.innerHTML = "<div class='box black'></div> Ganó Negro"
            break;
            case "verde":
                respuestaColor.innerHTML = "<div class='box green'></div> Ganó Verde"
            break;
            case "rojo":
                respuestaColor.innerHTML = "<div class='box red'></div> Ganó Rojo"
            break;
        }
        mostrarTabla()
    })
})

botonLimpiar.addEventListener("click", () =>{
    respuestaColor.innerHTML = ""
})