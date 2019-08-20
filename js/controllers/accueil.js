module.exports = function ($rootScope, $scope, $http, $sce,Navbar, MenuFooter) {
    Navbar.setBack(false); //Bouton retour
    Navbar.setDefautTitre(true);
    MenuFooter.setState(false);

    $scope.shortListProjet = [
        {
            "id" : 0,
            "Titre" : "Ascor",
            "desc" : "Coordinateur - developpeur fullstack. App mobile dédiée à la d'études épidemologiques et à la sensibilisation du publique",
            "motscle" : "APP, BACKEND, END-TO-END encryption, donnée de santé, Angular, Cordova, PHP"
        },
        {
            "id" : 1,
            "Titre" : "Pertusatu",
            "desc" : "Developpeur fullstack Webapp + software. Logiciel de rédaction et d'évaluation des planifications, appliqué à la gestion des aires protégées ",
            "motscle" : "WEBAPP, ELECTRON, API, Angular "
        },
        {
            "id" : 2,
            "Titre" : "ComCOm Centre Corse",
            "desc" : "Developpeur fullstack app + integrateur. Appli de sensibilisation au tri séléctif + integration du site ",
            "motscle" : "APP, Carte online, Carte offline, Geolocalisation, itinéraires, caméra, API"
        }
    ]
};