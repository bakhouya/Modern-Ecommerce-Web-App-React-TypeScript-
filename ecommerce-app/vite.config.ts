

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { env } from 'process'
// const backendUrl = new URL(env.VITE_API_URL || "").origin;


// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api-blackbox': {
//         target: 'https://www.useblackbox.io',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api-blackbox/, ''),
//       },
//       "/api/media": {
//         target: backendUrl,
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api\/media/, "/media"),
//       },
//     },
//   },
// })




import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backendOrigin = new URL(env.VITE_API_URL).origin;

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api-blackbox": {
          target: "https://www.useblackbox.io",
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(/^\/api-blackbox/, ""),
        },

        "/api/media": {
          target: backendOrigin,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(/^\/api\/media/, "/media"),
        },
      },
    },
  };
});


