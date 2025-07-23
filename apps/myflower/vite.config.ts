import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    console.log(env.VITE_ALLOWED_HOST);
    
    return {
        plugins: [react()],
            resolve: {
                alias: {
                    "@": path.resolve(__dirname, "./src"),
                },
            },
        server: {
            allowedHosts: [env.VITE_ALLOWED_HOST],
        },
    };
});
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//     plugins: [react()],
//     resolve: {
//         alias: {
//             "@": path.resolve(__dirname, "./src"),
//         },
//     },
//     server: {
//         allowedHosts: env.VITE_ALLOWED_HOST ? [env.VITE_ALLOWED_HOST] : [],
//     },
// });
