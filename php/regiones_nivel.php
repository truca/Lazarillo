<?php
	$con=mysql_connect("localhost","tractorv_lazaro","puppy2013")  or die(mysql_error()); 
	mysql_select_db("tractorv_lazarillo", $con) or die(mysql_error());
	mysql_query("SET NAMES 'utf8'");

	$sql = "SELECT IdNodo, Region, NroNivel FROM Nodos WHERE TipoPI !=  '' AND Region !=  '@' AND Recinto =  '".$_POST["recinto"]."' ORDER BY NroNivel";

	$q = mysql_query( $sql ) or die(mysql_error());
	
	$rows = array();
	while($r = mysql_fetch_assoc($q)) {
	    $rows[] = $r;
	}
	print json_encode($rows);

	mysql_close ();
?>