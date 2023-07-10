module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [
            ".ios.tsx",
            ".android.tsx",
            ".js",
            ".ts",
            ".jsx",
            ".tsx",
            ".json",
          ],
          alias: {
            "@root": "./",
            "@screens": "./src/screens",
            "@assets": "./src/assets",
            "@src": "./src",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@store": "./src/store",
            "@styles": "./src/styles",
            "@utils": "./src/utils",
            "@hooks": "./src/hooks",
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
