import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                tradicao: resolve(__dirname, 'tradicao-canarinho/index.html'),
                azul: resolve(__dirname, 'azul-sinistro/index.html'),
            },
        },
    },
});
