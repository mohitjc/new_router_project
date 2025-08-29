import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
   optimizeDeps: {
    include: ["redux-persist/integration/react"],
  },
   ssr: {
    noExternal: ["redux-persist"], // force Vite to bundle redux-persist
  },
});
