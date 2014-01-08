<div id="mapa" class="screen"> 
	<?php INCLUDE( 'partial_mapa_en.php'); ?>

	<div class="footer">
		<div class="container">
			<div id="menu" class="btn-group col-xs-12 col-sm-12 col-md-12">
				<button class="btn btn-footer-35 btn-primary" ng-click="toggleRuta()">
					<span class="glyphicon glyphicon-road">&nbsp;Routes</span>
				</button>
				<button class="btn btn-footer-30 btn-primary" ng-click="toggleRutas()">
					<span class="glyphicon glyphicon-globe">&nbsp;Shops</span>
				</button>
				<button class="btn btn-footer-35 btn-primary" ng-click="toggleConfig()">
					<span class="glyphicon glyphicon-map-marker">&nbsp;Config</span>
				</button>
			</div>
		</div>
	</div>
</div>