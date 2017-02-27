/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // other libraries
      'rxjs':                       'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
      'angular2-jwt': 'node_modules/angular2-jwt/angular2-jwt.js',
      'angular2': 'node_modules/angular2.js',
      'ng-draggable': 'node_modules/ng-draggable.js',
      'ng2-dnd': 'node_modules/ng2-dnd',

      'sprintf-js': 'node_modules/sprintf-js/src/',
      "ng2-dropdown": "node_modules/ng2-dropdown",
      'markdown': 'node_modules/angular2-markdown/src/markdown.js',
     // 'angular2-froala-wyswiyg/lib/floala.directives':'node_modules/angular2-froala-wyswiyg/lib/floala.directives'
      'primeng/primeng': 'node_modules/primeng/primeng.js',
      'ng2-ckeditor': 'https://npmcdn.com/ng2-ckeditor@1.0.7',
      'ng2-tag-input':'node_modules/ng2-tag-input',
      'ng2-tagsinput': 'node_modules/ng2-tagsinput',
      'ng2-sanitize' : 'node_modules/ng2-sanitize',
      'sanitizer' : 'node_modules/sanitizer',
      'angular2-dynamic-component' : 'node_modules/angular2-dynamic-component',
      'ts-metadata-helper' : 'node_modules/ts-metadata-helper',
      'core-js' : 'node_modules/core-js',
      'ng2-bs3-modal': 'node_modules/ng2-bs3-modal',
      'ng2-auto-complete': 'node_modules/ng2-auto-complete/dist'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: { main: './main.js', defaultExtension: 'js' },
      rxjs: { defaultExtension: 'js' },
      'angular2-in-memory-web-api': { main: './index.js', defaultExtension: 'js' },
      'ng2-dnd':  { main: 'index.js',  defaultExtension: 'js' },
      'sprintf-js': { main: 'sprintf.js'},
      "ng2-dropdown": { "main": "index.js", "defaultExtension": "js" },
      "ng2-ckeditor": { "main": "lib/CKEditor.js", "defaultExtension": "js" },
      "ng2-tag-input": { "main": "index.js", "defaultExtension": "js"},
      'ng2-tagsinput': { 'defaultExtension': 'js', 'main':'index' },
      'ng2-sanitize' : { 'defaultExtension': 'js', 'main':'ng2-sanitize' },
      'sanitizer' : { 'defaultExtension': 'js', 'main':'sanitizer' },
      'angular2-dynamic-component' : { 'defaultExtension': 'js', 'main':'index' },
      'ts-metadata-helper' : { 'defaultExtension': 'js', 'main':'index' },
      'core-js' : { 'defaultExtension': 'js', 'main':'index' },
      'ng2-bs3-modal': {'defaultExtension': 'js', 'main':'ng2-bs3-modal'},
      'ng2-auto-complete': { 'defaultExtension': 'js', 'main': 'ng2-auto-complete.umd.js'}
    }
  });
})(this);
