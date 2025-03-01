import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
