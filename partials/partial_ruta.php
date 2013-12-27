<div id="ruta" class="screen inv">
	<div class="wrap">
		<div>
			<table style="text-align: center;" class="col-xs-12 col-sm-12 col-md-12 table table-bordered table-striped" id="tabla_tiendas">
				<tr>
					<th style="text-align: center;" class="col-xs-4 col-sm-4 col-md-4">Visitado</th>
					<th style="text-align: center;" class="col-xs-4 col-sm-4 col-md-4">Nombre</th>
				</tr>
				<tr ng-repeat="destino in destinos | filter: {visitado: false} | orderBy: ['posicion']">
					<td class="destino-{{destino.seleccionada}}">
						<button class="btn btn-primary" ng-click="quitarDeRuta(destino)"><i class="fa fa-times"></i></button>
					</td>
					<td class="destino-{{destino.seleccionada}}">{{destino.nombre}}</td>
				</tr>
			</table>
			<button class="btn btn-footer-100 btn-primary" ng-click="togglePI()">
				<i class="fa fa-plus"></i>&nbsp;&nbsp;Agregar Destino
			</button>
		</div>
	</div>

	<div class="footer">
		<div class="container">
			<div id="menu" class="btn-group col-xs-12 col-sm-12 col-md-12">
				<button class="btn btn-footer-100 btn-primary" ng-click="toggleMapa()">
						<i class="fa fa-reply"></i>
				</button>
			</div>
		</div>
	</div>
</div>