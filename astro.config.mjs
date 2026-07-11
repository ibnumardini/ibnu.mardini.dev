// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
	site: 'https://ibnu.mardini.dev',
	integrations: [icon()],
	adapter: process.env.CLOUDFLARE ? cloudflare({ imageService: 'compile' }) : undefined,
	vite: {
		plugins: [tailwindcss()],
	},
});