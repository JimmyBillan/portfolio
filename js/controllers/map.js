module.exports = function ($rootScope, $scope,$timeout, $http, $sce,Navbar, MenuFooter) {
    Navbar.setBack(false); //Bouton retour
    Navbar.setDefautTitre(true);
    MenuFooter.setState(false);

    $scope.mapboxglloaded = function(){
        console.log("print carte");

        $scope.tokenMapBox = 'pk.eyJ1IjoiamltbXlpcyIsImEiOiJjanpqamxldXQwOXlpM25vOTE1MGFvaGQ3In0.KC8ukxbzY7TckjzJVxvowA'
        mapboxgl.accessToken = $scope.tokenMapBox;
    
        var map = new mapboxgl.Map({
            container: 'mapboxgl', // container id
            style: 'mapbox://styles/mapbox/streets-v9',
    
    
            center: [  7.808786449543732,42.76025212400842],
            //center: [8.940269, 42.634272], // starting position
            zoom: 6.605, // starting zoom,
            pitch: 60,
            bearing: -58.80000000000019,
            maxZoom: 12
        });

        map.on('load', function (isLoad) {
            map.loadImage('img/logo-aurore.png', function (error, image) {
                if (error) throw error;
                map.addImage('logo-aurore', image);
                
                map.addLayer({
                    "id": "logoaurore",
                    "type" :"symbol",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                              "type": "Point",
                              "coordinates": [ 2.718925, 44.469747]
                            }
                          }
                    },
                    "layout": {
                        "icon-image": "logo-aurore",
                        "icon-size": 0.5,
                    },
                });
            })

            map.loadImage('img/moi-rounded.png', function (error, image) {
                if (error) throw error;
                map.addImage('moirounde', image);
                
                map.addLayer({
                    "id": "moi",
                    "type" :"symbol",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                              "type": "Point",
                              "coordinates": [ 9.152984619140625, 42.300166757606]
                            }
                          }
                    },
                    "layout": {
                        "icon-image": "moirounde",
                        "icon-size": 0.4,
                    },
                });

                $timeout(function(){
                    map.flyTo({
                        center: [ 9.152984619140625, 42.300166757606],
                        zoom: 13,
                    });

                    map.once('moveend', function(){
                        map.flyTo({
                            center: [ 2.718925, 44.469747],
                            zoom: 13,
                        });
                        map.once('moveend', function(){
                            map.flyTo({
                                center: [  7.808786449543732,42.76025212400842],
                                zoom: 6.06,
                            });
                        })
                    })
                },1000)
            })
        })
    }


    $scope.loadScript = function(url, type, charset) {
        if (type===undefined) type = 'text/javascript';
        if (url) {
            var script = document.querySelector("script[src*='"+url+"']");
            if (!script) {
                var heads = document.getElementsByTagName("head");
                if (heads && heads.length) {
                    var head = heads[0];
                    if (head) {
                        script = document.createElement('script');
                        script.onload = function(){
                            $scope.mapboxglloaded();
                        }
                        script.setAttribute('src', url);
                        script.setAttribute('type', type);
                        if (charset) script.setAttribute('charset', charset);
                        head.appendChild(script);
                    }
                }
            }else{
                $scope.mapboxglloaded();
            }
            return script;
        }
    };

    $scope.loadScript('https://api.tiles.mapbox.com/mapbox-gl-js/v1.2.1/mapbox-gl.js', 'text/javascript', 'utf-8');

   
};