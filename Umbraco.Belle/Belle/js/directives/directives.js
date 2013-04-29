'use strict';

define(['angular'], function (angular) {

/* Directives */
var umbDir = angular.module('umbraco.directives', []);

    umbDir.directive('appVersion', ['version', function (version) {
        return function(scope, elm, attrs) {
          elm.text(version);
        };
    }]);

    umbDir.directive('preventDefault', function () {
        return function (scope, element, attrs) {
            $(element).click(function (event) {
                event.preventDefault();
            });
        }
    });

    umbDir.directive('autoScale', function ($window) {
        return function(scope, el, attrs) {

            var totalOffset = 0;
            var offsety = parseInt(attrs.autoScale);
            var window = angular.element($window);
            if (offsety != undefined)
                totalOffset += offsety;

            setTimeout(function (){
                     el.height(window.height() - (el.offset().top + totalOffset));
                     }, 300);    
            
            window.bind("resize", function() {
                el.height(window.height() - (el.offset().top + totalOffset));
            });

        };
    });


    umbDir.directive('headline', function ($window) {
        return function(scope, el, attrs) {

            var h1 = $("<h1></h1>").hide();
            el.parent().prepend(h1);  
            el.addClass("umb-headline-editor");

            if(el.val() != ''){
              el.hide();
              h1.text(el.val());
              h1.show();
            }else{
              el.focus();
            }

            el.on("blur", function () {
              //el.hide();
              //h1.text(el.val()).show();
            });

            h1.on("click", function () {
              h1.hide();
              el.show().focus();
            });


        };
    });





    umbDir.directive('uiKeydown', ['keypressHelper', function(keypressHelper){
      return {
        link: function (scope, elm, attrs) {
          keypressHelper('keydown', scope, elm, attrs);
        }
      };
    }]);

    umbDir.directive('uiKeypress', ['keypressHelper', function(keypressHelper){
      return {
        link: function (scope, elm, attrs) {
          keypressHelper('keypress', scope, elm, attrs);
        }
      };
    }]);

    umbDir.directive('uiKeyup', ['keypressHelper', function(keypressHelper){
      return {
        link: function (scope, elm, attrs) {
          keypressHelper('keyup', scope, elm, attrs);
        }
      };
    }]);

    return umbDir;
});
