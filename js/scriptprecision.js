function pertenece_cuadrilatero(punto,cuadrilatero)
{
var recta_1=obtener_ec_recta(cuadrilatero[0],cuadrilatero[1]);
var recta_2=obtener_ec_recta(cuadrilatero[1],cuadrilatero[2]);
var recta_3=obtener_ec_recta(cuadrilatero[2],cuadrilatero[3]);
var recta_4=obtener_ec_recta(cuadrilatero[3],cuadrilatero[0]);
//console.log(pertenece_proyeccion_recta(punto,recta_1)+" && "+pertenece_proyeccion_recta(punto,recta_2)+" && "+pertenece_proyeccion_recta(punto,recta_3)+" && "+pertenece_proyeccion_recta(punto,recta_4))
if(pertenece_proyeccion_recta(punto,recta_1) && pertenece_proyeccion_recta(punto,recta_2) && pertenece_proyeccion_recta(punto,recta_3) && pertenece_proyeccion_recta(punto,recta_4))
return true;
else return false;

}

function activar_geolocalizacion()
{
if(data.geolocalizar)
{
var coord_actuales=navigator.geolocation.getCurrentPosition(mostrar, fallo);
data.posicion=obtener_coordenadas(coord_actuales,[475,527],[417,314],[299,111],[-70.61859488138049,-33.49148534390883],[-70.61879336484759,-33.49063532683917],[-70.61924397596215,-33.4898322767321]);
//console.log(posicion)
} 
}


function fallo(){
    alert("El navegador no soporta la API de geolocalizacion");
  }

  function mostrar()
  {	
  
    var latitud=coords.latitude%1; //Trabajar con decimales para obtener minutos y segundos
    var longitud=posicion.coords.longitude%1;
	return [latitud,longitud];
	}

//Obtengo las coordenadas
function obtener_coordenadas(geo_actual, coord1,coord2,coord3,geo1,geo2,geo3)
{
var razones_geo=new Array();
var razones_coord=new Array();
//Datos primera ecuacion
var dc1c2=distancia_punto_punto(coord1,coord2);
var dg1g2=distancia_punto_punto(geo1,geo2);
var recta_c1c2=obtener_ec_recta(coord1,coord2);
var recta_g1g2=obtener_ec_recta(geo1,geo2);
var dist_ga_recta_g1g2=distancia_punto_recta(geo_actual,recta_g1g2);
var C1=dist_ga_recta_g1g2*dc1c2/dg1g2;
C1=Math.sqrt(recta_c1c2[0]*recta_c1c2[0]+1)*C1;
//console.log(C1);
var A1=recta_c1c2[0];
var B1=1;

//Datos segunda ecuacion
var dc1c3=distancia_punto_punto(coord1,coord3);
var dg1g3=distancia_punto_punto(geo1,geo3);
var recta_c1c3=obtener_ec_recta(coord1,coord3);
var recta_g1g3=obtener_ec_recta(geo1,geo3);
var dist_ga_recta_g1g3=distancia_punto_recta(geo_actual,recta_g1g3);
var C2=dist_ga_recta_g1g3*dc1c3/dg1g3;
C2=Math.sqrt(recta_c1c3[0]*recta_c1c3[0]+1)*C2;
//console.log(C2);

var A2=recta_c1c3[0];
var B2=1;

var punto=new Array();
var punto_aux=new Array();
var diferencia;
var aux;

//Caso 1: Ambos mayor que 0
C1=C1-recta_c1c2[1];
//console.log(C1);
C2=C2-recta_c1c3[1];
//console.log(C2);
punto[0]=(C1*B2-B1*C2)/(A1*B2-B1*A2);
punto[1]=(A1*C2-C1*A2)/(A1*B2-B1*A2);
razones_geo[0]=distancia_punto_punto(geo1,geo_actual)/distancia_punto_punto(geo2,geo_actual);
razones_geo[1]=distancia_punto_punto(geo1,geo_actual)/distancia_punto_punto(geo3,geo_actual);
razones_geo[2]=distancia_punto_punto(geo2,geo_actual)/distancia_punto_punto(geo3,geo_actual);
razones_coord[2]=distancia_punto_punto(coord2,punto)/distancia_punto_punto(coord3,punto);
razones_coord[0]=distancia_punto_punto(coord1,punto)/distancia_punto_punto(coord2,punto);
razones_coord[1]=distancia_punto_punto(coord1,punto)/distancia_punto_punto(coord3,punto);

punto_aux[0]=punto[0];
punto_aux[1]=punto[1];
diferencia=Math.abs(razones_geo[0]-razones_coord[0]) + Math.abs(razones_geo[1]-razones_coord[1])+Math.abs(razones_geo[2]-razones_coord[2]);

//Caso 2: C1 con signo cambiado
C1=(-1)*C1-recta_c1c2[1];
C2=C2-recta_c1c3[1];
punto[0]=(C1*B2-B1*C2)/(A1*B2-B1*A2);
punto[1]=(A1*C2-C1*A2)/(A1*B2-B1*A2);
razones_geo[0]=distancia_punto_punto(geo1,geo_actual)/distancia_punto_punto(geo2,geo_actual);
razones_geo[1]=distancia_punto_punto(geo1,geo_actual)/distancia_punto_punto(geo3,geo_actual);
razones_geo[2]=distancia_punto_punto(geo2,geo_actual)/distancia_punto_punto(geo3,geo_actual);
razones_coord[2]=distancia_punto_punto(coord2,punto)/distancia_punto_punto(coord3,punto);
razones_coord[0]=distancia_punto_punto(coord1,punto)/distancia_punto_punto(coord2,punto);
razones_coord[1]=distancia_punto_punto(coord1,punto)/distancia_punto_punto(coord3,punto);

aux=Math.abs(razones_geo[0]-razones_coord[0]) + Math.abs(razones_geo[1]-razones_coord[1])+Math.abs(razones_geo[2]-razones_coord[2]);
//console.log(aux+"<"+diferencia);
if(aux<diferencia)
{
//console.log("Entre caso 2");
punto_aux[0]=punto[0];
punto_aux[1]=punto[1];
aux=diferencia;
}

//Caso 3: C2 con signo cambiado 
C1=C1-recta_c1c2[1];
C2=(-1)*C2-recta_c1c3[1];
punto[0]=(C1*B2-B1*C2)/(A1*B2-B1*A2);
punto[1]=(A1*C2-C1*A2)/(A1*B2-B1*A2);
razones_geo[0]=distancia_punto_punto(geo1,geo_actual)/distancia_punto_punto(geo2,geo_actual);
razones_geo[1]=distancia_punto_punto(geo1,geo_actual)/distancia_punto_punto(geo3,geo_actual);
razones_geo[2]=distancia_punto_punto(geo2,geo_actual)/distancia_punto_punto(geo3,geo_actual);
razones_coord[2]=distancia_punto_punto(coord2,punto)/distancia_punto_punto(coord3,punto);
razones_coord[0]=distancia_punto_punto(coord1,punto)/distancia_punto_punto(coord2,punto);
razones_coord[1]=distancia_punto_punto(coord1,punto)/distancia_punto_punto(coord3,punto);
aux=Math.abs(razones_geo[0]-razones_coord[0]) + Math.abs(razones_geo[1]-razones_coord[1])+Math.abs(razones_geo[2]-razones_coord[2]);
//console.log(aux+"<"+diferencia);
if(aux<diferencia)
{
//console.log("Entre caso 4");
punto_aux[0]=punto[0];
punto_aux[1]=punto[1];
aux=diferencia;
}

//Caso 4: ambos menores que 0 
C1=(-1)*C1-recta_c1c2[1];
C2=(-1)*C2-recta_c1c3[1];
punto[0]=(C1*B2-B1*C2)/(A1*B2-B1*A2);
punto[1]=(A1*C2-C1*A2)/(A1*B2-B1*A2);
razones_geo[0]=distancia_punto_punto(geo1,geo_actual)/distancia_punto_punto(geo2,geo_actual);
razones_geo[1]=distancia_punto_punto(geo1,geo_actual)/distancia_punto_punto(geo3,geo_actual);
razones_geo[2]=distancia_punto_punto(geo2,geo_actual)/distancia_punto_punto(geo3,geo_actual);
razones_coord[2]=distancia_punto_punto(coord2,punto)/distancia_punto_punto(coord3,punto);
razones_coord[0]=distancia_punto_punto(coord1,punto)/distancia_punto_punto(coord2,punto);
razones_coord[1]=distancia_punto_punto(coord1,punto)/distancia_punto_punto(coord3,punto);
aux=Math.abs(razones_geo[0]-razones_coord[0]) + Math.abs(razones_geo[1]-razones_coord[1])+Math.abs(razones_geo[2]-razones_coord[2]);
//console.log(aux+"<"+diferencia);
if(aux<diferencia)
{
//console.log("Entre caso 4");
punto_aux[0]=punto[0];
punto_aux[1]=punto[1];
aux=diferencia;
}
return punto_aux;
}


//funcion que determina si la proyeccion de un punto sobre una recta cae dentro de la recta en el intervalo que esta está definida
function pertenece_proyeccion_recta(punto,recta)
{
//console.log(recta[2]);
//console.log(recta[3]);
var proyeccion=proyeccion_punto_recta(punto,recta);//obtenemos la proyeccion punto recta

if(recta[2][0]>=recta[3][0])//determinamos el x mayor y el menor
	{//si el primero es el mayor, entonces vemos si la proyeccion en x esta en el intervalo
	if(recta[2][0]>=proyeccion[0] && recta[3][0]<=proyeccion[0])
		{//si lo esta entonces revisamos para y
		if(recta[2][1]>=recta[3][1])//determinamos el "y" mayor y el menor
			{//si el primero es el mayor, entonces vemos si la proyeccion en x esta en el intervalo
			if(recta[2][1]>=proyeccion[1] && recta[3][1]<=proyeccion[1])
				{//si lo esta entonces retornamos true
				return true;
				}
			else
				{//si no lo esta entonces retornamos false
				return false;
				}
			}
		else
			{//si el segundo es el mayor
			if(recta[3][1]>=proyeccion[1] && recta[2][1]<=proyeccion[1])
				{//si lo esta entonces retornamos true
				return true;
				}
			else
				{//si no lo esta entonces retornamos false
				return false;
				}
			}
		}
	else
		{//si no lo esta entonces retornamos false
		return false;
		}
	} 
	else 
	{	//si el segundo es el mayor
		if(recta[3][0]>=proyeccion[0] && recta[2][0]<=proyeccion[0])
		{//si lo esta entonces revisamos para y
		if(recta[2][1]>=recta[3][1])//determinamos el "y" mayor y el menor
			{//si el primero es el mayor, entonces vemos si la proyeccion en x esta en el intervalo
			if(recta[2][1]>=proyeccion[1] && recta[3][1]<=proyeccion[1])
				{//si lo esta entonces retornamos true
				return true;
				}
			else
				{//si no lo esta entonces retornamos false
				return false;
				}
			}
		else
			{//si el segundo es el mayor
			if(recta[3][1]>=proyeccion[1] && recta[2][1]<=proyeccion[1])
				{//si lo esta entonces retornamos true
				return true;
				}
			else
				{//si no lo esta entonces retornamos false
				return false;
				}
			}
		}
	else
		{//si no lo esta entonces retornamos false
		return false;
		}
	}
}


//funcion que dados 2 puntos, devuelve su ecuacion de la recta mas sus limites
function obtener_ec_recta(punto1,punto2)
{
var ec_recta=new Array();//el array es de la forma [m,n,coord1,coor2]
var coord1=new Array();
copiar_arreglo(coord1,punto1);
var coord2=new Array();
copiar_arreglo(coord2,punto2);
//obtiene la pendiente
m = ((coord2[1]-coord1[1])/(coord2[0]-coord1[0]));
	//obtiene el coef de posicion
n = (coord2[1] - (m*coord2[0]));
ec_recta.push(m);
ec_recta.push(n);
	if(coord1[0]<coord2[0])//ordenamos en funcion del parametro x
	{
	ec_recta.push(coord1);
	ec_recta.push(coord2);
	}
	else 
	{
	ec_recta.push(coord2);
	ec_recta.push(coord1);
	}
	return ec_recta;
}


function generar_rectas(adyacentes,posiciones)
{
var rectas=new Array();
var coord1=new Array();
var coord2=new Array();

var cant_adyacentes=adyacentes.length;
var cant_sub_ady;

	for(var i=0;i<cant_adyacentes;i++)
	{
		cant_sub_ady=adyacentes[i][1].length;//guardamos el total de conexiones que tiene el adyacente actual 
		copiar_arreglo(coord1,_.find(posiciones_prueba, function(pos){ return pos[0]== adyacentes[i][0]})[1]);//guardamos la posicion del actual en coord1
		////console.log("rectas a generar:"+cant_sub_ady);
		for(var j=0;j<cant_sub_ady;j++)//iteramos para cada adyacente
		{
		copiar_arreglo(coord2,_.find(posiciones_prueba, function(pos){ return pos[0]== adyacentes[i][1][j][0]})[1]);//guardamos la posicion del j-esimo adyacente
		rectas.push(obtener_ec_recta(coord1,coord2));		
		}
	}
return rectas;
}

function distancia_punto_recta(punto, recta)
{

var m_recta=recta[0];
var n_recta=recta[1];
var distancia;
distancia=Math.abs(m_recta*punto[0]-punto[1]+n_recta)/Math.sqrt(m_recta*m_recta+1);
return distancia;
}

function distancia_punto_punto(punto1,punto2)
{
var distancia;
distancia=Math.sqrt(Math.pow(punto1[0]-punto2[0],2)+Math.pow(punto1[1]-punto2[1],2));
return distancia;
}


function proyeccion_punto_recta(punto, recta1)
{

var recta_aux=[];//Se usa para guardar la pendiente y el coef de posición de la nueva recta que pasa por el punto y es perpendicular con la recta1
var punto2=new Array();

////console.log("recta1: Pendiente:"+recta1[0]+", Coef. Pos:"+recta1[1]);
recta_aux[0]=(-1)/recta1[0];
recta_aux[1]=punto[1]+(punto[0]/recta1[0]);

//Calculamos la interseccion de las rectas y lo guardamos en el punto2
punto2[0]=(recta1[1]-recta_aux[1])/(recta_aux[0]-recta1[0]);
punto2[1]=((recta1[1]*recta_aux[0])-(recta_aux[1]*recta1[0]))/(recta_aux[0]-recta1[0]);
return(punto2)
}

//determina si una coordenada esta dentro de un radio
function pertenece_radio(punto,punto_centro,radio)
{
if (distancia_punto_punto(punto,punto_centro)<radio)
	return true;
else return false;
}

//necesito conocer el piso de cada nodo
function ajustar_punto(punto,piso,grafo,posiciones)
{
var sub_grafo=grafo;//guardar en subgrafo el grafo correspondiente despues
var posiciones_radio=posiciones;//guardar en posiciones_radio el posiciones correspondiente a los puntos de camino que corresponda

var coord=new Array();
var coord_minimo=new Array();
var distancia_minima=999999;
var distancia;
var rectas=new Array();
rectas=generar_rectas(sub_grafo,posiciones);
var tam_rectas=rectas.length;
var tam_posiciones=posiciones_radio.length;
	//console.log(rectas);
	//comparamos la distancia del punto a cada recta del plano
	for(var i=0;i<tam_rectas;i++)
	{
	coord=proyeccion_punto_recta(punto,rectas[i]);//guardamos la proyeccion del punto sobre la recta
	//console.log("si "+coord[0]+">="+rectas[i][2][0]+" && "+coord[0]+"<="+rectas[i][3][0]);
	if(coord[0]>=rectas[i][2][0] && coord[0]<=rectas[i][3][0])//vemos si la proyeccion esta dentro de los limites de la recta
		{
		////console.log("ENTRE IF coordenadas!!!");
		distancia=distancia_punto_punto(punto,coord);//guardamos la distancia entre el punto y la proyeccion
			if(distancia_minima>distancia)//si la distancia al punto es menor que la distancia minima anterior reemplaza la distancia minima y guarda la proyeccion
			{
			////console.log("ENTRE IF DISTANCIA!!!");
			distancia_minima=distancia;
			coord_minimo[0]=coord[0];
			coord_minimo[1]=coord[1];
			}
		}
	}
	
	//comparamos cada radio
	for(var i=0;i<tam_posiciones;i++)
	{
		if(pertenece_radio(punto,posiciones_radio[i][1],1))//Aqui modificamos el radio, que por ahora es fijo
		{
		coord_minimo[0]=posiciones_radio[i][1][0];
		coord_minimo[1]=posiciones_radio[i][1][1];
		}
	}
	return coord_minimo;
}
