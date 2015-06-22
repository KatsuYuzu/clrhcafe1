using System.Web.Optimization;

namespace ClrhCafe1
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            // 最適化の確認時はコメントを解除
            //BundleTable.EnableOptimizations = True

            RegisterCommonBundles(bundles);

            RegisterProductBundles(bundles);
        }

        /// <summary>
        /// 共通のバンドルを登録します。
        /// </summary>
        /// <param name="bundles"></param>
        private static void RegisterCommonBundles(BundleCollection bundles)
        {

            // ##################################################
            // スクリプト
            // ##################################################

            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/bootstrap.js",
                        "~/Scripts/angular.js",
                        "~/Scripts/angular-route.js",
                        "~/Scripts/angular-messages.js",
                        "~/Scripts/hotkeys.js",
                        "~/Scripts/loading-bar.js"));

            // ##################################################
            // スタイル
            // ##################################################

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                      "~/Content/themes/default/bootstrap.css",
                      "~/Content/hotkeys.css",
                      "~/Content/loading-bar.css"));

        }

        /// <summary>
        /// 製品のバンドルを登録します。
        /// </summary>
        /// <param name="bundles"></param>
        private static void RegisterProductBundles(BundleCollection bundles)
        {

            // ##################################################
            // スクリプト
            // ##################################################

            bundles.Add(new ScriptBundle("~/bundles/appjs")
                    .IncludeDirectory("~/Scripts/app/", "*.js", true));

            // ##################################################
            // スタイル
            // ##################################################

            bundles.Add(new StyleBundle("~/bundles/appcss").Include(
                      "~/Content/app/app.css"));

        }

    }
}
