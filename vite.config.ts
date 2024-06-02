import path from 'node:path';
import { createRequire } from 'node:module';
import { defineConfig, loadEnv, normalizePath } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// Setup preview PDF
const require = createRequire(import.meta.url);
const cMapsDir = normalizePath(
  path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps'),
);
const standardFontsDir = normalizePath(
  path.join(
    path.dirname(require.resolve('pdfjs-dist/package.json')),
    'standard_fonts',
  ),
);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      tsconfigPaths(),
      react(),
      viteStaticCopy({
        targets: [
          { src: cMapsDir, dest: '' },
          { src: standardFontsDir, dest: '' },
        ],
      }),
    ],
    server: {
      port: env.PORT ? Number(env.PORT) : 5000,
    },
  };
});
