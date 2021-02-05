<?php

include_once("../model/dbModel.php");

if(isset($_REQUEST['dataUsuario'])){

  $modelo = new dbModel();
  //echo $_REQUEST['usuario'];
  switch($_REQUEST['accion']){
    case "tabla":
      $sql = "SELECT * FROM apuestas_DB.usuarios";
      $intCamposAfectados = $modelo->arrEjecutarConsulta($sql);
      echo json_encode($intCamposAfectados);
    break;
    case "crear":
      $sql = "INSERT INTO usuarios (usuario, dinero) VALUES ('{$_REQUEST['usuario']}', 15000)";
      $intCamposAfectados = $modelo->ejecutarSentencia($sql);
      echo json_encode($intCamposAfectados);
    break;
    case "show":
      $sql = "SELECT * FROM usuarios WHERE id = {$_REQUEST['id_usuario']}";
      $intCamposAfectados = $modelo->arrEjecutarConsulta($sql);
      echo json_encode($intCamposAfectados);
    break;
    case "edit":
      //$sql = "UPDATE usuarios SET usuario='{$_REQUEST['usuario']}' WHERE id={$_REQUEST['id_usuario']}";
      $sql = "UPDATE usuarios SET usuario='{$_REQUEST['usuario']}', dinero='{$_REQUEST['dinero']}' WHERE id={$_REQUEST['id_usuario']}";
      $intCamposAfectados = $modelo->ejecutarSentencia($sql);
	    echo json_encode($intCamposAfectados);
    break;
    case "remove":
      $sql = "DELETE FROM usuarios WHERE id = {$_REQUEST['id_usuario']}";
      $intCamposAfectados = $modelo->ejecutarSentencia($sql);
	    echo json_encode($intCamposAfectados);
    break;
    
  }

  

  //echo $sql;
}