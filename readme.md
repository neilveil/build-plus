# Build Plus

[![Downloads](https://img.shields.io/npm/dm/build-plus.svg)](https://www.npmjs.com/package/build-plus) [![Version](https://img.shields.io/npm/v/build-plus.svg)](https://www.npmjs.com/package/build-plus)

Generate Static HTML Pages from Single Page Applications 🚀

Build Plus is a powerful tool that allows you to effortlessly add static HTML pages into your Single Page Application (SPA) build, significantly enhancing SEO capabilities. 🌐✨

## Seamless Integration

Integrating Build Plus into your build process is a breeze. Simply add the `build-plus` command to your existing `build` script, and you're good to go! 🎉

For instance, with `create-react-app`:

```json
"scripts": {
  "build": "react-scripts build && build-plus"
}
```

Or with `vite`:

```json
"scripts": {
  "build": "vite build && build-plus"
}
```

## Compatibility

Build Plus seamlessly integrates with popular single page application frameworks including `ReactJS`, `VueJS`, `Angular`, and more.

👍 Great for static website hosting services.

## Installation

```bash
npm install build-plus
```

## Configuration file

Build Plus utilizes a pages.json configuration file by default, located at the root of your project. This file allows you to specify the paths you want to export as static pages.

Sample `pages.json`:

```json
{
  "pages": [
    "/",
    "/home",
    "/about",
    "/product/abc",
    "/product/xyz",
  ],
  "src": "build"
}
```

All coniguration parameters

| Key        | Usage                                                |
| ---------- | ---------------------------------------------------- |
| `pages`    | List of paths which need to be exported              |
| `src`      | Build directory path (Default: `build`)              |
| `port`     | Port to use while generating pages (Default: `8080`) |
| `host`     | `localhost` (Default: `localhost`)                   |
| `protocol` | `http` `https` (Default: `http`)                     |

To use a different configuration file:

```bash
build-plus some-other-build-plus-config.json
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](./license.txt).

## Developer

Developed & maintained by [neilveil](https://github.com/neilveil).
