<div id="pi" class="screen inv">
	<div class="wrap2">
		<div class="searchContainer">
			<input style="position: relative; top: 6px; padding: 3px; margin-right: 3px;" class="col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-xs-9 col-sm-9 col-md-9" type="text" ng-model="categorySearch">&nbsp;&nbsp;
			<button style="position: relative; top: 4px;" class="btn btn-info col-xs-1 col-sm-1 col-md-1">
				<i class="fa fa-search"></i>
			</button>
		</div>
		<div>
			<div ng-repeat="categoria in categorias | filter:categorySearch:strict">
				<h3>{{categoria}}</h3>
				<hr width="70%" align="left">
				<table style="text-align: center;" class="col-xs-12 col-sm-12 col-md-12 table table-bordered table-striped" class="tabla_tiendas">
					<tr ng-repeat="tienda in tiendas | filter:{agregada: 'false'} | filterByCategory:categoria"> 
						<td class="col-xs-4 col-sm-4 col-md-4 tienda-{{tienda.seleccionada}}">
							<button class="btn btn-primary" ng-click="agregarARuta(tienda)"><i class="fa fa-plus"></i></button>
						</td>
						<td style="vertical-align: middle;" class="col-xs-8 col-sm-8 col-md-8 tienda-{{tienda.seleccionada}}">{{tienda.nombre}}</td>
					</tr>
				</table>
			</div>  
		</div>
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