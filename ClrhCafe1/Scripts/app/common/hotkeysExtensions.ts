"use strict";
/**
 * @fileoverview キー拡張ディレクティブ
 */
module App.Common {
    "use strict";

    angular.module("app")
        .directive("appDisplayHotkey",
        ["hotkeys", "$timeout", (hotkeys: angular.hotkeys.HotkeysProvider, $timeout: ng.ITimeoutService) => {
            return {
                link: (
                    scope: ng.IScope,
                    element: ng.IAugmentedJQuery,
                    attributes: any,
                    controller: any) => {

                    var hotkey = hotkeys.get(attributes.appDisplayHotkey);

                    if (!hotkey) {
                        return;
                    }

                    element.text("[" + (<string>(<any>hotkey).format()[0]).toUpperCase() + "]: " + hotkey.description);

                    element.on("click",(e: Event) => {
                        // 画面遷移などを動作させるために UI スレッドで実行
                        $timeout(() => {
                            hotkey.callback(e, hotkey);
                        });
                    });

                }
            };
        }]);

}
