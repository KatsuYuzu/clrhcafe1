"use strict";
/**
 * @fileoverview キー拡張ディレクティブ
 */
var App;
(function (App) {
    var Common;
    (function (Common) {
        "use strict";
        angular.module("app").directive("appDisplayHotkey", ["hotkeys", "$timeout", function (hotkeys, $timeout) {
            return {
                link: function (scope, element, attributes, controller) {
                    var hotkey = hotkeys.get(attributes.appDisplayHotkey);
                    if (!hotkey) {
                        return;
                    }
                    element.text("[" + hotkey.format()[0].toUpperCase() + "]: " + hotkey.description);
                    element.on("click", function (e) {
                        // 画面遷移などを動作させるために UI スレッドで実行
                        $timeout(function () {
                            hotkey.callback(e, hotkey);
                        });
                    });
                }
            };
        }]);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));
//# sourceMappingURL=hotkeysExtensions.js.map