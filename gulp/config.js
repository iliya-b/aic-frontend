var dest = './build',
  src = './src',
  mui = './node_modules/material-ui/src';

module.exports = {
  browserSync: {
    server: {
      // We're serving the src folder as well
      // for sass sourcemap linking
      baseDir: [dest, src]
    },
    files: [
      dest + '/**'
    ],
    open: false,
    ghostMode: false,
    notify: false,
    // proxy: {
    //   target: "http://localhost:3000",
    //   ws: true,
    // },
    socket: {
      // namespace: '/browser-sync',
      // domain: 'localhost:3000',
      path: "/browser-sync/socket.io",
      clientPath: '/browser-sync',
      namespace: "/browser-sync",
      domain: 'localhost:9080',
      port: 9080,
    },
    port: 9080
  },
  less: {
    src: src + '/less/main.less',
    watch: [
      src + '/less/**',
      mui + '/less/**'
    ],
    dest:  dest + '/css'
  },
  copy: [{
    src: ['./node_modules/noVNC/include/base.css', './node_modules/noVNC/include/*.js' ],
    dest: dest + '/noVNC/'
  },{
    src: './node_modules/mdi/css/materialdesignicons.min.css',
    dest: dest + '/css'
  },{
    src: './node_modules/mdi/fonts/**',
    dest: dest + '/fonts'
  },{
    src: src + "/www/**",
    dest: dest
  }],
  browserify: {
    // Enable source maps
    debug: true,
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/app/app.jsx',
      dest: dest,
      outputName: 'app.js'
    }]
  }
};
