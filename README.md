# pcaingenieria_prueba

## Para ejecutar la pagina web:

1. Clonar el presente GIT

2. Ejecutar el siguiente Script para generar un contenedor de Mysql y guardar la base de datos de usuarios de prueba para probar el aplicativo:
	
```
# docker pull mysql:5.6
# docker run --name pca-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:5.6
# mysql -h 127.0.0.1 -u root -proot
mysql> CREATE DATABASE apuestas_DB CHARACTER SET latin1 COLLATE latin1_swedish_ci;
mysql> CREATE TABLE apuestas_DB.usuarios (id INT NOT NULL AUTO_INCREMENT, usuario VARCHAR (20), dinero INT, PRIMARY KEY (id) ) CHARACTER SET latin1 COLLATE latin1_swedish_ci ENGINE MyISAM;
mysql> quit;
# docker exec -i pca-mysql mysql --user root --password=root apuestas_DB < apuestas_DB.dump
```

3. Cuando se tenga la base de datos configurada, se puede copiar la carpeta "apuesta_webpage" a un servidor web local, encender el servidor y abrir la pagina web en cualquier explorador: "localhost/apuesta_webpage"

4. El aplicativo se hizo en PHP con un Modelo Vista Controlador.
5. El frontend se elaboró con CSS y Javascript
6. El Frontend y Backend se comunican mediante la API Ajax de Jquery.
7. Se usó Bootstrap para los botones, debido a la falta de tiempo no se pudo generar un diseño más completo de la página
