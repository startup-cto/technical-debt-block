/** @type {import("jest").Config} */
export default {
  injectGlobals: false,
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};
