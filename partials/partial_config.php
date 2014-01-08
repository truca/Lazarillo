<div id="config" class="screen inv"> 
	<div>
		<h2>Menu</h2>
		<hr width="70%" align="left">
		<table>
			<tr>
				<td><h4 style="display: inline;">Geolocalizar:</h4></td>
				<td>
					<button class="btn btn-primary" ng-click="toggleGeolocalizar()">{{geoStatus}}</button>
				</td>
			</tr>
			<tr></tr>
			<tr>
				<td><h4 style="display: inline;">Lenguaje:</h4></td>
				<td>
					<a class="btn btn-primary" 
					href=<?php echo "\"http://www.tractorverde.cl/lazarillo-responsive/index_en.php?recinto=".$_GET["recinto"]."&piso=".$_GET["piso"]."\""; ?>
					ng-click="toggleIdioma()">{{idioma}}</a>
				</td>
			</tr>
			<tr></tr>
			<tr>
				<td><h4 style="display: inline;">Recordar Estacionamiento:</h4></td>
				<td>
					<button class="btn btn-primary" ng-click="setEstacionamiento()">Recordar</button>
				</td>
			</tr>
		</table>
	</div>

	<div class="footer sticky-footer">
		<div class="container">
			<div id="menu" class="btn-group col-xs-12 col-sm-12 col-md-12">
				<button class="btn btn-footer-100 btn-primary" ng-click="toggleMapa()">
					<i class="fa fa-reply"></i>
				</button>
			</div>
		</div>
	</div>
</div>