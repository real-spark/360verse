import { defineConfig } from "vite";
// import { viteAwesomeSvgLoader } from "vite-awesome-svg-loader";
import injectHTML from "vite-plugin-html-inject";
import { createHtmlPlugin } from "vite-plugin-html";
import { svgSpritemap } from "vite-plugin-svg-spritemap";
import viteImagemin from "@vheemstra/vite-plugin-imagemin";
import VitePluginWebpAndPath from "vite-plugin-webp-and-path";
import webfontDownload from "vite-plugin-webfont-dl";

// The minifiers you want to use:
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";

function yearPlugin() {
  return {
    name: "year",
    transformIndexHtml(html: string): string {
      return html.replace("__YEAR__", new Date().getFullYear().toString());
    },
  } as const;
}

export default defineConfig({
  plugins: [
    // viteAwesomeSvgLoader({
    //   defaultImport: "source",
    // }),
    injectHTML(),
    webfontDownload(),
    yearPlugin(),
    svgSpritemap({
      pattern: "images/icons/*.svg",
    }),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg(),
        png: imageminPngquant(),
      },
    }),
    VitePluginWebpAndPath(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          name: "360Verse",
          title: "360Verse Labs, Inc.",
          email: "0k@360verse.co",
          author: "Codath 360Verse",
          twitter: "@realcodath",
          url: "https://360verse.co",
          image: "https://360verse.co/assets/banner-DOcsBCzF.png",
          description:
            "360Verse Labs, Inc. is the umbrella under which beautiful software & thriving communities are built and encouraged.",
          keywords: "Labs, SaaS, Platform, Software, Foundation, Developer",
        },
      },
    }),
  ],
});
