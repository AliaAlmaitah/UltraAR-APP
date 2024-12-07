const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  resolver: {
    assetExts: [
      'glb',  // Add .glb file extension
      'obj',  // Retain .obj if needed in the future
      'stl',  // Retain .stl if applicable
      'mtl',  // Retain .mtl if applicable
      'png', 'jpg', 'ttf', 'otf', 'mp4', // Other asset types
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
