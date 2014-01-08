<div id="descripcion" class="screen inv"> 
	<div>
		<!--<img src="{{tienda.imagen}}">-->
		<h4>Nombre</h4>
		<span id="nombre_desc"></span>
		<h4>Descripcion</h4>
		<p id="descripcion_desc"></p>
	</div>

	<div class="footer sticky-footer">
		<div class="container">
			<div id="menu" class="btn-group col-xs-12 col-sm-12 col-md-12">
				<button class="btn btn-footer-35 btn-primary" ng-click="toggleMapa()">
					<i class="fa fa-reply"></i>
				</button>
				<button class="btn btn-footer-30 btn-primary" ng-click="setUserPosition()">
					Posicionar aqui
				</button>
				<button class="btn btn-footer-35 btn-primary" ng-click="addFromDescription()">
					Agregar a Ruta
				</button>
			</div>
		</div>
	</div>
</div>