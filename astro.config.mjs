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
      description:
        "Payment Pointers are a standardized identifier for payment accounts. In the same way that an email address provides an identifier for a mailbox in the email ecosystem a payment pointer is used by an account holder to share the details of their account with a counter-party.",
      customCss: [
        "./node_modules/@interledger/docs-design-system/src/styles/green-theme.css",
        "./node_modules/@interledger/docs-design-system/src/styles/ilf-docs.css",
      ],
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
    }),
  ],

  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: { service: { entrypoint: "astro/assets/services/sharp" } },
  server: {
    port: 1102,
  },
});
