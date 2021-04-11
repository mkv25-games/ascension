const TextureCache = PIXI.utils.TextureCache;
const Rectangle = PIXI.Rectangle;
const Loader = PIXI.loader;
const Resources = Loader.resources;
const Sprite = PIXI.Sprite;
const Container = PIXI.Container;
const ADR = PIXI.autoDetectRenderer;
const Graphics = PIXI.Graphics;
const Text = PIXI.Text;
const BlurFilter = PIXI.filters.BlurFilter;
const BaseTexture = PIXI.BaseTexture;

// Prevent anti-alias on upscaling
PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;