import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import overrideIntegration from "./src/overrideIntegration.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://paymentpointers.org",
  integrations: [
    overrideIntegration(),
    starlight({
      title: "Payment Pointers",
      social: {
        github: "https://github.com/interledger/paymentpointers.org",
      },
      sidebar: [
        { label: "Explainer", link: "/" },
        { label: "Design Goals", link: "/goals" },
        { label: "Flow", link: "/flow" },
        { label: "Syntax and Resolution", link: "/syntax" },
        { label: "IANA Considerations", link: "/iana" },
        { label: "Security Considerations", link: "/security" },
        { label: "About", link: "/about" },
      ],
      customCss: ["./src/styles/ilf-docs.css"],
    }),
  ],

  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: { service: { entrypoint: "astro/assets/services/sharp" } },
  server: {
    port: 1102,
  },
});
