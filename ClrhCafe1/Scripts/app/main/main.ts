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
            navigationService: Common.INavigationService,
            rootUrl: string) {

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
                    description: "API の呼び出し",
                    callback: (event: Event) => {
                        $http.get(rootUrl + "/home/test")
                            .then(
                            (response: ng.IHttpPromiseCallbackArg<{}>) => {
                                alert(response.data);
                            });
                    }
                });

        }

    }

    angular.module("app")
        .controller("mainController",
        ["$scope", "$http", "hotkeys", "navigationService", "rootUrl", MainController])
        .directive("appMain",
        () => {
            return {
                controller: "mainController as main"
            };
        });

}
