var appControllers = angular.module('appControllers', []);

appControllers.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();        
    }; 
}])

appControllers.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
            $log.debug("close LEFT is done");            
        });        
    };
    
    $scope.menus = [{
      //icone : imagePath,      
      titulo: "Mapa"
    }, {
      //icone : imagePath,      
      titulo: "Agenda"
    }, {
      //icone : imagePath,      
      titulo: "Eventos"
    }];
  });
  
appControllers.controller('Mapa', function($scope){
        
        var map = null;
        var myLocation = null;
        
        $scope.height = window.innerHeight - document.getElementsByTagName('md-toolbar')[0].clientHeight;
        
        //alert(document.getElementsByTagName('md-toolbar')[0].clientHeight);
        //alert(window.innerHeight);
                        
        document.addEventListener("deviceready", function () {
                               
            // Define tamanho do mapa pra tela toda - altura do top header
            //document.getElementById("map_canvas").height = '500px';
                                        
            var div = document.getElementById("map_canvas");
        
            map = plugin.google.maps.Map.getMap(div, {
                'controls': {
                    'compass': true,
                    'myLocationButton': true,
                    'indoorPicker': true,
                    'zoom': true
                }
            });
            map.addEventListener(plugin.google.maps.event.MAP_READY, function(map){

                // Seta o foco do mapa no local atual do usuário/GPS
                map.getMyLocation(function (location) 
                {
                    myLocation = location.latLng;

                    map.animateCamera({                
                        'target': {
                            lat: location.latLng.lat,
                            lng: location.latLng.lng
                        },
                        'tilt': 60,
                        'zoom': 18,
                        'bearing': 140
                    });
                }, 
                function (location) 
                {
                    var msg = ["Localidade:\n",
                                "latitude:" + location.latLng.lat,
                                "longitude:" + location.latLng.lng,
                                "speed:" + location.speed,
                                "time:" + location.time,
                                "bearing:" + location.bearing].join("\n").toString();            

                    alert("Erro: Impossível determinar localização\n" + msg);
                });

                // Markers
                // TODO: Implementar serviço REST para buscar markers/trucks
                var trucks = [
                    {"latlng":[-15.879222, -48.012081], name:"Burguer Truck", snippet:"Hoje, 14:00 - 20:00"},
                    {"latlng":[-15.878773, -48.014715], name:"Chili na Rua", snippet:"Hoje, 14:00 - 20:00"},
                    {"latlng":[-15.881348, -48.014130], name:"Sushi Truck", snippet:"Hoje, 14:00 - 20:00"},
                    {"latlng":[-15.883304, -48.012301], name:"Sucopira", snippet:"Hoje, 14:00 - 20:00"},
                ];

                // Itera a lista de markers e adiciona os markers no mapa
                var bounds = trucks.map(function(info) {
                    var latLng = new plugin.google.maps.LatLng(info.latlng[0], info.latlng[1]);

                    map.addMarker({
                        "position": latLng,
                        "title": info.name,
                        "snippet": info.snippet,
                        icon: "orange"
                    }, function(marker) {
                            marker.showInfoWindow();

                            // Ao clicar no info window (balão informativo) acima
                            // do marker, abre sistema de navegação do aparelho
                            marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function() {
                                plugin.google.maps.external.launchNavigation({
                                    "from": myLocation,
                                    "to": latLng
                                });
                            });
                        }
                    );                

                    return latLng;
                });

                map.moveCamera({
                    "target": bounds
                });
            });
            
            $scope.map = map;
            
        }, false);
                        
    console.log("Carregou Mapa (route)");
});

appControllers.controller('Cardapio', function($scope, $routeParams){    
    $scope.id = $routeParams.id;
    console.log("Carregou Cardapio (route)");
});

appControllers.controller('WidthDemoCtrl', DemoCtrl);
function DemoCtrl($mdDialog) {
  var vm = this;
  this.announceClick = function(index) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('You clicked!')
        .content('You clicked the menu item at index ' + index)
        .ok('Nice')
    );
  };
}
;
