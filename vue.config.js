module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: "http://10.201.46.5:8080", // 后端服务地址
        changeOrigin: true,
      },
    },
  },
};
