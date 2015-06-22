module App.Common {
    "use strict";

    /**
     * 画面遷移を制御します。
     */
    export interface INavigationService {
        currentName: typeof NavigationService.prototype.currentName;
        currentPath: typeof NavigationService.prototype.currentPath;
        goAbout: typeof NavigationService.prototype.goAbout;
    }

    class NavigationService implements INavigationService {

        private _currentName: string;
        private _currentPath: string;

        constructor(
            private $window: ng.IWindowService,
            private $location: ng.ILocationService,
            $rootScope: ng.IRootScopeService) {

            $rootScope.$on("$routeChangeSuccess",
                (e: ng.IAngularEvent, current: ng.route.ICurrentRoute, previous: ng.route.ICurrentRoute) => {
                    this._currentName = current.name;
                    this._currentPath = $location.path();
                });

        }

        /**
         * 現在のパスの名前を取得します。
         * @returns {} 
         */
        get currentName(): string {
            return this._currentName;
        }

        /**
         * 現在のパスを取得します。
         * @returns {} 
         */
        get currentPath(): string {
            return this._currentPath || "/";
        }

        /**
         * 指定のパスに遷移します。
         * @param path 遷移先のパス。
         * @returns {} 
         */
        private go(path: string, parameter?: any) {
            if (parameter) {
                this.$location.url(path).search(parameter);
            } else {
                this.$location.url(path);
            }
        }

        /**
         * 製品情報に遷移します。
         */
        goAbout() {
            this.go("/about");
        }

    }

    angular.module("app")
        .service("navigationService", ["$window", "$location", "$rootScope", NavigationService]);

}
