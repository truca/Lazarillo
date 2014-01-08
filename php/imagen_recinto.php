<?php
	$con=mysql_connect("localhost","tractorv_lazaro","puppy2013")  or die(mysql_error()); 
	mysql_select_db("tractorv_lazarillo", $con) or die(mysql_error());
	mysql_query("SET NAMES 'utf8'");

	$sql = "SELECT Imagen FROM `Nivel` WHERE NombreRecinto= '".$_GET["recinto"]."'";

	//" AND NroNivel=".$_GET["piso"];

	$q = mysql_query( $sql ) or die(mysql_error());
	
	$rows = array();
	while($r = mysql_fetch_assoc($q)) {
	    echo '<img style="display:none;" src="'.$r['Imagen'].'">';
	}

	mysql_close ();
?>