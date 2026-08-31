import baseConfig from "@terra/vitest-config";

export default Object.assign({}, baseConfig, {
  optimizeDeps: {
    include: ["react", "react/jsx-runtime", "react-dom", "react-dom/client"],
  },
});
