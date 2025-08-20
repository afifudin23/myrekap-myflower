import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [react()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
        server: {
            host: '0.0.0.0', // biar bisa diakses dari IP/VPS lain
            port: 4000,
            allowedHosts: [env.VITE_ALLOWED_HOST],
        },
    };
});