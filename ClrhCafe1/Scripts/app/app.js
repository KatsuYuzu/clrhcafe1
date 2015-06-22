"use strict";
/**
 * アプリケーションを表します。
 * @preferred
 */
var App;
(function (App) {
    "use strict";
    angular.module("app", ["ngRoute", "ngMessages", "cfp.hotkeys", "angular-loading-bar"]).constant("rootTitle", document.title).constant("rootUrl", window.location.pathname.replace(/(.*[^\/])?\/?/, "$1")).config(["$routeProvider", "rootUrl", function ($routeProvider, rootUrl) {
        $routeProvider.when("/", { templateUrl: rootUrl + "/scripts/app/main/main.html" }).when("/about", { templateUrl: rootUrl + "/scripts/app/about/about.html", name: "CLR/H Cafe について" }).otherwise({ redirectTo: "/" });
    }]).config(["hotkeysProvider", function (hotkeysProvider) {
        hotkeysProvider.includeCheatSheet = true;
    }]).config(["cfpLoadingBarProvider", function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 0;
    }]).config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push(["$q", function ($q) {
            return {
                responseError: function (rejection) {
                    var message;
                    switch (rejection.status) {
                        case 404:
                            message = "お探しの通信先が見つかりませんでした。";
                            break;
                        default:
                            message = "サーバーでエラーが発生しました。管理者にお問い合わせください。";
                    }
                    alert(message + "\r\n" + "\r\n" + rejection.status + "\r\n" + rejection.statusText);
                    return $q.reject(rejection);
                }
            };
        }]);
    }]).factory("$exceptionHandler", ["$injector", "rootUrl", function ($injector, rootUrl) {
        return function (exception, cause) {
            try {
                // コンフィグ時ではなく実行時に遅延で取得
                var $log = $injector.get("$log");
                var $http = $injector.get("$http");
                var $window = $injector.get("$window");
                try {
                    if (!exception || !exception.description) {
                        exception = { description: exception + "" };
                    }
                    if (!exception.path) {
                        exception.path = $window.location.pathname + $window.location.hash;
                    }
                    if (!exception.cause) {
                        exception.cause = cause;
                    }
                    $http.post(rootUrl + "/js/trace", exception);
                    $log.error(exception);
                }
                catch (e) {
                    $log.warn("Error logging failed.\r\n", e);
                }
            }
            catch (e) {
            }
        };
    }]);
})(App || (App = {}));
//# sourceMappingURL=app.js.map