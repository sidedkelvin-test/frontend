# Angular Progress Pie
Simple pie progress indicator for AngularJS

# Installation
`bower install angular-progress-pie --save`

# Usage
Make sure you inject the dependency into your project

`angular.module('myApp', ['angular-progress-pie'])`

Then you can use the directive by adding the `progress-pie` element to your HTML.

```
<progress-pie 
  radius="{integer}"
  value="{integer}" 
  min="{integer: optional, defaults to 0}"
  max="{integer: optional, defaults to 100}"
  invert-fill="{boolean: optional, defaults to false}">
</progress-pie>
```                

## Options
 * `radius`  - Integer specifying the radius of the pie. Defaults to 50px.
 * `value`  - Integer percentage between 0 and 100 of how complete the pie is. (note the limits can be changed by setting `max` and `min`)
 * `min` - Interger lower bound of `value`
 * `max` - Integer upper bound of `value`
 * `invert-fill` - Boolean which determines if the pie builds up to a full pie, or shrinks from a full pie to nothing. Defaults to `false` which means the pie starts as nothing when `value` is zero and becomes full when `value` is 100.
 
## Author
[Ashok Fernandez](https://github.com/ashokfernandez)
