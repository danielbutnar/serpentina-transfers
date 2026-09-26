import type { MetadataRoute } from "next";

const base = process.env.PAGES_BASE_PATH ?? "";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Serpentina Transfers (concept)",
    short_name: "Serpentina",
    description: "Concept website for a fictional airport-transfer company in Brașov.",
    start_url: `${base}/en/`,
    display: "browser",
    background_color: "#F3F1EB",
    theme_color: "#E0A526",
    icons: [{ src: `${base}/icon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
