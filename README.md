# Payment Pointers

This is the source code for the website hosted at [paymentpointers.org](https://paymentpointers.org). It is built with [Starlight](https://starlight.astro.build/getting-started/), a documentation framework based on [Astro](https://astro.build/). The RFC for payment pointers can be found [here](https://github.com/interledger/rfcs/blob/master/0026-payment-pointers/0026-payment-pointers.md).

## Contributing

Please read the [contribution guidelines](.github/contributing.md) before submitting contributions. All contributions must adhere to our [code of conduct](.github/code_of_conduct.md).

## 🚀 Project Structure

Inside this project, you'll see the following folders and files:

```
.
├── public/
├── src/
│   ├── components/
│   ├── content/
│   │   ├── docs/
│   └── content.config.ts
│   └── env.d.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Starlight looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name.

Static assets, like favicons or images, can be placed in the `public/` directory. When referencing these assets in your markdown, you do not have to include `public/` in the file path, so an image would have a path like:

```md
![A lovely description of your beautiful image](/img/YOUR_BEAUTIFUL_IMAGE.png)
```

## Local development

We are using [Bun](https://bun.sh/) in this repository, but you could theoretically use the package manager of your choice. To install Bun, run

```sh
curl -fsSL https://bun.sh/install | bash
```

### 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun run start`           | Starts local dev server at `localhost:1102`      |
| `bun run build`           | Build your production site to `./dist/`          |
| `bun run preview`         | Preview your build locally, before deploying     |
| `bun run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun run astro -- --help` | Get help using the Astro CLI                     |
| `bun run format`          | Format code and fix linting issues               |
| `bun run lint`            | Check code formatting and linting                |

You can substitute the `bun` commands with whatever package manager of your choice uses.

### 🔍 Code Formatting

This project uses [ESLint](https://eslint.org/) for code linting and [Prettier](https://prettier.io/) for code formatting. Before submitting a pull request, please ensure your code is properly formatted:

1. **Fix issues**: Run `bun run format` to automatically format code and fix linting issues
2. **Check before pushing**: Run `bun run lint` to verify everything passes (CI will also run this)

ESLint is configured to work with TypeScript and Astro files. The configuration extends recommended rules from ESLint, TypeScript ESLint, and Astro ESLint plugins, and integrates with Prettier to avoid conflicts.

### 👀 Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).
