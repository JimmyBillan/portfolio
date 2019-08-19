module.exports = function ($rootScope,$timeout, $http, $scope, $location, Caching, MenuFooter) {
    // hardcoded initial menu 
    
    $scope.menuisdown = true;

    $scope.clickMenuToggle = function(){
        MenuFooter.setState($scope.menuisdown);
    }
    
    
    $scope.menuLink = function(path){
        $scope.menuisdown = true;
        $location.path(path);
    }
    
    $scope.strucMenu = Caching.getMenuFooter();

    if($scope.strucMenu == null){
        api_getMenu()
    }else{
        $timeout(function(){
            api_getMenu();
        }, 2000)
    }

    $scope.$watch(function () { return MenuFooter.getState();         }, function (value) {
        $scope.menuisdown = !value;
    });

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
