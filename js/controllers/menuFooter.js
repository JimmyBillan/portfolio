module.exports = function ($rootScope, $http, $scope, $location, Caching) {
    // hardcoded initial menu 
    
    $scope.menuisdown = true;

    $scope.clickMenuToggle = function(){
        $scope.menuisdown = !$scope.menuisdown;
    }
    
    
    $scope.menuLink = function(path){
        $scope.menuisdown = true;
        $location.path(path);
    }
    
    $scope.strucMenu = Caching.getMenuFooter();

    if($scope.strucMenu == null){
        api_getMenu()
    }

    function api_getMenu(){
        $http({
            url: $rootScope.urlOrigin + '/assets/menufooter.json?no-cache='+Date.now(),
            method: 'GET',
            cache: false,
            responseType: 'json'
        }).then(function(res){
            Caching.setMenuFooter(res.data)
            $scope.strucMenu = Caching.getMenuFooter();
        }, function (responseError) {
            console.error(responseError);
        });
    }
};
