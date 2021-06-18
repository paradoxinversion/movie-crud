module.exports = {
  reactStrictMode: true,
  /**
   * Because Next's webpack5 causes issues for API routes,
   * we'll drop back to v4 until it is supported.
   */
  webpack5: false,
};
