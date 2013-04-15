require.config({
  waitSeconds: 120,
  paths: {
    jquery: '../lib/jquery/jquery-1.8.2.min',
    jqueryCookie: '../lib/jquery/jquery.cookie',
    bootstrap: '../lib/bootstrap/js/bootstrap',
    underscore: '../lib/underscore/underscore',
    angular: '../lib/angular/angular.min',
    angularResource: '../lib/angular/angular-resource',
    statemanager: '../lib/angular/statemanager',

    codemirror: '../lib/codemirror/js/lib/codemirror',
    codemirrorJs: '../lib/codemirror/js/mode/javascript/javascript',
    codemirrorCss: '../lib/codemirror/js/mode/css/css',
    codemirrorXml: '../lib/codemirror/js/mode/xml/xml',
    codemirrorHtml: '../lib/codemirror/js/mode/htmlmixed/htmlmixed',

    text: '../lib/require/text',
    async: '../lib/require/async',
    css: '../lib/require/css'
  },
  shim: {
    'angular' : {'exports' : 'angular'},
    'angular-resource': { deps: ['angular'] },
    'statemanager': { deps: ['angular'] },
    'bootstrap': { deps: ['jquery'] },
    'jqueryCookie': { deps: ['jquery'] },
    'angular-statemanager' : {deps:['angular']},
    'underscore': {exports: '_'},
    'codemirror': {exports: 'CodeMirror'},  
    'codemirrorJs':{deps:['codemirror']},
    'codemirrorCss':{deps:['codemirror']},
    'codemirrorXml':{deps:['codemirror']},
    'codemirrorHtml':{deps:['codemirrorXml','codemirrorCss','codemirrorJs'], exports: 'mixedMode'}
  },
  priority: [
    "angular"
  ],
  urlArgs: 'v=1.1'
});

require( [
    'angular',
    'app',
    'jquery',
    'jqueryCookie',
    'statemanager',
    'bootstrap',
    'services/services',
    'services/ui.services',
    'controllers/application',
    'controllers/dialogs',
    'controllers/editors',
    'controllers/propertyeditor',
    'filters/filters',
    'directives/directives',
    'routes'
], function(angular, app) {
  //This function will be called when all the dependencies
  //listed above are loaded. Note that this function could
  //be called before the page is loaded.
  //This callback is optional.

  jQuery(document).ready(function () {
    angular.bootstrap(document, ['umbraco']);
  });
});
