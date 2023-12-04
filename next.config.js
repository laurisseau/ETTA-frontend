/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiMappings = [
      { route: '/api/permitAll/compiler' },
      { route: '/api/auth/user/signup' },
      { route: '/api/auth/user/login' },
      { route: '/api/auth/user/forgotPassword' },
      { route: '/api/auth/user/resetPassword' },
      { route: '/api/user/updateProfile' },
      { route: '/api/auth/educator/signup' },
    ];

    return apiMappings.map(({ route }) => ({
      source: route,
      destination: `http://localhost:8080${route}`,
    }));
  },
};

module.exports = nextConfig;
