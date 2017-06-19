# Angular Float Box

[Demo](http://planoadmin-staging.planomatic.com/#/demos/float_box)

Angular Float Box is an framework for building a mobile friendly interface for creating, reading and updating records.  To use this gem properly you will need AngularJS and Bootstrap 3

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'angular-float-box'
```

And then execute:

```bash
$ bundle
```

Or install it yourself as:

```bash
$ gem install angular-float-box
```

## Usage

### Require Assets
Require float-box to your application.css:
```scss
*= require angular-float-box.min
```
Require float-box to your application.js:
```js
//= require angular-float-box.min
```
Add the float-box module as a dependency to your application module:
```js
var app = angular.module('MyApp', ['angular-float-box'])
```
Add the float-box service as a dependency to the controller(s) you would like to use it in.
```js
app.controller("UsersCtrl", ['$scope' 'floatBox',
function($scope, floatBox) {
  ...
}])
```

### Functions
To start using the float-box functionality you will need to initialize it in your controller and pass in the $scope.
```js
floatBox.initialize($scope);
```
Float-box is built mobile friendly, which means appearing when you need it and disappearing when you don't.  For this purpose, float-box has a handful of functions for showing and hidding.
```js
// Display float-box
floatBox.show();
// Hide float-box
floatBox.hide();
// Show float-box via slide
floatBox.slide_in(direction); // right, left, top, down
// Hide float-box via slide
floatBox.slide_out(direction); // right, left, top, down
```
Navigating between create, read and update tabs.
```js
// Show float-box-create-tab if not already shown.
floatBox.create();
// Show float-box-read-tab if not already shown.
floatBox.read();
// Show float-box-update-tab if not already shown.
floatBox.update();
```
Formatting float-box
```js
// Adjust size of float-box-title if it is to large for float-box.
floatBox.normalize_title();
```

## Float-Box HTML

[Float Box Basic HTML](https://github.com/amcritchie/angular-float-box/wiki/Float-Box-HTML)
* [Float Box Create Tab HTML](https://github.com/amcritchie/angular-float-box/wiki/Float-Box-HTML-Create-Tab)
* [Float Box Read Tab HTML](https://github.com/amcritchie/angular-float-box/wiki/Float-Box-HTML-Read-Tab)
* [Float Box Update Tab HTML](https://github.com/amcritchie/angular-float-box/wiki/Float-Box-HTML-Update-Tab)


## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/angular-float-box.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
