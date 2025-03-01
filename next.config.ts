import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode:false,
  compiler:{
    styledComponents:true,
  },
  images:{
    remotePatterns:[{
      protocol: 'http',
      hostname:'openweathermap.org'
    }],
},
};

export default nextConfig;
