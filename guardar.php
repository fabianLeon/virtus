<?php
	
	//abre el archivo y se escribe a una nueva linea cada vez, (a)
	$fp = fopen("mundo.txt", "a");

	fwrite($fp, $_REQUEST["variable"].PHP_EOL);
	fclose($fp);

	$saludo = $_REQUEST['variable'];
    header("location: mundo.php");
 ?>