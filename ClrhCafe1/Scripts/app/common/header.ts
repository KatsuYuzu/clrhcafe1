module App.Common {
    "use strict";

    /**
     * ヘッダー コントローラー
     */
    class HeaderController {

        constructor(
            private navigationService: INavigationService,
            private rootTitle: string) { }

        get title(): string {
            if (this.navigationService.currentName) {
                return this.navigationService.currentName + " - " + this.rootTitle;
            } else {
                return this.rootTitle;
            }
        }

        get pageName(): string {
            return this.navigationService.currentName;
        }

    }

    angular.module("app")
        .controller("headerController", ["navigationService", "rootTitle", HeaderController])
        .directive("appHeader",
        () => {
            return {
                controller: "headerController as header"
            };
        });

}
