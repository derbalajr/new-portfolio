import coreWebVitals from "eslint-config-next/core-web-vitals";

// eslint-config-next 16 ships a native flat config, so the FlatCompat wrapper
// this file used to carry is no longer needed — and no longer works.
const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "docs/**"] },
  ...coreWebVitals,
];

export default eslintConfig;
