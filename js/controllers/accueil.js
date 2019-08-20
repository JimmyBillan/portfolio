module.exports = function ($rootScope, $scope, $http, $timeout,$sce,Navbar, MenuFooter, Caching) {
    Navbar.setBack(false); //Bouton retour
    Navbar.setDefautTitre(true);
    MenuFooter.setState(false);

    $scope.shortListProjet = Caching.getshortListProjet();
    if($scope.shortListProjet == null){
        api_getShortListProjet();
    }else{
        $timeout(function(){
            api_getShortListProjet();
        }, 2000)
    }

    function api_getShortListProjet(){
        $http({
            url: $rootScope.urlOrigin + '/assets/projets_shortlist.json',
            method: 'GET',
            cache: false,
            responseType: 'json'
        }).then(function(res){
            Caching.setshortListProjet(res.data)
            $scope.shortListProjet = Caching.getshortListProjet();
        }, function (responseError) {
            console.error(responseError);
        });
    }
};