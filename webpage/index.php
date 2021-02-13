<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pagina de apuestas</title>
  <!--
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="css/main.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js" crossorigin="anonymous"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
  -->
  <script src="https://kit.fontawesome.com/d6e2fe2a12.js" crossorigin="anonymous"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>

  <div id="tablaUsuarios"></div>

  <button id="botonCrearUsuario" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalCrearUsuario">Crear Usuario</button>
  <button id="botonApostar" type="button" class="btn btn-warning" >Apostar</button>
  <button id="botonLimpiar" type="button" class="btn btn-success" >Limpiar</button>

  <style>
    .box {
    float: left;
    height: 60px;
    width: 60px;
    margin-bottom: 15px;
    border: 1px solid black;
    clear: both;
    }

    .red {
      background-color: red;
    }

    .green {
      background-color: green;
    }

    .black {
      background-color: black;
    }
  </style>

  <div id="respuestaColor"></div>

  <!-- Inicio Modal para apostar -->
  <!--
  <div class="modal fade" id="modalApuesta" tabindex="-1" role="dialog" aria-labelledby="modalApuesta" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Cambiar Velocidad</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form action="" id="actualizarVelocidad">
          <div class="modal-body">
            <input type="hidden" id="velocidad_id_hidden">
            <div class="form-group">
              <label for="message-text" class="col-form-label">Codigo Dane:</label>
              <input type="text" class="form-control" id="velocidad_dane" disabled>
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Nombre Administrador:</label>
              <input type="text" class="form-control" id="velocidad_nombreAdmin" disabled style="text-transform:uppercase">
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Telefono Administracion:</label>
              <input type="text" class="form-control" id="velocidad_telAdmin" disabled>
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">E-Mail Administracion:</label>
              <input type="email" class="form-control" id="velocidad_mailAdmin" disabled placeholder="usuario@email.com">
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Velocidad(Mbps):</label>
              <input type="text" class="form-control" id="velocidad">
            </div>
            <span id="respuestaVelocidad"></span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <input type="submit" class="btn btn-success" value="Actualizar">
          </div>
        </form>
      </div>
    </div>
  </div>
  -->
  <!-- Fin Modal para apostar -->

  <!-- Inicio Modal para crear usuario -->
  <div class="modal fade" id="modalCrearUsuario" tabindex="-1" aria-labelledby="modalCrearUsuario" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Crear Usuario</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="message-text" class="col-form-label">Nombre de usuario:</label>
            <input type="text" class="form-control" id="usuario_create">
          </div>
          <span id="respuestaCrearUsuario"></span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button id="botonModalCrearUsuario" class="btn btn-success">Crear Usuario</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Fin Modal para crear usuario -->

  <!-- Inicio Modal para editar usuario -->
  <div class="modal fade" id="modalEditarUsuario" tabindex="-1" aria-labelledby="modalEditarUsuario" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar Usuario</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <input type="hidden" class="form-control" id="id_edit">
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Nombre de usuario:</label>
            <input type="text" class="form-control" id="usuario_edit">
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Dinero:</label>
            <input type="text" class="form-control" id="dinero_edit">
          </div>
          <span id="respuestaEditarUsuario"></span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button id="botonModalEditarUsuario" class="btn btn-success">Actualizar Usuario</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Fin Modal para editar usuario -->

</body>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.6.0/dist/umd/popper.min.js" integrity="sha384-KsvD1yqQ1/1+IA7gi3P0tyJcT3vR+NdBTt13hSJ2lnve8agRGXTTyNaBYmCR/Nwi" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.min.js" integrity="sha384-nsg8ua9HAw1y0W1btsyWgBklPnCUAFLuTMS2G72MMONqmOymq585AcH49TLBQObG" crossorigin="anonymous"></script>
<script src="js/main.js"></script>
</html>