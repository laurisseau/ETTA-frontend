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
      { route: '/api/user/joinClass' },
      { route: '/api/user/ifEnrolled/:userId' },
      { route: '/api/auth/educator/signup' },
      { route: '/api/auth/educator/login' },
      { route: '/api/auth/educator/forgotPassword' },
      { route: '/api/auth/educator/resetPassword' },
      { route: '/api/educator/updateProfile' },
    ];

    return apiMappings.map(({ route }) => ({
      source: route,
      destination: `http://localhost:8080${route}`,
    }));
  },
};

module.exports = nextConfig;
