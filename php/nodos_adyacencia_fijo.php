<?php
	$con=mysql_connect("localhost","tractorv_lazaro","puppy2013")  or die(mysql_error()); 
	mysql_SELECT_db("tractorv_lazarillo", $con) or die(mysql_error());
	mysql_query("SET NAMES 'utf8'");

	$sql = "SELECT c.IdNodoA, IdNodoB, (select NroNivel from Nodos where IdNodo=IdNodoA) as NroNivelA, (select NroNivel from Nodos where IdNodo=IdNodoB) as NroNivelB, Direccion, IF(c.Peso = -1 ,
		(SQRT(POWER((SELECT X from Nodo where IdNodo = c.IdNodoB)-
			(SELECT X from Nodo where IdNodo = c.IdNodoA),2)+
				POWER((SELECT Y from Nodo where IdNodo = c.IdNodoB)-
					(SELECT Y from Nodo where IdNodo = c.IdNodoA),2))),0) 
						as PesoCamino from Camino c where IdNodoA in 
							(SELECT IdNodo from Nodo where IdNivel in 
								(SELECT IdNivel from Nivel 
									where NombreRecinto = 'Universidad')) order by c.IdNodoA";

	$q = mysql_query( $sql ) or die(mysql_error());
	
	$rows = array();
	while($r = mysql_fetch_assoc($q)) {
	    $rows[] = $r;
	}
	print json_encode($rows);

	mysql_close ();
?>