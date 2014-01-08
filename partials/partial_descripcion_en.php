<div id="descripcion" class="screen inv"> 
	<div>
		<!--<img src="{{tienda.imagen}}">-->
		<h4>Name</h4>
		<span id="nombre_desc"></span>
		<h4>Description</h4>
		<p id="descripcion_desc"></p>
	</div>

	<div class="footer sticky-footer">
		<div class="container">
			<div id="menu" class="btn-group col-xs-12 col-sm-12 col-md-12">
				<button class="btn btn-footer-35 btn-primary" ng-click="toggleMapa()">
					<i class="fa fa-reply"></i>
				</button>
				<button class="btn btn-footer-30 btn-primary" ng-click="setUserPosition()">
					Position here
				</button>
				<button class="btn btn-footer-35 btn-primary" ng-click="addFromDescription()">
					Add to route
				</button>
			</div>
		</div>
	</div>
</div>