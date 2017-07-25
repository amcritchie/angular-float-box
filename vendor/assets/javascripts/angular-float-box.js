/**
* CRUD container framework for AngularJS
* @version v0.0.1 - 2013-04-06
* @link http://angular-ui.github.com/
* @license MIT License, http://www.opensource.org/licenses/MIT
*/

(function (window, angular, undefined) {
  'use strict';
  angular.module('angular-float-box', [])
  .service('floatBox', ['scroll', 'draggable',
  function(scroll, draggable) {

    // Call floatBox.initializes in the controller to create listeners for scrolling and dragging float-box
    this.initialize = function($scope) {
      scroll.initialize();
      draggable.initialize($scope);
    }

    // Show float-box
    this.show = function() {
      $( "#float-box" ).show()
    }
    // Hide float-box
    this.hide = function() {
      $( "#float-box" ).hide()
    }
    // Show float-box via fade.
    this.fade_in = function() {
      $( "#float-box" ).show( "fade")
    }
    // Show float-box via fade.
    function fade_in() {
      $( "#float-box" ).show( "fade")
    }
    this.fade_in = fade_in;
    // Hide float-box via fade.
    this.fade_out = function() {
      if ($(window).width() < 768) {
        $( "#float-box" ).hide( "fade")
      };
    }

    // Display float-box-create tab.
    this.create = function() {
      // Show float-box-create-tab if not already shown.
      $('float-box-create-tab a').tab('show');
      // Reset defaults and show if needed.
      new_float_box_instance($('float-box-create'));
    }
    // Display float-box-read tab.
    this.read = function() {
      // Show float-box-read-tab if not already shown.
      $('float-box-read-tab a').tab('show');
      // Reset defaults and show if needed.
      new_float_box_instance($('float-box-read'));
    }
    // Display float-box-update tab.
    this.update = function() {
      // Show float-box-update-tab if not already shown.
      $('float-box-update-tab a').tab('show')
      // Reset defaults and show if needed.
      new_float_box_instance($('float-box-update'))
    }

    // function refresh_float_box($action_tab) {
    function new_float_box_instance($action_tab) {
      // Show float-box if needed.
      fade_in()
      // Show default tab.
      $action_tab.find('.float-box-default-tab').tab('show')
      // Focus on default input.
      $action_tab.find('.float-box-default-input').focus()
    }
  }])
  .service('draggable', [function() {
    this.initialize = function($scope) {
      $scope.draggable_on = function() {
        $('#float-box').draggable('enable');
        $scope.draggable_disabled = false;
      }
      $scope.draggable_off = function() {
        $('#float-box').draggable('disable');
        $('#float-box').css('top', '').css('left', '').css('right', '').css('bottom', '');
        $scope.draggable_disabled = true;
      }
      $scope.draggable_disabled = true;
      $('#float-box').draggable().draggable('disable');
    }
  }])
  .service('scroll', ['$timeout', 'title',
  function($timeout, title) {
    this.initialize = function() {
      // How many pixels needed for scroll to shrink.
      var shrink_treshold = 10;
      // Variable needed to check direction of scroll.
      var last_scroll_top = 0;
      // Boolean to mark if a shrink is still in process or not.
      var animation_complete = true;
      // Setup float-box scroll listener.
      $('.float-box-container').scroll(function(event){
        // Distance from top of float-box-container
        var scroll_top = $(this).scrollTop();
        // Check direction of scroll.
        if (scroll_top > last_scroll_top){
          // Down scroll
          if (this.scrollTop > shrink_treshold) {
            // Within threshold for shrinking.
            if (animation_complete && !$('.float-box-container').hasClass("smaller")) {
              $('.float-box-container').addClass("smaller");
              animation_complete = false
              $timeout(function(){ animation_complete = true }, 500);
            }
          }
        } else {
          // Up scroll
          if (this.scrollTop <= shrink_treshold) {
            // Outside of threshold for shrinking.
            if (animation_complete) {
              $('.float-box-container').removeClass("smaller");
              // Adjust title when smaller class is removed.
              title.adjust($('float-box-title:visible'))
              animation_complete = false
              $timeout(function(){ animation_complete = true; }, 500);
            }
          }
        }
        last_scroll_top = scroll_top;
      });
    };
  }])
  .service('title', [function() {
    var max_font_size = 40;
    this.max_font_size = max_font_size;
    // Adjust font-size of title based on size of text.
    this.adjust = function($title) {
      var $text = $title.find('.float-box-title-text');
      // Add notransition so no transition animation will get in the way of evaluating the proper font-size of title
      $text.addClass('notransition')
      // Initialize font-size of $text.
      var font_size = max_font_size;
      // Update font-size of $text.
      $text.css('font-size', font_size+'px');
      // Lower font-size until $text is thinner than $title or font-size is 20.
      while (($title.width() < $text.width()) && font_size != 20) {
        // Lower font-size by 5.
        font_size -= 5;
        // Update font-size of $text.
        $text.css('font-size', font_size+'px');
      }
      // Turn on css transitions now that font-size is updated.
      $text.removeClass('notransition')
    }
  }])
  // Float Box Title.
  .directive('floatBoxTitle', ['title', function (title ) {
    "use strict";
    return {
      restrict: 'E',
      template: '<div class="float-box-title-text">{{text}}</div>',
      scope: {
        text: '='
      },
      link: function($scope, $title, iAttrs) {
        // Watch for float-box-title element appearing.
        $scope.$watch(function() { return angular.element($title).is(':visible') }, function() {
          title.adjust($title) // Adjust font-size of title.
        });
        // Watch for changes in float-box-title text.
        $scope.$watch('text', function(a,b,c) {
          title.adjust($title) // Adjust font-size of title.
        })
      }
    }
  }])
  // Float Box Limit.
  .directive('floatBoxLimit', [function () {
    "use strict";
    return {
      restrict: 'E',
      template: '{{display}}',
      scope: {
        text: '=',
        limit: '='
      },
      link: function($scope, $title, iAttrs) {
        $scope.$watch('text', function(a,b,c) {
          // Duplicate the text that will be limited as the variable display.
          $scope.display = angular.copy($scope.text)
          // Check if the limited text is longer than the limit.
          if ($scope.text && $scope.text.length >= $scope.limit) {
            // If the limited text is longer than the limit, truncate the display.
            $scope.display = $scope.display.substring(0,$scope.limit - 1) + '..'
          }
        })
      }
    }
  }])
  // Float Box Search Bar.
  .directive('floatBoxSearchBar', [function () {
    "use strict";
    return {
      restrict: 'E',
      template:
      '<span class="input-group-btn">' +
      '<button class="btn btn-info btn-sm" type="submit">' +
      '<i type="text" class="fa fa-search"></i>' +
      '</button>' +
      '</span>' +
      '<input type="text" class="form-control input-sm" placeholder="{{placeholder}}" ng-model="model" autofocus>',
      scope: {model: '=', placeholder: '='}
    }
  }])
  // Float Box Tabs
  .directive('floatBoxCreateTab', [function () {
    return { template: '<a data-toggle="tab" data-target="float-box-create"></a>' };
  }])
  .directive('floatBoxReadTab', [function () {
    return { template: '<a data-toggle="tab" data-target="float-box-read"></a>' };
  }])
  .directive('floatBoxUpdateTab', [function () {
    return { template: '<a data-toggle="tab" data-target="float-box-update"></a>' };
  }]);

})(window, window.angular);
