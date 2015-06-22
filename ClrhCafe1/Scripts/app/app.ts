"use strict";
/**
 * アプリケーションを表します。
 * @preferred
 */
module App {
    "use strict";

    angular.module("app", ["ngRoute", "ngMessages", "cfp.hotkeys", "angular-loading-bar"])
        .constant("rootTitle", document.title)
        .constant("rootUrl", window.location.pathname.replace(/(.*[^\/])?\/?/, "$1"))
        .config(
        ["$routeProvider", "rootUrl", ($routeProvider: ng.route.IRouteProvider, rootUrl: string) => {
            $routeProvider
                .when("/", { templateUrl: rootUrl + "/scripts/app/main/main.html" })
                .when("/about", { templateUrl: rootUrl + "/scripts/app/about/about.html", name: "CLR/H Cafe について" })
                .otherwise({ redirectTo: "/" });
        }])
        .config(
        ["hotkeysProvider", (hotkeysProvider: angular.hotkeys.HotkeysProvider) => {
            hotkeysProvider.includeCheatSheet = true;
        }])
        .config(
        ["cfpLoadingBarProvider", (cfpLoadingBarProvider: any) => {
            cfpLoadingBarProvider.includeSpinner = false;
            cfpLoadingBarProvider.latencyThreshold = 0;
        }])
        .config(
        ["$httpProvider", ($httpProvider: ng.IHttpProvider) => {
            $httpProvider.interceptors.push(["$q", ($q: ng.IQService) => {
                return {
                    responseError: (rejection: ng.IHttpPromiseCallbackArg<any>) => {

                        var message: string;

                        switch (rejection.status) {
                            case 404:
                                message = "お探しの通信先が見つかりませんでした。";
                                break;
                            default:
                                message = "サーバーでエラーが発生しました。管理者にお問い合わせください。";
                        }

                        alert(
                            message + "\r\n"
                            + "\r\n"
                            + rejection.status + "\r\n"
                            + rejection.statusText);

                        return $q.reject(rejection);
                    }
                };
            }]);
        }])
        .factory("$exceptionHandler",
        ["$injector", "rootUrl",
            ($injector: ng.auto.IInjectorService, rootUrl: string) => {
                return (exception: any, cause: string) => {
                    try {
                        // コンフィグ時ではなく実行時に遅延で取得
                        var $log = <ng.ILogService>$injector.get("$log");
                        var $http = <ng.IHttpService>$injector.get("$http");
                        var $window = <ng.IWindowService>$injector.get("$window");

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
                        } catch (e) {
                            $log.warn("Error logging failed.\r\n", e);
                        }
                    } catch (e) {
                        // ループ抑制
                    }
                };
            }]);

}
