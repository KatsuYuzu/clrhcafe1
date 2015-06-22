"use strict";
/**
 * メイン
 * @preferred
 */
var App;
(function (App) {
    var Main;
    (function (Main) {
        "use strict";
        var MainController = (function () {
            function MainController($scope, $http, hotkeys, navigationService, rootUrl) {
                hotkeys.bindTo($scope).add({
                    combo: "a",
                    allowIn: ["INPUT"],
                    description: "製品情報に移動",
                    callback: function (event) {
                        navigationService.goAbout();
                    }
                }).add({
                    combo: "s",
                    allowIn: ["INPUT"],
                    description: "API の呼び出し",
                    callback: function (event) {
                        $http.get(rootUrl + "/home/test").then(function (response) {
                            alert(response.data);
                        });
                    }
                });
            }
            return MainController;
        })();
        Main.MainController = MainController;
        angular.module("app").controller("mainController", ["$scope", "$http", "hotkeys", "navigationService", "rootUrl", MainController]).directive("appMain", function () {
            return {
                controller: "mainController as main"
            };
        });
    })(Main = App.Main || (App.Main = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map