module.exports = function ($scope, Navbar) {
    $scope.mNavbarbutton = {};
    $scope.mNavbarbutton.title = "Portfolio de Jimmy Billan";
    $scope.mNavbarbutton.title_noButton = true;
    $scope.mNavbarbutton.back = false;
    $scope.level0navbar = true;
    $scope.defaultTitle = false;

    $scope.$watch(function () { return Navbar.getTitleDefault();         }, function (value) {
        $scope.defaultTitle = value;
    });

    $scope.$watch(function () { return Navbar.getTitle();         }, function (value) {
        $scope.mNavbarbutton.title = value;
    });

    $scope.$watch(function () { return Navbar.getBack();         }, function (value) {
        $scope.mNavbarbutton.title_noButton = !value;
        $scope.mNavbarbutton.back = value;
    });

}