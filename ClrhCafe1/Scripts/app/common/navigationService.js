var App;
(function (App) {
    var Common;
    (function (Common) {
        "use strict";
        var NavigationService = (function () {
            function NavigationService($window, $location, $rootScope) {
                var _this = this;
                this.$window = $window;
                this.$location = $location;
                $rootScope.$on("$routeChangeSuccess", function (e, current, previous) {
                    _this._currentName = current.name;
                    _this._currentPath = $location.path();
                });
            }
            Object.defineProperty(NavigationService.prototype, "currentName", {
                /**
                 * 現在のパスの名前を取得します。
                 * @returns {}
                 */
                get: function () {
                    return this._currentName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NavigationService.prototype, "currentPath", {
                /**
                 * 現在のパスを取得します。
                 * @returns {}
                 */
                get: function () {
                    return this._currentPath || "/";
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 指定のパスに遷移します。
             * @param path 遷移先のパス。
             * @returns {}
             */
            NavigationService.prototype.go = function (path, parameter) {
                if (parameter) {
                    this.$location.url(path).search(parameter);
                }
                else {
                    this.$location.url(path);
                }
            };
            /**
             * 製品情報に遷移します。
             */
            NavigationService.prototype.goAbout = function () {
                this.go("/about");
            };
            return NavigationService;
        })();
        angular.module("app").service("navigationService", ["$window", "$location", "$rootScope", NavigationService]);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));
//# sourceMappingURL=navigationService.js.map