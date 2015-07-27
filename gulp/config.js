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
    notify: false
  },
  less: {
    src: src + '/less/main.less',
    watch: [
      src + '/less/**',
      mui + '/less/**'
    ],
    dest:  dest + '/css'
  },
  markup: {
    src: src + "/www/**",
    dest: dest
  },
  mdi: {
    css: {
      src: './node_modules/mdi/css/materialdesignicons.min.css',
      dest: dest + '/css'
    },
    fonts: {
      files: './node_modules/mdi/fonts/**',
      dest: dest + '/fonts'
    },
  },
  novnc: {
    src: ['./noVNC/include/base.css', './noVNC/include/*.js' ],
    dest: dest + '/noVNC/'
  },
  jshint: {
    src: [ src + '/**/*.js', src + '/**/*.jsx'],
    app: src + '/app/app.jsx'
  },
  lib: {
    src: '../src/app',
    // If any dest is changed, .gitignore should be updated
    dest: 'lib',
    // If name is changed all the requires inside the project
    // should be updated
    name: 'goby',
  },
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
