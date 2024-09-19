const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['catalinainsight.com', 'api.catalinainsight.com'],
    remotePatterns: [{ protocol: 'https', hostname: '*.catalinainsight.com' }],
  },
};

export default nextConfig;
