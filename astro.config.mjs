import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";

// https://astro.build/config
export default defineConfig({
  site: "https://paymentpointers.org",
  integrations: [
    starlight({
      title: "Payment Pointers",
      customCss: [
        './src/styles/custom.css'
      ],
      description:
        "Payment Pointers are a standardized identifier for payment accounts. In the same way that an email address provides an identifier for a mailbox in the email ecosystem a payment pointer is used by an account holder to share the details of their account with a counter-party.",
        head: [
          {
            tag: 'script',
            attrs: {
              defer: true,
              'data-website-id': 'cab4fd0a-e2db-4666-a974-5b199f0d6d43',
              src: 'https://ilf-site-analytics.netlify.app/script.js',
              'data-domains': 'paymentpointers.org'
            }
          }
        ],
        customCss: [
        "./node_modules/@interledger/docs-design-system/src/styles/teal-theme.css",
        "./node_modules/@interledger/docs-design-system/src/styles/ilf-docs.css",
      ],
      plugins: [starlightLinksValidator()],
      components: {
        Header: "./src/components/Header.astro",
        PageSidebar: './src/components/PageSidebar.astro'
      },
      expressiveCode: {
        styleOverrides: {
          borderColor: "transparent",
          borderRadius: "var(--border-radius)",
        },
      },
      social: {
        github: "https://github.com/interledger/paymentpointers.org",
      },
      sidebar: [
        { label: "Overview", link: "overview" },
        { label: "How it works", link: "how-it-works" },
        { label: "Syntax and resolution", link: "/syntax" },
        { label: "Security considerations", link: "/security" },
        { label: "Example implementation - Interledger", link: "/examples/ilp-implementation" },
        { label: "IANA considerations", link: "/iana" },
        { label: "About", link: "/about" },
      ],
    }),
  ],
  server: {
    port: 1102,
  },
});
