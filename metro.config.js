const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Configure SVG support
  config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => ext !== "svg"
  );
  config.resolver.sourceExts.push("svg");

  // Fix Windows path separator issues for web
  config.transformer = {
    ...config.transformer,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  };

  // Normalize paths to use forward slashes for web compatibility
  config.server = {
    ...config.server,
    enhanceMiddleware: (middleware) => {
      return (req, res, next) => {
        // Convert backslashes to forward slashes in the URL
        if (req.url) {
          req.url = req.url.replace(/%5C/g, "/").replace(/\\/g, "/");
        }
        return middleware(req, res, next);
      };
    },
  };

  return config;
})();
