"use strict";
/**
 * メイン
 * @preferred
 */
module App.Main {
    "use strict";

    export class MainController {

        constructor(
            $scope: ng.IScope,
            $http: ng.IHttpService,
            hotkeys: angular.hotkeys.HotkeysProvider,
            navigationService: Common.INavigationService) {

            hotkeys.bindTo($scope)
                .add(
                {
                    combo: "a",
                    allowIn: ["INPUT"],
                    description: "製品情報に移動",
                    callback: (event: Event) => {
                        navigationService.goAbout();
                    }
                })
                .add(
                {
                    combo: "s",
                    allowIn: ["INPUT"],
                    description: "bing に問い合わせしてAPIの代替",
                    callback: (event: Event) => {
                        $http.get("http://www.bing.com/");
                    }
                });

        }

    }

    angular.module("app")
        .controller("mainController", ["$scope", "$http", "hotkeys", "navigationService", MainController])
        .directive("appMain",
        () => {
            return {
                controller: "mainController as main"
            };
        });

}
