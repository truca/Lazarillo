<html ng-app ng-controller="MyCtrl">
	<head>
		<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
		<link href="css/bootstrap.css" rel="stylesheet">
		<script type="text/javascript" src="js/underscore-min.js"></script>
	</head>
	<body style="background-color: light-blue;">
		<div style="width: 100%; heigth: 10%; background-color: ">
			<img src="img/logo.png"> <h2><?php echo $_GET["recinto"]; ?> > Pisos</h2>
		</div>
		<table class="table">
			<tr>
				<th>Piso</th>
				<th>Ir</th>
			</tr>
			<?php
				$con=mysql_connect("localhost","tractorv_lazaro","puppy2013")  or die(mysql_error()); 
				mysql_select_db("tractorv_lazarillo", $con) or die(mysql_error());
				mysql_query("SET NAMES 'utf8'");

				$sql = "SELECT NroNivel FROM  `Nivel` WHERE NombreRecinto =  '".$_GET["recinto"]."'";

				$q = mysql_query( $sql ) or die(mysql_error());
				
				$rows = array();
				while($r = mysql_fetch_assoc($q)) {
					echo "<tr><td>";
				  echo $r["NroNivel"];
				  echo '</td><td><a href="http://www.tractorverde.cl/lazarillo-responsive/index.html?recinto='.$_GET["recinto"].'&piso='.$r["NroNivel"].'" class="btn btn-primary"><i class="fa fa-arrow-circle-o-right"></i></a></td></tr>';
				}

				mysql_close ();
			?>
		</table>
	</body>
</html>