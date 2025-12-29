import { defineConfig } from 'vite';
import keystonePlugin from 'keystonemc/vite-plugin';

export default defineConfig({
  plugins: [keystonePlugin({ 
    name: "WorldEdit",
    description: "Tool of management your world.",
    authors: [ "VeronicaDiazTaylor" ],
    version: [ 1, 0, 0 ],
    uuid: "82b9174d-ea3d-42ae-986c-b42ce3644760"
  })],
});
