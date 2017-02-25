angular.module('directivePractice')
  .directive('lessonHider', function() {
    return {
      restrict: 'E',
      templateUrl: '../templates/lessonHider.html',
      scope: {
        lesson: '=',
        dayAlert: '&',
        lessons: '='
      },
      controller: function($scope, lessonService) {
        $scope.getSchedule = lessonService.getSchedule();
        $scope.checked = false;
        $scope.toggleCheck = function() {
          if ($scope.checked) {
            $scope.checked = false;
          }
        };
      },
      link: function(scope,elem,attrs) {
        scope.getSchedule.then(function(response) {
            scope.schedule = response.data;
            scope.schedule.forEach(function(schedule) {
              if (schedule.lesson.toLowerCase() === scope.lesson.toLowerCase()) {
                elem.css('text-decoration', 'line-through');
                scope.lessonDay = schedule.weekday;
                scope.checked = true;
                return;
              }
            })
          });
        scope.checkedOff = function() {
          if (scope.checked) {
            scope.checked = false;
            elem.css('text-decoration','none');
          } else {
            scope.checked = true;
            elem.css('text-decoration','line-through')
          }
        }
        scope.removeLesson = function() {
          if (scope.lessons.includes(scope.lesson)) {
            var idx = scope.lessons.indexOf(scope.lesson);
            scope.lessons.splice(idx,1);
            console.log(scope.lessons)
          }
        }
      }
    }
  })
