/* global angular */
angular.module('angular-progress-pie', [])
  .directive('progressPie', function () {
    function printError (message, defaultValue) {
      var messageToPrint = '[progressPie] ' + message

      if (defaultValue) {
        messageToPrint += ', using default of ' + defaultValue + 'px instead'
      }

      console.error(messageToPrint)
    }

    return {
      scope: {
        value: '=',
        invertFill: '=',
        min: '@',
        max: '@'
      },
      restrict: 'E',
      replace: false,
      template: '<svg style="display: block;">' +
                  '<path class="progress-pie" />' +
                '</svg>',
      compile: function (element, attrs) {
        var DEFAULT_RADIUS = 50
        var DEFAULT_MIN = 0
        var DEFAULT_MAX = 100

        var radius = DEFAULT_RADIUS

        if (!attrs.radius) {
          printError('Radius not supplied as attribute for pie timer', DEFAULT_RADIUS)
        } else {
          radius = parseFloat(attrs.radius, 10)

          if (isNaN(radius)) {
            printError('Radius \'' + attrs.radius + '\' is not a valid number', DEFAULT_RADIUS)
            radius = DEFAULT_RADIUS
          }
        }

        // Set attributes of SVG circle
        var diameter = radius / 2
        element.attr('width', diameter)
        element.attr('height', diameter)
        element.attr('viewbox', '0 0 ' + diameter + ' ' + diameter)
        element.find('path').attr('transform', 'translate(' + diameter + ',' + diameter + ')')

        // Limits the given number to be between the provided lower and upper bounds
        function clampNumber (number, lower, upper) {
          if (upper !== undefined) { number = number <= upper ? number : upper }
          if (lower !== undefined) { number = number >= lower ? number : lower }
          return number
        }

        // Generates the path attributes string
        function generateD (diameter, mid, x, y) {
          return 'M 0 0 v -' + diameter + ' A ' + diameter + ' ' + diameter + ' 1 ' + mid +
                 ' 1 ' + x + ' ' + y + ' z'
        }

        // Main link function of the directive
        var link = function ($scope, element, attrs) {
          var path = element.find('path')

          // Validate the upper and lower limits
          var min = parseFloat($scope.min, 10) || DEFAULT_MIN
          var max = parseFloat($scope.max, 10) || DEFAULT_MAX

          function render () {
            var fillPercentage = ((clampNumber($scope.value, min, max) - min) / (max - min)) * 100

            // Determine if we are additive or subtractive filling for the circle
            var fillAmount = $scope.invertFill ? (100 - fillPercentage) : fillPercentage

            // Internal angle of fill. Don't let it go above 360 or the circle dissapears
            var alpha = (fillAmount / 100) * 360
            alpha = clampNumber(alpha, 0, 359.999)

            // Calculate fill paramters
            var r = (alpha * Math.PI) / 180
            var x = Math.sin(r) * diameter
            var y = Math.cos(r) * -diameter

            // Fill circle
            var mid = (alpha > 180) ? 1 : 0
            var anim = generateD(diameter, mid, x, y)
            path.attr('d', anim)
          }

          render()
          $scope.$watch('value', render)
        }

        return link
      }
    }
  })
