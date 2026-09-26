// Same settings as the other Next.js repos: printWidth 160, semicolons, double quotes.
// The Tailwind plugin keeps class order stable and needs the CSS entry point for Tailwind 4.
/** @type {import("prettier").Config & import("prettier-plugin-tailwindcss").PluginOptions} */
const config = {
  printWidth: 160,
  semi: true,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css",
};

export default config;
