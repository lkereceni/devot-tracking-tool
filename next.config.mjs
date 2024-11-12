/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/trackers",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
