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

    // Call floatBox.initializes in the controller to create listeners for scrolling and dragging float-box
    this.initialize = function($scope) {
      initialize_scroll($scope)
      initialize_draggable($scope)
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

    // Normalize the font-size of the title so it doesn't take more than one line.
    this.normalize_title = function(){
      // Find float-box-title and it's text.
      var title = $(".float-box-title");
      var title_text = $(".float-box-title-text");
      // Remove js generated font-size.
      title_text.css("font-size", "")
      // Let DOM load so the title_text is fully rendered
      $timeout(function() {
        // If title text is larger than the width of the title div, lower the font-size.
        if ((title_text.width() > title.width())) {
          // Set the font-size to the .smaller font-size
          title_text.css("font-size", 20)
        }
      })
    }

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
    // Hide float-box via slide in from the direction specified.
    this.slide_out = function(direction) {
      if ($(window).width() < 768) {
        $( "#float-box" ).hide( "drop", {direction: direction})
      };
    }

    // Display float-box-create tab.
    this.create = function() {
      // Show float-box-create-tab if not already shown.
      $('#float-box-create-tab').tab('show')
    }

    // Display float-box-read tab.
    this.read = function() {
      // Show float-box-read-tab if not already shown.
      $('#float-box-read-tab').tab('show')
      // Show default tab if the is one.
      $('.float-box-read-default-tab').tab('show')
    }

    // Display float-box-update tab.
    this.update = function() {
      // Show float-box-update-tab if not already shown.
      $('#float-box-update-tab').tab('show')
    }
  }]);
})(window, window.angular);
