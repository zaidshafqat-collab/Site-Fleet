import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Site-Fleet",
  images: { unoptimized: true },
  trailingSlash: true
};
export default nextConfig;
