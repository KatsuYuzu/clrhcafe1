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
            function MainController($scope, $http, hotkeys, navigationService) {
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
                    description: "bing に問い合わせしてAPIの代替",
                    callback: function (event) {
                        $http.get("http://www.bing.com/");
                    }
                });
            }
            return MainController;
        })();
        Main.MainController = MainController;
        angular.module("app").controller("mainController", ["$scope", "$http", "hotkeys", "navigationService", MainController]).directive("appMain", function () {
            return {
                controller: "mainController as main"
            };
        });
    })(Main = App.Main || (App.Main = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map