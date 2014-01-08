<div style="height: 35px; width: 150px; z-index: 999999; position: absolute;margin-left: 50%;left: -75px;bottom: 70px;">
	<div class="btn-group">
	  <button id="bajar" type="button" ng-click="cambiarPiso('-')" class="btn btn-default">Down</button>
	  <button type="button" disabled class="btn btn-default">{{pisoActual}}</button>
	  <button id="subir" type="button" ng-click="cambiarPiso('+')" class="btn btn-default">Up</button>
	</div>
</div>
<div id="wrap" class="wrap">
	<div style="position: relative; left:50%; top:50%; margin-left:-25px; margin-top:-25px;">
		<img src="img/loading.gif">
		Loading..
	</div>
</div>