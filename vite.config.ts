import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import prefixer from 'postcss-prefix-selector';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), svelte()],
	css: {
		postcss: {
			plugins: [
				prefixer({
					prefix: '#join-calendar'
				}),
				autoprefixer({})
			]
		}
	},
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib')
		}
	}
});
