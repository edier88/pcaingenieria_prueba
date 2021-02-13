<?php

include_once("../model/dbModel.php");
include_once("../colorsArray.php");

if(isset($_REQUEST['dataApuesta'])){

  $modelo = new dbModel();
  switch($_REQUEST['accion']){
    
    case "calcularApuesta":
      
      $apuestaArray = json_decode($_REQUEST['apuesta']);
      
      $color = $colors[array_rand($colors)];
      $colorValue = [
        "verde" => 10,
        "rojo" => 2,
        "negro" => 2,
      ];
      
      foreach ($apuestaArray as $key => $value){

        if ($color == $value[0] && $value[1] != ""){

          $sql = "UPDATE usuarios SET dinero = dinero*{$colorValue[$color]} WHERE id={$key}";      
          //echo json_encode("uoshfg");
        } else{
          $sql = "UPDATE usuarios SET dinero = dinero-'{$value[1]}' WHERE id={$key}";
        }
        $intCamposAfectados = $modelo->ejecutarSentencia($sql);
        
      }
      echo json_encode($color);
      
    break;    
  }
}