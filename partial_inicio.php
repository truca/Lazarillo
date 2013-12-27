<div id="mapa" class="screen"> 
	<?php INCLUDE( 'partials/partial_mapa.php'); ?>

	<div class="footer">
		<div class="container">
			<div id="menu" class="btn-group col-xs-12 col-sm-12 col-md-12">
				<button class="btn btn-footer-25 btn-primary" ng-click="toggleRuta()">
					<span class="glyphicon glyphicon-road"></span>
				</button>
				<button class="btn btn-footer-25 btn-primary" ng-click="toggleRutas()">
					<span class="glyphicon glyphicon-globe"></span>
				</button>
				<button class="btn btn-footer-25 btn-primary" onclick="recordar_ubi()">L</button>
				<button class="btn btn-footer-25 btn-primary" onclick="obtener_geo()">
					<span class="glyphicon glyphicon-map-marker"></span>
				</button>
			</div>
		</div>
	</div>
</div>