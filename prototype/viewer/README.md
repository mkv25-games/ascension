# Ascension Viewer

The viewer for the ascension world; effectively the client side game at this point.

## Development Builds

Regular builds can be found here:
- http://mkv25.net/g/ascension/viewer/

## Requirements

Runs as a fullscreen HTML canvas using javascript ES6.

## Development

Project is built using nodejs tools to minify the code.

To get set up, checkout this code base, then run:
- `npm install`

Commands to use while developing:
- `npm test` will boot up a local webserver.
- `npm run dev` will start a watch task to minify javascript and css as files are changed.
- `npm run upload:all` will upload all files to a remote webserver using the package version as a release folder

## Image Processing

The image assets are packed using [TexturePackerGUI](https://www.codeandweb.com/texturepacker) - this creates a texture atlas described by a JSON file that PIXI.js can decode.
