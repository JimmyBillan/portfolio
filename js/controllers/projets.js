module.exports = function ($rootScope, $scope, $http, $sce,$timeout, Caching, Navbar, MenuFooter) {
    Navbar.setBack(false); //Bouton retour
    Navbar.setTitle("Mes projets"); //Bouton retour
    MenuFooter.setState(false);

    $scope.longListProjet = Caching.getlongListProjet();
    console.log( $scope.longListProjet);
    if($scope.longListProjet == null){
        api_getlongListProjet();
    }else{
        $timeout(function(){
            api_getlongListProjet();
        }, 2000)
    }

    function api_getlongListProjet(){
        $http({
            url: $rootScope.urlOrigin + '/assets/projets.json',
            method: 'GET',
            cache: false,
            responseType: 'json'
        }).then(function(res){
            Caching.setlongListProjet(res.data)
            $scope.longListProjet = Caching.getlongListProjet();
        }, function (responseError) {
            console.error(responseError);
        });
    }
};