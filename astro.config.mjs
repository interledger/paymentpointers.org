import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://paymentpointers.org",
  integrations: [
    starlight({
      title: "Payment Pointers",
      description:
        "Payment Pointers are a standardized identifier for payment accounts. In the same way that an email address provides an identifier for a mailbox in the email ecosystem a payment pointer is used by an account holder to share the details of their account with a counter-party.",
      customCss: [
        "./node_modules/@interledger/docs-design-system/src/styles/green-theme.css",
        "./node_modules/@interledger/docs-design-system/src/styles/ilf-docs.css",
      ],
      components: {
        Header: "./src/components/Header.astro",
      },
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
  server: {
    port: 1102,
  },
});
