<!DOCTYPE html>
<html lang="en" ng-app="Lazarillo">
	<head>
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width, height=device-height" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="LazarilloApp">
		<meta name="author" content="LazarilloTeam">
		<link rel="shortcut icon" href="http://getbootstrap.com/docs-assets/ico/favicon.png">
		<link href="css/font-awesome.css" rel="stylesheet">

		<title>Lazarillo</title>

		<link href="css/bootstrap.css" rel="stylesheet">
		<link href="css/custom.css" rel="stylesheet">
	</head>
	<body style="" ng-controller="LazarilloCtrl">
		<!-- http://www.tractorverde.cl/lazarillo-responsive/-->
		<?php INCLUDE( 'partials/partial_inicio_en.php'); ?>
		<?php INCLUDE( 'partials/partial_ruta_en.php'); ?>
		<?php INCLUDE( 'partials/partial_pi_en.php'); ?>
		<?php INCLUDE( 'partials/partial_descripcion_en.php'); ?>
		<?php INCLUDE( 'partials/partial_config_en.php'); ?>
	</body>
	<?php INCLUDE( 'partials/partial_scripts_en.php'); ?>
	<?php INCLUDE( 'php/imagen_recinto_en.php' ) ?>
</html>