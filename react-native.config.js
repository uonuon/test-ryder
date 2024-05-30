const flipperDep = (process.env.NO_FLIPPER ? { 'react-native-flipper': { platforms: { ios: null } } } : {});

module.exports = {
  dependencies: flipperDep,
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./assets/fonts/'], // stays the same
};
