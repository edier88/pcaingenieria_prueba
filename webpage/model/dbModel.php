<?php

class dbModel {

	public $insert=0;


	
	function cnxConectar() {
		try
		{
			$this->insert=0;

			//$strServidor  = "127.0.0.1";
			$strServidor  = "db_pca";
			$strUsuario   = "root";
			$strClave     = "root";
			$strBaseDatos = "apuestas_DB";
			

			//	Establecer conexión con la base de datos
			$cnxConexion = new mysqli($strServidor, $strUsuario, $strClave, $strBaseDatos);

			//	Fijar charset
			mysqli_set_charset($cnxConexion, "utf8");

			//	Validar errores en la conexión
			if ($cnxConexion->connect_error) {
				throw new Exception("No se pudo establecer conexion");
			}

			//	Retornar conexión
			return $cnxConexion;
		}
		 catch (Exception $e) {
			throw new Exception($e->getMessage());
		}
	}

	function desconectar($cnxConexion) {
		try
		{
			//	Fializar conexión indicada
			//mysqli_close($cnxConexion);
			$cnxConexion->close();
		}
		 catch (Exception $e) {
			throw new Exception($e->getMessage());
		}
	}

	function arrEjecutarConsulta($strSentencia) {
		try
		{
			//	Establecer conexión con la base de datos
			$cnxConexion = self::cnxConectar();

			//	Ejecutar consulta
			//$rslConsulta = mysqli_query($cnxConexion, $strSentencia);
			$rslConsulta =$cnxConexion->query($strSentencia);

			//	Finalizar la conextión con la base de datos
			self::desconectar($cnxConexion);

			//	Arreglo de filas para almacenar el resultado
			$arrFilas = null;

			//	Recorrer conjunto de resultados
			/*while ($drFila = mysqli_fetch_array($rslConsulta, MYSQL_ASSOC)) {
				$arrFilas[] = $drFila;//	Agregar fila al arreglo de resultados
			}*/
			while ($drFila = $rslConsulta->fetch_array(MYSQLI_ASSOC)) {
				$arrFilas[] = $drFila;//	Agregar fila al arreglo de resultados
			}
			//	Liberar conjunto de resultados
				//mysqli_free_result($rslConsulta);
				$rslConsulta->free();

			//	Retornar resultado de la consulta
			return $arrFilas;
		}
		 catch (Exception $e) {
			throw new Exception($e->getMessage());
		}
	}
	
	function ejecutarSentencia($strSentencia, &$intCodigo = -1) {
		try
		{
			//	Establecer conexión con la base de datos
			$cnxConexion = self::cnxConectar();

			//	Ejecutar consulta
			//mysqli_query($cnxConexion, $strSentencia);
			$cnxConexion->query($strSentencia);

			//SABER CUANTAS FILAS AFECTO
			$intAfectados=$cnxConexion->affected_rows;
			//	Obtener último código insertado
			//$intCodigo = mysqli_insert_id($cnxConexion);
			$intCodigo =$cnxConexion->insert_id;

			$this->insert= $intCodigo;

			//	Finalizar la conextión con la base de datos
			self::desconectar($cnxConexion);

			return $intAfectados;
		}
		 catch (Exception $e) {
			throw new Exception($e->getMessage());
		}
	}
}