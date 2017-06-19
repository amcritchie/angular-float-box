/**
* CRUD container framework for AngularJS
* @version v0.0.1 - 2013-04-06
* @link http://angular-ui.github.com/
* @license MIT License, http://www.opensource.org/licenses/MIT
*/

(function (window, angular, undefined) {
  /*jshint globalstrict:true*/
  /*global angular:false*/
  'use strict';

  angular.module('angular-float-box', [])

  .service('floatBox', ['$timeout',
  function($timeout) {

    var direction = 'right'

    // Call floatBox.initializes in the controller to create listeners for scrolling and dragging float-box
    this.initialize = function($scope, slide_direction) {
      initialize_scroll($scope)
      initialize_draggable($scope)
      direction = slide_direction;
    }

    // Initializes float-box's scroll listener.
    function initialize_scroll($scope) {
      // How many pixels needed for scroll to shrink.
      var shrink_treshold = 10;
      // Variable needed to check direction of scroll.
      var last_scroll_top = 0;
      // Boolean to mark if a shrink is still in process or not.
      var animation_complete = true;
      // Setup float-box scroll listener.
      $('#float-box-container').scroll(function(event){
        var scroll_top = $(this).scrollTop();
        var is_down_scroll = (scroll_top > last_scroll_top)
        // Check direction of scroll.
        if (scroll_top > last_scroll_top){
          // Down scroll
          if (this.scrollTop > shrink_treshold) {
            // Within threshold for shrinking.
            if (animation_complete && !$('.float-box-head').hasClass("smaller")) {
              $('.float-box-head').addClass("smaller");
              $('.float-box-space').addClass("smaller");
              animation_complete = false
              setTimeout(function(){ animation_complete = true }, 500);
            }
          }
        } else {
          // Up scroll
          if (this.scrollTop <= shrink_treshold) {
            // Outside of threshold for shrinking.
            if (animation_complete) {
              $('.float-box-head').removeClass("smaller");
              $('.float-box-space').removeClass("smaller");
              animation_complete = false
              setTimeout(function(){ animation_complete = true; }, 500);
            }
          }
        }
        last_scroll_top = scroll_top;
      });
    };

    // Initializes float-box's positionable listener.
    function initialize_draggable($scope) {
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
    };

    // Show float-box
    this.show = function() {
      $( "#float-box" ).show()
    }
    // Hide float-box
    this.hide = function() {
      $( "#float-box" ).hide()
    }
    // Show float-box via slide in from the direction specified.
    this.slide_in = function(direction) {
      $( "#float-box" ).show( "drop", {direction: direction})
    }
    // Show float-box via slide in from the direction specified.
    function slide_in(slide_direction) {
      direction = slide_direction || direction
      $( "#float-box" ).show( "drop", {direction: direction})
    }
    this.slide_in = slide_in;
    // Hide float-box via slide in from the direction specified.
    this.slide_out = function(direction) {
      if ($(window).width() < 768) {
        $( "#float-box" ).hide( "drop", {direction: direction})
      };
    }

    // Display float-box-create tab.
    this.create = function() {
      // Show float-box-create-tab if not already shown.
      $('#float-box-create-tab').tab('show');
      // Reset defaults and show if needed.
      new_float_box_instance($('float-box-create'));
    }

    // Display float-box-read tab.
    this.read = function() {
      // Show float-box-read-tab if not already shown.
      $('#float-box-read-tab').tab('show');
      // Reset defaults and show if needed.
      new_float_box_instance($('float-box-read'));
    }

    // Display float-box-update tab.
    this.update = function() {
      // Show float-box-update-tab if not already shown.
      $('#float-box-update-tab').tab('show')
      // Reset defaults and show if needed.
      new_float_box_instance($('float-box-update'))
    }

    // function refresh_float_box($action_tab) {
    function new_float_box_instance($action_tab) {
      // Show float-box if needed.
      slide_in(direction)
      // Show default tab.
      $action_tab.find('.float-box-default-tab').tab('show')
      // Focus on default input.
      $action_tab.find('.float-box-default-input').focus()
    }
  }])

  .directive('floatBoxTitle', ['$window', function ( $window ) {
    "use strict";
    return {
      restrict: 'E',
      template: '<div class="float-box-title-text">{{text}}</div>',
      scope: {text: '='},
      link: function($scope, $title, iAttrs) {
        $scope.$watch('text', function(a,b,c) {
          var $text = $title.find('.float-box-title-text');
          // Turn off css transitions so while loop doesn't get stuck.
          $text.addClass('notransition')
          // Initialize font-size of title.
          var font_size = 40
          $text.css('font-size', font_size+'px');
          // Lower font-size until $text is thinner than $title or font-size is 20.
          while (($title.width() < $text.width()) && font_size != 20) {
            // Lower font-size by 5 and update font-size of $text.
            font_size -= 5
            $text.css('font-size', font_size+'px');
          }
          // Turn on css transitions now that font-size is updated.
          $text.removeClass('notransition')
        })
      }
    }
  }])

  .directive('floatBoxSearchBar', ['$window', function ( $window ) {
    "use strict";
    return {
      restrict: 'E',
      template: '<div class="float-box-title-text">{{text}}</div>',
      template:
      '<span class="input-group-btn">' +
      '<button class="btn btn-info btn-sm" type="submit">' +
      '<i type="text" class="fa fa-search"></i>' +
      '</button>' +
      '</span>' +
      '<input type="text" class="form-control input-sm" placeholder="{{placeholder}}" ng-model="model" autofocus>',
      scope: {model: '=', placeholder: '='}
    }
  }]);

})(window, window.angular);
