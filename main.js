{
    init: function(elevators, floors) {
        console.clear();
        var originsOfRequests = [];
        const topFloor = floors.length - 1;
        var elevator = elevators[0];

        floors.forEach(function(floor) {
            var floorNum = floor.floorNum();
            console.log("adding listeners for floor ", floorNum)

            floor.on("up_button_pressed", function() {
                originsOfRequests.push(floorNum);
                printOriginsOfRequests();
            });

            floor.on("down_button_pressed", function() {
                originsOfRequests.push(floorNum);
                printOriginsOfRequests();
            });

        });

        elevator.on("idle", function() {
            var pressedFloors = elevator.getPressedFloors();

            if(pressedFloors.length == 0) {
                if(originsOfRequests.length > 0) {
                    // get most popular floor among the floors that have pressed up/down buttons
                    var floorNum = mode(originsOfRequests);
                    elevator.goToFloor(floorNum);
                    // remove that floor from the array of origins of up/down presses
                    var filteredArray = originsOfRequests.filter(e => e !== floorNum);
                    originsOfRequests = filteredArray;
                }

                // do the default, dumb moving behavior when there are no passengers and no requests from other floors
                defaultMovement();
            }
            else {
                // there are pressed floors (passengers in elevator), so move to first pressed floor in the array
                elevator.goToFloor(pressedFloors[0]);
            }

        });

        function defaultMovement() {
            // if current floor isn't top floor go up; otherwise, go to ground floor
            var currentFloor = elevator.currentFloor()
            if(currentFloor < topFloor) {
                elevator.goToFloor(currentFloor + 1)
            }
            else {
                elevator.goToFloor(0)
            }
        }

        function printOriginsOfRequests() {
            console.log('origin of request floors: ' + originsOfRequests); 
        }

        var mode = function mode(arr) {
            // borrowed from https://codereview.stackexchange.com/questions/68315/finding-the-mode-of-an-array
            var numMapping = {};
            var greatestFreq = 0;
            var mode;
            arr.forEach(function findMode(number) {
                numMapping[number] = (numMapping[number] || 0) + 1;
        
                if (greatestFreq < numMapping[number]) {
                    greatestFreq = numMapping[number];
                    mode = number;
                }
            });
            return +mode;
        }
    },
        update: function(dt, elevators, floors) {
            elevator = elevators[0];
            console.log('----------------------------------------------------------');
            var output = '';
            output += 'pressed floors: ' + elevator.getPressedFloors().length + ' | ';
            output += 'current floor: ' + elevator.currentFloor() + ' | ';
            output += 'load: ' + elevator.loadFactor() + ' | ';
            console.log(output);
        }
}