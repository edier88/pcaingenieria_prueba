# Prueba aptitudes técnicas PCA INGENIERIA

## Descripción:
El presente proyecto es una prueba técnica presentada a la empresa PCA INGENIERIA.

### Pre-requisitos 📋

Asegúrese de tener Docker instalado en su sistema.

_Las instrucciones de instalación se escribieron teniendo en cuenta un sistema tipo Unix en la maquina donde se va a instalar el aplicativo web._

_Si usa Windows, puede que los comandos del script de instalación no le sirvan al pie de la letra._

### Instalación 🔧


1. Ejecute el siguiente Script para generar el contenedor de PHP con Apache que contendrá el aplicativo web y el contenedor de MySQL que contendrá la base de datos:

_(Cada línea es un script diferente, pegue línea por línea en la terminal, una a la vez)_
	
```
# clone https://github.com/edier88/pcaingenieria_prueba.git
# cd pcaingenieria_prueba
# docker-compose up -d
```
2. Tras ejecutar los anteriores scripts, puede entrar al aplicativo en cualquier explorador poniendo en la URL: _http://localhost:8000_


### Notas finales a tener en cuenta 📄

* *El Backend del aplicativo se hizo en PHP con un Modelo Vista Controlador.*
* *El Frontend se elaboró con CSS, HTML y Javascript.*
* *El Frontend y Backend se comunican mediante la API de AXIOS, mediante verbos GET y POST.*
* *Se usó Bootstrap 5 beta 2 para los botones, debido a la falta de tiempo no se pudo generar una estética más completa de la página.*
* *Se usó Docker version 19. Se usó un archivo "Dockerfile" y "docker compose" para la generar los contenedores y bajar sus imágenes facilmente.*



### Autores ✒️

* **Edier Guzmán** - *Trabajo Inicial* - [edier88](https://github.com/edier88/pcaingenieria_prueba)
