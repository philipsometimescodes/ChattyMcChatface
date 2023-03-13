import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [suidPlugin(),solid()],
});
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import suidPlugin from "@suid/vite-plugin";
