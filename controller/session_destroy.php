<?php
session_start(); // al volver al index si existe una session, esta sera destruida, existen formas de conservarlas como con un if(session_start()!= NULL). Pero por el momento para el ejemplo no es valido. 
session_destroy(); // Se destruye la session existente de esta forma no permite el duplicado.
header('Location: ../index.php');
?>