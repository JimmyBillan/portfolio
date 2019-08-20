'use strict';

window.env = "web";
 
if(typeof is == "undefined"){
    window.is = require('is_js');
}

if(window.env == "web"){
    document.addEventListener("DOMContentLoaded", function() {
        var domElement = document.getElementsByTagName('html')[0];
        angular.bootstrap(domElement, ["jimPortfolio"]);
    
    }, false);
}

window.PullToRefresh = require('pulltorefreshjs');

var angular = require('angular');
var mApp = angular.module('jimPortfolio', [require('angular-route')]);

mApp.config(function ($logProvider) {
    $logProvider.debugEnabled(false);
});

require('./services');
require('./controllers');

mApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode = true;
    $routeProvider
        .when('/', {
            templateUrl: 'views/accueil.html',
            controller: 'accueil',
            authorize : ["auth", "non-auth"]
        })
        .when('/projets', {
            templateUrl: 'views/projets.html',
            controller: 'projets',
            authorize : ["auth", "non-auth"]
        })
        .when('/projet/:idProjet', {
            templateUrl: 'views/projet.html',
            controller: 'projet',
            authorize : ["auth", "non-auth"]
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'contact',
            authorize : ["auth", "non-auth"]
        })
        .when('/map', {
            templateUrl: 'views/map.html',
            controller: 'map',
            authorize : ["auth", "non-auth"]
        })       
        .otherwise({
            redirectTo: '/'
        });
});

mApp.filter('trusted', ['$sce', function($sce) {
    var div = document.createElement('div');
    return function(text) {
        div.innerHTML = text;
        return $sce.trustAsHtml(div.textContent);
    };
}])


mApp.run(function ($rootScope, $location ) {
    $rootScope.env = window.env;
    $rootScope.urlOrigin = "";

    /**
     * EVENT BACK 
     */
    $rootScope.back = function(){
        window.history.back();
    }
    /**
     * ROUTING Securisé
     */

    $rootScope.$on("$routeChangeStart", function(evt, to, from){
        if (typeof to.authorize === "object")
        {
            to.resolve = to.resolve || {};
            if (!to.resolve.authorizationResolver)
            {
                to.resolve.authorizationResolver = function(authService) {
                    return authService.authorize(to.authorize, to.params);
                };
            }
        }
    });

    $rootScope.$on("$routeChangeError", function(evt, to, from, error){
        if (error instanceof AuthorizationError)
        {
            $location.path("/");
        }
        if (error instanceof AuthorizationErrorRedirectAuthPage)
        {
            $location.path(error.url);
        }
    });

});



mApp.service("authService", function($q, $timeout){
    var self = this;
    this.authenticated = false;
    this.authorize = function(roles, params) {

        return this
            .getInfo(roles, params)
            .then(function(canOpenPage){
                if (canOpenPage.ok == true){
                    return true;
                }else{
                    if(canOpenPage.redirect == undefined){
                        throw new AuthorizationError();
                    }else{
                        throw new AuthorizationErrorRedirectAuthPage(canOpenPage.redirect);
                    }

                }


            });
    };
    this.getInfo = function(roles, params) {

        return $timeout(function(){
            return {"ok" :true};
        }, 1);
    };
});

function AuthorizationError(description) {
    this.message = "Forbidden";
    this.description = description || "User authentication required.";
}

AuthorizationError.prototype = Object.create(Error.prototype);
AuthorizationError.prototype.constructor = AuthorizationError;

function AuthorizationErrorRedirectAuthPage(url) {
    this.url = url;
}

AuthorizationErrorRedirectAuthPage.prototype = Object.create(Error.prototype);
AuthorizationErrorRedirectAuthPage.prototype.constructor = AuthorizationErrorRedirectAuthPage;
