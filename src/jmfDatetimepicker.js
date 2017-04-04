angular
.module('jmfDatetimepicker', [])
.directive('jmfDatetimepicker', function(){
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			ngModel: '='
		},
		templateUrl: 'src/jmfDatetimepicker.html',
		controller: function($scope){
			$scope.show = false;
			$scope.weeks = [];
			for(var i = 0; i<6; i++){
				var days = [];
				for(j=0;j<7;j++){
					days[j] = 0;
				}
				$scope.weeks[i] = days;
			}
			
			$scope.showHide = function(){
				if (!$scope.show){
					$scope.parseDatetime($scope.ngModel);
					$scope.buildCalendar();
				}else{
					$scope.ngModel = new Date($scope.year, $scope.month, $scope.day, $scope.hour, $scope.minute, 0, 0);	
				}

				$scope.show = !$scope.show;
			};

			calculateDays = function(yr, mo){
				var obj = {
					numberOfDays: new Date(yr, mo+1, 0).getDate(),
					firstDay: new Date(yr, mo, 1).getDay()
				}
				return obj;
			};

			$scope.buildCalendar =function(){
				var days = calculateDays($scope.year, $scope.month);
				count = 1;
				$scope.weeks.forEach(function(week, i){
					week.forEach(function(day, j){
						$scope.weeks[i][j] = (i<1 && j < days.firstDay) || 
							(count > days.numberOfDays) ? {day: null, inactive: true} : {day: count++, inactive: false};
					})
				});
			};

			$scope.parseDatetime = function(dt){
				$scope.year = dt.getFullYear();
				$scope.month = dt.getMonth();
				$scope.day = dt.getDate();
				$scope.hour = dt.getHours();
				$scope.minute = dt.getMinutes();
			};

			$scope.selectDay = function(day){
				$scope.day = day;
				$scope.showHide();
			}
		}
	};
});