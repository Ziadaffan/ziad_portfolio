import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Allow overriding the base path (useful for GitHub Pages).
  // Example: VITE_BASE="/my-repo/"
  const env = loadEnv(mode, process.cwd(), "");

  // In GitHub Actions, GITHUB_REPOSITORY="owner/repo"
  const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? "").split("/");

  // If this is a user/organization pages repo (owner.github.io), the base is "/".
  // Otherwise it's a project pages repo, which lives under "/repo/".
  const inferredGhPagesBase =
    owner && repo && repo.toLowerCase() === `${owner.toLowerCase()}.github.io` ? "/" : repo ? `/${repo}/` : "/";

  return {
    base: env.VITE_BASE || inferredGhPagesBase,
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
