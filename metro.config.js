const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const customConfig = {
  resolver: {
    extraNodeModules: {
      // 🔥 FIX: prevent react-dom crash
      "react-dom": require.resolve("react-native"),
    },
  },
};

module.exports = mergeConfig(defaultConfig, customConfig);