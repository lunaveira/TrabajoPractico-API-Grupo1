# TrabajoPractico-API-Grupo1

## Introducción
La presente documentación hace referencia al trabajo práctico realizado para la materia Aplicaciones Interactivas, donde se desarrolló una aplicación sobre clases particulares.
Esta materia nombrada es dictada en la Universidad Argentina de la Empresa los días Viernes en el turno mañana, con los profesores Sarasa, Maria Paula y Malio, Tomas Horacio. 

El propósito de la creación de esta aplicación es ayudar a alumnos que no obtienen buenas notas durante su paso por el nivel secundario brindándoles un medio para poder contactarse con diversos profesores que dictan clases particulares, de diversas materias como Historia, Informática, Matemática, Inglés, Literatura y Geografía.

La aplicación realizada por las alumnas Gacetua, Antonella Daiana y Naveira, Lucia Jazmin fue diseñada en base a un template obtenido de una búsqueda en internet. Este proceso estuvo autorizado por los profesores, para facilitar el trabajo pedido.
Uso de tecnologías y lenguajes utilizados 
Previamente a poner en funcionamiento el programa, debemos tener instalado Visual Studio Code, Node Js y Mongo DB. Y luego abrir la carpeta del programa.
Tecnologías y lenguajes presentes en el trabajo
Sobre el backend y frontend: Html, Css, React Js, Node Js y Javascript.
La base de datos utilizada es: Mongo DB.
Estas tecnologías y lenguajes fueron puestas en práctica sobre Visual Studio Code.

## ¿Cómo correr el programa para el front end?
Abrir una terminal con Ctrl + Ñ
Escribir en la terminal: npm install
Escribir en la terminal: npm start

## ¿Cómo correr el programa para el back end?
Abrir una terminal con Ctrl + Ñ
Escribir en la terminal: node app.js

## Requerimientos generales
La aplicación debe ser responsive.
La aplicación deberá desarrollarse utilizando los siguientes lenguajes y librerías obligatorias: HTML/CSS, React, JavaScript y NodeJS
La base de datos a utilizar es opción del grupo pudiendo escogerse entre SQL (MySql, SqlServer, Postgress) y NO SQL (MongoDB)

## Requerimientos específicos
La aplicación debe permitir la búsqueda, consulta y contratación de clases particulares que necesitan los alumnos.
La aplicación debe impedir el acceso a usuarios que posean el mismo mail.
La aplicación debe permitir el registro para el uso de la aplicación Tus Clases ingresando una contraseña y mail.
La aplicación debe dar la opción de rehacer una contraseña, si esta fue olvidada.
La aplicación debe estar basada según los roles Alumno y Profesor, donde estos tendrán diferentes permisos de acceso.
La aplicación debe permitir que se califique, comente una clase y también que se bloqueen dichos comentarios.

## Funcionalidades
¿Cómo funciona el Login?
Al ingresar a la página, lo primero que se visualiza es una pantalla con 3 botones llamados: Login, Registrar como Alumno y Registrar como Profesor.
Al dar click en Login, se podrá visualizar un formulario donde se debe ingresar un mail registrado previamente, y su contraseña, ambas puestas de forma correcta.
El sistema verificará según el mail puesto, si este corresponde a un Alumno o a un Profesor. 

Independientemente de si es un alumno o profesor, y se les olvida el mail o la contraseña, podrá elegir una nueva.

Y dependiendo de quien ingrese, también aparece:
Según la vista del Alumno: Dos pestañas en la parte de la izquierda de la página:
Una correspondiente a unas cards, donde dentro de ellas estará el nombre del profesor, la materia que dicta, si la materia es individual o grupal y cual es su costo. También existe un botón en la misma página para contratar dicha clase.
Otra pestaña correspondiente a las clases a la que el Alumno se registró correctamente, donde allí aparece la opción de poner un comentario y la clasificación, el estado del comentario si este fue aceptado, cancelado o finalizado por el Profesor, y el estado de la clase para saber si fue finalizada o cancelada.
Según la vista del Profesor: Dos pestañas en la parte de la izquierda de la página:
Una correspondiente a una tabla donde aparecen los alumnos que quisieran tomar la clase con él/la profesor/a.  En esa tabla se visualiza el nombre del Alumno, su teléfono, email, horario elegido, el mensaje que le envió el Alumno.
Otra pestaña correspondiente a una tabla donde aparecen las clases que dicta el profesor, donde allí estará el nombre de las materias y clases que dicta, su duración, frecuencia y costo. También podrá eliminar una clase, si es que ya no la dicta mas.

## ¿Qué funcionalidades tiene el Profesor?
Registro de Profesor
Al ingresar a la página, lo primero que se visualiza es una pantalla con 3 botones llamados: Login, Registrar como Alumno y Registrar como Profesor.
Al dar click en Registrar como Profesor, se podrá visualizar un formulario donde se debe ingresar el nombre y apellido, su teléfono, título, experiencia, email, y contraseña. También deberá aceptar los términos de la página.
Ingresar una vez registrado/a
Bloquear comentarios hechos por Alumnos
Al dar click en Login, y poner el mail y contraseña de Profesor, direccionara a la pantalla que corresponde como tal. Allí se visualiza una pantalla con una tabla donde aparecen el nombre del Alumno, su teléfono, email, horario elegido y el mensaje que le envió el Alumno. 
Como profesor, tendrás la opción en esta pantalla de cambiar el estado del mensaje a aceptado, finalizado o cancelado.

## ¿Qué funcionalidades tiene el Alumno?
Registro de Alumno
Al ingresar a la página, lo primero que se visualiza es una pantalla con 3 botones llamados: Login, Registrar como Alumno y Registrar como Profesor.
Al dar click en Registrar como Alumno, se podrá visualizar un formulario donde se debe ingresar el nombre y apellido, su teléfono, email, contraseña, fecha de nacimiento, su nivel educativo y si está completo o en curso. También deberá aceptar los términos de la página.
Calificar una clase
Al dar click en Login, y poner el mail y contraseña de Profesor, direccionara a la pantalla que corresponde como tal. Allí se visualiza una pantalla con una tabla donde aparece la opción de calificar una clase mediante 5 estrellas, siendo 1 “malo” y siendo 5 “excelente”. Solo se podrán calificar clases a las que esten anotados los Alumnos.
Comentar una clase
Al dar click en Login, y poner el mail y contraseña de Profesor, direccionara a la pantalla que corresponde como tal. Allí se visualiza una pantalla con una tabla donde aparece la opción de realizar comentarios en la clase donde ya está inscripto el Alumno. Este comentario será revisado por el Profesor para luego cambiar el estado del mismo.
Contratar una clase
Una vez ya dentro de la página, aparecerán cards, donde dentro de ellas estará el nombre del profesor, la materia que dicta, si la materia es individual o grupal y cual es su costo y su calificacion. También existe un botón en la misma página para contratar dicha clase.
En la misma página se puede realizar también, un filtrado de clases, según materias disponibles, tipo de clase, frecuencia y calificación.
Este botón para contratar la clase, redireccionará a un formulario donde se tendrá que completar con un email, teléfono, horario y un mensaje.
Los profesores al recibir una contratación se ponen en contacto con el alumno y de llegar a un acuerdo modifica el estado de la clase a Aceptada.
Una vez que el alumno deja de tomar clases el profesor o el alumno pueden cambiar el estado de la clase a Finalizada.
Finalmente tanto si el profesor o el alumno no llegan a un acuerdo para la contratación de la clase cualquiera de los dos podrá cambiarle el estado a Cancelada.

## Endpoints
Los endpoints que utilizamos en la creación de Tus Clases son:
app.use(‘/’, indexRouter);
app.use(‘/users’, userRouter);
app.use(‘/clases’, clasesRouter);
app.use(‘/contrataciones’, contratacionRouter);
