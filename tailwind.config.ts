import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {
    colors: { background: "hsl(var(--background))", foreground: "hsl(var(--foreground))", primary: "hsl(var(--primary))", muted: "hsl(var(--muted))", border: "hsl(var(--border))" },
    animation: { float: "float 7s ease-in-out infinite", "pulse-soft": "pulseSoft 3s ease-in-out infinite", gradient: "gradient 8s ease infinite" },
    keyframes: {
      float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-14px)" } },
      pulseSoft: { "0%, 100%": { opacity: "0.55" }, "50%": { opacity: "1" } },
      gradient: { "0%, 100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } }
    },
    backgroundSize: { "300%": "300% 300%" }
  }},
  plugins: []
};
export default config;
