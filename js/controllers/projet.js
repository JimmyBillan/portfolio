module.exports = function ($rootScope, $scope, $http, $sce, $routeParams, $timeout,  Navbar, Caching) {
    Navbar.setBack(true); //Bouton retour
    Navbar.setTitle("Chargement en cours"); //Bouton retour    

    try {
        $scope.page = {};
        $scope.page.body_trusted = $sce.trustAsHtml("<article class=\"section\">\r\n<div class=\"pageTitre\">\r\n<h1>Chargement en cours<\/h1>\r\n<hr \/><\/article>");
       // $scope.page = verifyAndSecure(Caching.getActu($routeParams.idActu)); 
    }catch (error){console.error(error);}


    $scope.page = Caching.getProjetById($routeParams.idProjet);
    
    if($scope.page == null){
        api_getProjetById();
    }else{
        Navbar.setTitle($scope.page.Titre);
        if(typeof $scope.page.html !="undefined"){
            $scope.page.body_trusted = $sce.trustAsHtml($scope.page.html);
        }
        $timeout(function(){
            api_getProjetById();
        }, 2000)
    }

    function api_getProjetById(){
        $http({
            url: $rootScope.urlOrigin + '/assets/projets/'+$routeParams.idProjet+'.json',
            method: 'GET',
            cache: false,
            responseType: 'json'
        }).then(function(res){
            Caching.setProjetById(res.data.id, res.data)
            $scope.page = Caching.getProjetById($routeParams.idProjet);
            if(typeof $scope.page.html !="undefined"){
                $scope.page.body_trusted = $sce.trustAsHtml($scope.page.html);
            }
            Navbar.setTitle($scope.page.Titre);

        }, function (responseError) {
            console.error(responseError);
        });
    }
};