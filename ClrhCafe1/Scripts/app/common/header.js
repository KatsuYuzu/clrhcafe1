var App;
(function (App) {
    var Common;
    (function (Common) {
        "use strict";
        /**
         * ヘッダー コントローラー
         */
        var HeaderController = (function () {
            function HeaderController(navigationService, rootTitle) {
                this.navigationService = navigationService;
                this.rootTitle = rootTitle;
            }
            Object.defineProperty(HeaderController.prototype, "title", {
                get: function () {
                    if (this.navigationService.currentName) {
                        return this.navigationService.currentName + " - " + this.rootTitle;
                    }
                    else {
                        return this.rootTitle;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HeaderController.prototype, "pageName", {
                get: function () {
                    return this.navigationService.currentName;
                },
                enumerable: true,
                configurable: true
            });
            return HeaderController;
        })();
        angular.module("app").controller("headerController", ["navigationService", "rootTitle", HeaderController]).directive("appHeader", function () {
            return {
                controller: "headerController as header"
            };
        });
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));
//# sourceMappingURL=header.js.map