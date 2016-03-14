Make sure you inject the dependency into your project

`angular.module('myApp', ['angular-progress-pie'])`

Then you can use the directive by adding the `progress-pie` element to your HTML.

`
<progress-pie value="{integer}" 
              min="{integer: optional, defaults to 0}"
              max="{integer: optional, defaults to 100}"
              invert="{boolean: optional, defaults to false}"
`                