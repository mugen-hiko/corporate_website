// gulp
import gulp from 'gulp';
import gulpPostcss from 'gulp-postcss';
import gulpSass from 'gulp-sass';
import gulpUtil from 'gulp-util';

// PostCSS
import cssnano from 'cssnano';
import postcssAssets from 'postcss-assets';
import postcssCssnext from 'postcss-cssnext';
import postcssImport from 'postcss-import';

// webpack
import webpack from 'webpack';
import webpackConfig from './webpack.config';

// Util
import BrowserSync from 'browser-sync';
import childProcess from 'child_process';
import del from 'del';
import lazypipe from 'lazypipe';

const browserSync = BrowserSync.create();

const minifyCss = lazypipe()
  .pipe(
    !!gulpUtil.env.development ? gulpUtil.noop : gulpPostcss, [cssnano]
  );

gulp.task('assets', ['sass', 'css', 'js']);

gulp.task('build', ['middleman']);

gulp.task('server', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: './middleman/build'
    }
  });

  gulp.watch([
    './src/js/**/*.js',
    './src/sass/**/*.sass',
    './src/css/**/*.css',
    './middleman/{data,helpers,source}/**/*'
  ], [
    'middleman'
  ]);
});

gulp.task('clean', () => {
  return del([
    './middleman/build',
    './middleman/source/stylesheets',
    './middleman/source/javascripts'
  ]);
});

gulp.task('sass', () => (
  gulp.src('./src/sass/**/*.sass')
    .pipe(
      gulpSass()
    )
    .pipe(
      minifyCss()
    )
    .pipe(
      gulp.dest('./middleman/source/stylesheets')
    )
    .pipe(
      browserSync.stream()
    )
));

gulp.task('css', () => (
  gulp.src('./src/css/**/*.css')
    .pipe(
      gulpPostcss([
        postcssImport({
          from: './src/css/main.css'
        }),
        postcssAssets({
          baseUrl: '/',
          loadPaths: ['./'],
          basePath: './middleman/source/'
        }),
        postcssCssnext()
      ])
    )
    .pipe(
      minifyCss()
    )
    .pipe(
      gulp.dest('./middleman/source/stylesheets')
    )
    .pipe(
      browserSync.stream()
    )
));

gulp.task('js', (cb) => {
  const myConfig = Object.assign({}, webpackConfig);

  if (!gulpUtil.env.development) {
    myConfig.plugins.push(
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  webpack(myConfig, (err, stats) => {
    if (err) {
      throw new gulpUtil.PluginError('webpack', err);
    }

    gulpUtil.log('[webpack]', '\n' + stats.toString({
      colors: true,
      progress: true
    }));

    browserSync.reload();

    cb();
  });
});

gulp.task('middleman', (cb) => {
  const args = ['exec', 'middleman', 'build', '--verbose']

  if (!!gulpUtil.env.development) {
    args.push('-e', 'development');
  }

  childProcess.spawn('bundle', args, {stdio: 'inherit', cwd: './middleman'}).on('close', (code) => {
    if (code === 0) {
      browserSync.reload();

      cb();
    } else {
      browserSync.notify('Middleman build failed...');

      cb('Middleman build failed');
    }
  });
});
