    data = new Object();
    data.posicion = [500, 450];
    data.estacionamiento = [400, 300];
    data.nombre_recinto = "Universidad1";
    data.piso_actual = "0";
    data.pisos = [];
    data.destinos = [];
    data.ruta = [];
    data.nodos = {};
    data.nodos["etiquetas"] = [];
    data.nodos["posicion"] = [];
    //agregar variable al final de adyacencia, booleano de si es es PT
    data.nodos["adyacencia"] = [];
    data.nodos["PT"] = [];
    data.svg = new Object();
    data.svg.pisos = [];
    data.ready = false;
    data.geolocalizar = false;
    data.id_tienda_descripcion = -1;
    data.idioma = "Castellano";

    function toggleDescripcion(){
        $(".screen").addClass("inv");
        $("#descripcion").removeClass("inv");
    }

    function setUserPosition(x,y){
        data.posicion = [x,y];
    }

    function viewDescription(id){
        data.id_tienda_descripcion = id;
        tienda = _.filter(data.nodos["etiquetas"], function(pi){
            return pi.id==id;
        });

        $("#nombre_desc").html(tienda[0].nombre);
        $("#descripcion_desc").html(tienda[0].descripcion);
        toggleDescripcion();
    }

    function get_posiciones(){
        var nodos = [], reg =[];
        //"php/nodos_posicion.php"
        nodos = [{"IdNodo":"87","X":"359","Y":"65"},{"IdNodo":"88","X":"261","Y":"175"},{"IdNodo":"89","X":"158","Y":"201"},{"IdNodo":"90","X":"393","Y":"380"},{"IdNodo":"91","X":"435","Y":"342"},{"IdNodo":"92","X":"502","Y":"379"},{"IdNodo":"93","X":"544","Y":"371"},{"IdNodo":"94","X":"75","Y":"214"},{"IdNodo":"95","X":"484","Y":"515"},{"IdNodo":"118","X":"390","Y":"74"},{"IdNodo":"119","X":"243","Y":"240"},{"IdNodo":"120","X":"211","Y":"246"},{"IdNodo":"121","X":"416","Y":"392"},{"IdNodo":"122","X":"452","Y":"351"},{"IdNodo":"123","X":"474","Y":"346"},{"IdNodo":"124","X":"522","Y":"339"},{"IdNodo":"125","X":"78","Y":"234"},{"IdNodo":"126","X":"483","Y":"462"},{"IdNodo":"127","X":"92","Y":"287"},{"IdNodo":"128","X":"214","Y":"262"},{"IdNodo":"129","X":"245","Y":"255"},{"IdNodo":"130","X":"425","Y":"208"},{"IdNodo":"131","X":"463","Y":"348"},{"IdNodo":"132","X":"472","Y":"379"},{"IdNodo":"133","X":"496","Y":"456"},{"IdNodo":"134","X":"507","Y":"499"},{"IdNodo":"135","X":"556","Y":"485"},{"IdNodo":"136","X":"514","Y":"340"},{"IdNodo":"137","X":"476","Y":"200"},{"IdNodo":"614","X":"530","Y":"302"},{"IdNodo":"615","X":"525","Y":"284"},{"IdNodo":"616","X":"533","Y":"322"},{"IdNodo":"617","X":"524","Y":"274"},{"IdNodo":"618","X":"579","Y":"473"},{"IdNodo":"619","X":"524","Y":"274"},{"IdNodo":"620","X":"579","Y":"473"},{"IdNodo":"624","X":"543.929","Y":"91.696"},{"IdNodo":"625","X":"433.929","Y":"169.696"},{"IdNodo":"649","X":"195.929","Y":"144.696"},{"IdNodo":"650","X":"343.929","Y":"107.696"}];
        for(index in nodos)
        {
            data.nodos["posicion"].push([nodos[index]["IdNodo"],[nodos[index]["X"],nodos[index]["Y"]]]);
        }
    }

    function toggle_geolocalizar(){
        if(data.geolocalizar) data.geolocalizar = false;
        else data.geolocalizar = true;
    }
        
    var reg = [];
    function get_pisos(){
        var pisos = {}, regiones=[], caminos=[];
        //conseguir los pisos asociados a el recinto
        data.pisos = [{"NroNivel":"1","IdNivel":"58"},{"NroNivel":"2","IdNivel":"62"}];
        //"php/regiones_nivel.php"
        regiones = [{"IdNodo":"88","Region":"M,205,128,L,233,242,L,317,223,L,286,111,L,205,128","NroNivel":"1"},{"IdNodo":"89","Region":"M,196,130,L,223,243,L,109,268,L,82,156,L,196,130","NroNivel":"1"},{"IdNodo":"90","Region":"M,363,357,L,404,349,L,426,431,L,404,435,L,394,398,L,375,402,L,363,357","NroNivel":"1"},{"IdNodo":"91","Region":"M,415,312,L,442,307,L,461,378,L,436,384,L,415,312","NroNivel":"1"},{"IdNodo":"92","Region":"M,464,300,L,498,293,L,545,466,L,515,473,L,464,300","NroNivel":"1"},{"IdNodo":"93","Region":"M,523,327,L,539,394,L,564,386,L,547,321,L,523,327","NroNivel":"1"},{"IdNodo":"94","Region":"M,87,181,L,51,189,L,64,236,L,100,229,L,87,181","NroNivel":"1"},{"IdNodo":"95","Region":"M,440,394,L,463,388,L,496,507,L,580,491,L,585,506,L,477,528,L,440,394","NroNivel":"1"},{"IdNodo":"87","Region":"M,78,140,L,482,57,L,474,31,L,73,117,L,78,140","NroNivel":"1"},{"IdNodo":"614","Region":"M,517.109375,287.5,L,536.109375,282.5,L,545.109375,314.5,L,522.109375,320.5,L,517.109375,287.5","NroNivel":"2"}];
        
        regiones = _.groupBy(regiones, function(region){ 
            return region.NroNivel; 
        });

        aux = [];

        _.each(regiones, function(region){
            piso = {nivel: region[0]["NroNivel"], regiones: []} 
            _.each(region, function(reg){
                piso.regiones.push({id:reg.IdNodo, region:reg.Region});
            });
            aux.push(piso);
        });
        data.svg.pisos = aux;
    }

    function existe(id_nodo){
        var existe = false;
        for(index in data.nodos["adyacencia"])
            if(data.nodos["adyacencia"][index][0]==id_nodo)
                existe = true;
        return existe;
    }

    function agregar_nodo(id_nodo){
        data.nodos["adyacencia"].push([parseInt(id_nodo),[]]);
    }

    function agregar(id_nodo, camino){
        for(index in data.nodos["adyacencia"])
            if(data.nodos["adyacencia"][index][0]==id_nodo)
                data.nodos["adyacencia"][index][1].push(camino);
    }

    function agregar_adyacencia(adyacencia){
        nodo_a = adyacencia["IdNodoA"], nodo_b = adyacencia["IdNodoB"];
        //verificar existencia de ambos nodos, sino agregar
        if(!existe(nodo_a))
            agregar_nodo(nodo_a);

        if(!existe(nodo_b))
            agregar_nodo(nodo_b);
        
        //buscar tipo de adyacencia
        agregar(nodo_a, [parseInt(nodo_b), parseFloat(adyacencia["PesoCamino"])]);
    }

    function get_adyacentes(){
        arreglo = [], aux = [];
        //"php/nodos_adyacencia.php"
        tiendas = [{"IdNodoA":"87","IdNodoB":"118","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"88","IdNodoB":"119","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"89","IdNodoB":"120","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"90","IdNodoB":"121","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"91","IdNodoB":"122","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"92","IdNodoB":"123","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"93","IdNodoB":"124","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"94","IdNodoB":"125","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"95","IdNodoB":"126","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"118","IdNodoB":"87","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"118","IdNodoB":"130","Direccion":"1","PesoCamino":"138.49548729110273"},{"IdNodoA":"119","IdNodoB":"129","Direccion":"1","PesoCamino":"15.132745950421556"},{"IdNodoA":"119","IdNodoB":"88","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"120","IdNodoB":"89","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"120","IdNodoB":"128","Direccion":"1","PesoCamino":"16.278820596099706"},{"IdNodoA":"121","IdNodoB":"132","Direccion":"1","PesoCamino":"57.48912940721924"},{"IdNodoA":"121","IdNodoB":"90","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"122","IdNodoB":"131","Direccion":"1","PesoCamino":"11.40175425099138"},{"IdNodoA":"122","IdNodoB":"91","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"123","IdNodoB":"131","Direccion":"1","PesoCamino":"11.180339887498949"},{"IdNodoA":"123","IdNodoB":"92","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"124","IdNodoB":"136","Direccion":"1","PesoCamino":"8.06225774829855"},{"IdNodoA":"124","IdNodoB":"93","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"125","IdNodoB":"94","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"125","IdNodoB":"127","Direccion":"1","PesoCamino":"54.817880294662984"},{"IdNodoA":"126","IdNodoB":"133","Direccion":"1","PesoCamino":"14.317821063276353"},{"IdNodoA":"126","IdNodoB":"95","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"127","IdNodoB":"128","Direccion":"1","PesoCamino":"124.53513560437472"},{"IdNodoA":"127","IdNodoB":"125","Direccion":"1","PesoCamino":"54.817880294662984"},{"IdNodoA":"128","IdNodoB":"127","Direccion":"1","PesoCamino":"124.53513560437472"},{"IdNodoA":"128","IdNodoB":"120","Direccion":"1","PesoCamino":"16.278820596099706"},{"IdNodoA":"128","IdNodoB":"129","Direccion":"1","PesoCamino":"31.78049716414141"},{"IdNodoA":"129","IdNodoB":"130","Direccion":"1","PesoCamino":"186.03494295427404"},{"IdNodoA":"129","IdNodoB":"128","Direccion":"1","PesoCamino":"31.78049716414141"},{"IdNodoA":"129","IdNodoB":"119","Direccion":"1","PesoCamino":"15.132745950421556"},{"IdNodoA":"130","IdNodoB":"131","Direccion":"1","PesoCamino":"145.06550244630873"},{"IdNodoA":"130","IdNodoB":"118","Direccion":"1","PesoCamino":"138.49548729110273"},{"IdNodoA":"130","IdNodoB":"129","Direccion":"1","PesoCamino":"186.03494295427404"},{"IdNodoA":"130","IdNodoB":"137","Direccion":"1","PesoCamino":"51.62363799656123"},{"IdNodoA":"131","IdNodoB":"132","Direccion":"1","PesoCamino":"32.28002478313795"},{"IdNodoA":"131","IdNodoB":"130","Direccion":"1","PesoCamino":"145.06550244630873"},{"IdNodoA":"131","IdNodoB":"122","Direccion":"1","PesoCamino":"11.40175425099138"},{"IdNodoA":"131","IdNodoB":"123","Direccion":"1","PesoCamino":"11.180339887498949"},{"IdNodoA":"132","IdNodoB":"131","Direccion":"1","PesoCamino":"32.28002478313795"},{"IdNodoA":"132","IdNodoB":"133","Direccion":"1","PesoCamino":"80.65358020571685"},{"IdNodoA":"132","IdNodoB":"121","Direccion":"1","PesoCamino":"57.48912940721924"},{"IdNodoA":"133","IdNodoB":"134","Direccion":"1","PesoCamino":"44.384682042344295"},{"IdNodoA":"133","IdNodoB":"126","Direccion":"1","PesoCamino":"14.317821063276353"},{"IdNodoA":"133","IdNodoB":"132","Direccion":"1","PesoCamino":"80.65358020571685"},{"IdNodoA":"134","IdNodoB":"133","Direccion":"1","PesoCamino":"44.384682042344295"},{"IdNodoA":"134","IdNodoB":"135","Direccion":"1","PesoCamino":"50.96076922496363"},{"IdNodoA":"135","IdNodoB":"620","Direccion":"1","PesoCamino":"25.942243542145693"},{"IdNodoA":"135","IdNodoB":"134","Direccion":"1","PesoCamino":"50.96076922496363"},{"IdNodoA":"135","IdNodoB":"620","Direccion":"1","PesoCamino":"25.942243542145693"},{"IdNodoA":"135","IdNodoB":"136","Direccion":"1","PesoCamino":"150.9602596712128"},{"IdNodoA":"136","IdNodoB":"619","Direccion":"1","PesoCamino":"66.75327707311455"},{"IdNodoA":"136","IdNodoB":"619","Direccion":"1","PesoCamino":"66.75327707311455"},{"IdNodoA":"136","IdNodoB":"135","Direccion":"1","PesoCamino":"150.9602596712128"},{"IdNodoA":"136","IdNodoB":"137","Direccion":"1","PesoCamino":"145.06550244630873"},{"IdNodoA":"136","IdNodoB":"124","Direccion":"1","PesoCamino":"8.06225774829855"},{"IdNodoA":"137","IdNodoB":"130","Direccion":"1","PesoCamino":"51.62363799656123"},{"IdNodoA":"137","IdNodoB":"136","Direccion":"1","PesoCamino":"145.06550244630873"},{"IdNodoA":"615","IdNodoB":"614","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"615","IdNodoB":"614","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"616","IdNodoB":"614","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"616","IdNodoB":"614","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"617","IdNodoB":"615","Direccion":"1","PesoCamino":"10.04987562112089"},{"IdNodoA":"617","IdNodoB":"615","Direccion":"1","PesoCamino":"10.04987562112089"},{"IdNodoA":"618","IdNodoB":"616","Direccion":"1","PesoCamino":"157.851195750935"},{"IdNodoA":"618","IdNodoB":"616","Direccion":"1","PesoCamino":"157.851195750935"},{"IdNodoA":"619","IdNodoB":"617","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"619","IdNodoB":"617","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"620","IdNodoB":"618","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"620","IdNodoB":"618","Direccion":"1","PesoCamino":"0"},{"IdNodoA":"625","IdNodoB":"624","Direccion":"1","PesoCamino":"134.84808754249397"},{"IdNodoA":"625","IdNodoB":"624","Direccion":"1","PesoCamino":"134.84808754249397"}];

        for(index in tiendas){
            agregar_adyacencia(tiendas[index]);
        }
    }

    function get_puntos_transicion(){
        //"php/PT_pisos.php"
        tiendas = [{"IdNodo":"118","NroNivel":"1"},{"IdNodo":"119","NroNivel":"1"},{"IdNodo":"120","NroNivel":"1"},{"IdNodo":"121","NroNivel":"1"},{"IdNodo":"122","NroNivel":"1"},{"IdNodo":"123","NroNivel":"1"},{"IdNodo":"124","NroNivel":"1"},{"IdNodo":"125","NroNivel":"1"},{"IdNodo":"126","NroNivel":"1"},{"IdNodo":"127","NroNivel":"1"},{"IdNodo":"128","NroNivel":"1"},{"IdNodo":"129","NroNivel":"1"},{"IdNodo":"130","NroNivel":"1"},{"IdNodo":"131","NroNivel":"1"},{"IdNodo":"132","NroNivel":"1"},{"IdNodo":"133","NroNivel":"1"},{"IdNodo":"134","NroNivel":"1"},{"IdNodo":"135","NroNivel":"1"},{"IdNodo":"136","NroNivel":"1"},{"IdNodo":"137","NroNivel":"1"},{"IdNodo":"615","NroNivel":"2"},{"IdNodo":"616","NroNivel":"2"},{"IdNodo":"617","NroNivel":"2"},{"IdNodo":"618","NroNivel":"2"},{"IdNodo":"619","NroNivel":"1"},{"IdNodo":"620","NroNivel":"1"},{"IdNodo":"624","NroNivel":"1"},{"IdNodo":"625","NroNivel":"1"},{"IdNodo":"649","NroNivel":"2"},{"IdNodo":"650","NroNivel":"2"}];
        data.nodos['PT'] = [];
        for(index in tiendas)
            data.nodos['PT'].push({"id": tiendas[index].IdNodo, "nivel": tiendas[index].NroNivel});
    }

    function get_etiquetas(){
        arreglo = [], aux = [];
        //"php/recintos_con_tags_json.php"
        tiendas = [{"NroNivel":"1","Nombre":"Biblioteca","Descripcion_es":"Biblioteca del campus","IdNodo":"87","NroDeEtiquetas":"6","Etiquetas":"Ba\u00f1o, Cajero, Cuaderno, Mesa"},{"NroNivel":"1","Nombre":"Lab","Descripcion_es":"LPA, LDS","IdNodo":"88","NroDeEtiquetas":"5","Etiquetas":"Ba\u00f1o, Cajero, Mesa, Pizarra, Silla"},{"NroNivel":"1","Nombre":"Casino","Descripcion_es":"Casino y terraza","IdNodo":"90","NroDeEtiquetas":"5","Etiquetas":"Ba\u00f1o, Cajero, Mesa, Pizarra, Silla"},{"NroNivel":"1","Nombre":"Sala A-1","Descripcion_es":"Sala con cupo de 80 alumnos","IdNodo":"91","NroDeEtiquetas":"7","Etiquetas":"Ba\u00f1o, Cajero, Cuaderno, Librer\u00eda, Mesa, Pizarra, Sala"},{"NroNivel":"1","Nombre":"Salas B","Descripcion_es":"Salas detinadas para clases de trabajo en grupo","IdNodo":"93","NroDeEtiquetas":"4","Etiquetas":"Cuaderno, Librer\u00eda, Pizarra, Silla"}];

        for(index in tiendas){
            data.nodos["etiquetas"].push({"id":tiendas[index]["IdNodo"], "nombre": tiendas[index]["Nombre"], "descripcion": tiendas[index]["Descripcion_es"],"categorias": tiendas[index]["Etiquetas"].split(", "), "seleccionada": false, "agregada": false});
        }
    }

    function ruta_a_posiciones(ruta){
        return _.map(ruta, function(punto){
            return posicion_desde_(punto);
        });
    }

    function posicion_desde_(punto){
        if(_.find(data.nodos.posicion, function(pos){return pos[0] == punto;}) != undefined)
            return _.find(data.nodos.posicion, function(pos){return pos[0] == punto;})[1];
        else if(punto == -1)
            return data.posicion;
        else if(punto == -2)
            return data.estacionamiento;
        else
            return;
    }

    function GetURLParameter(sParam){
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                return sParameterName[1];
            }
        }
    }

    setInterval(function(){activar_geolocalizacion();}, 5000);