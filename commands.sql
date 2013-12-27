niveles recinto:
"SELECT NroNivel, IdNivel FROM `Nivel` WHERE NombreRecinto= '".$_POST["recinto"]."'"

nodos con categorias:
"SELECT NroNivel, Nombre, Descripcion_es, IdNodo, 
			COUNT(*) as NroDeEtiquetas, GROUP_CONCAT(DISTINCT Nombre_es 
				ORDER BY Nombre_es ASC SEPARATOR ', ') as Etiquetas 
					FROM Tags WHERE NombreRecinto='".$_POST["recinto"]."' group by IdNodo;"

nodos con posicion:
"SELECT IdNodo, X, Y FROM `Nodos` where Recinto = '".$_POST["recinto"]."'"

PT con pisos:
"SELECT IdNodo, NroNivel FROM Nodos WHERE TipoPT !=  '' AND Recinto =  '".$_POST["recinto"]."'"

nodos adyacencia:
"SELECT c.IdNodoA, IdNodoB, Direccion, 
	IF(c.Peso = -1 ,(SQRT(POWER((SELECT X from Nodo where IdNodo = c.IdNodoB)-
		(SELECT X from Nodo where IdNodo = c.IdNodoA),2)+
			POWER((SELECT Y from Nodo where IdNodo = c.IdNodoB)-(SELECT Y from Nodo where IdNodo = c.IdNodoA),2))),0) 
				as PesoCamino from Camino c where IdNodoA in (SELECT IdNodo from Nodo where IdNivel in 
					(SELECT IdNivel from Nivel where NombreRecinto = '".$_POST["recinto"]."')) order by c.IdNodoA"

PI:
	"SELECT IdNodo, X, Y, NroNivel, Descripcion_es, Nombre FROM Nodos WHERE Recinto = '".$_POST['recinto']."'"

PT:
	