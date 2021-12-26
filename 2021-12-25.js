{
    init: function(elevators, floors) {
        console.clear();
        var upDownPressRequests = [];
        var elevator = elevators[0];

        // add up/down button press listeners for each floor
        floors.forEach(function(floor) {
            var floorNum = floor.floorNum();

            floor.on("up_button_pressed", function() {
                upDownPressRequests.push(floorNum);
            });

            floor.on("down_button_pressed", function() {
                upDownPressRequests.push(floorNum);
            });
        });
        
        elevators.forEach(function(elevator) {
            elevator.on("idle", function() {
                var pressedFloors = elevator.getPressedFloors();
                var currentFloor = elevator.currentFloor();

                if (pressedFloors.length > 0) {
                    var nextFloor = getClosestFloor(currentFloor, pressedFloors);
                    wrappedGoToFloor(nextFloor, elevator);
                }
                else if (upDownPressRequests.length > 0) {
                    wrappedGoToFloor(upDownPressRequests[0], elevator);
                }
                else {
                    elevator.goToFloor(elevator.currentFloor()); // workaround because idle is not called repeatedly, only once
                }
            });
            
            elevator.on("passing_floor", function(floor, direction) {
                if (upDownPressRequests.includes(floor) && direction === elevator.destinationDirection()) {
                    elevator.destinationQueue.unshift(floor);
                    upDownPressRequests = upDownPressRequests.filter(e => e !== floor); // remove floor we're headed to
                    elevator.checkDestinationQueue();
                }
            });

        });

        function getClosestFloor(currentFloor, pressedFloors) {
            var closestFloor = 1000;
            pressedFloors.forEach(function(floor) {
                if (Math.abs(currentFloor - floor) < Math.abs(currentFloor - closestFloor)) {
                    closestFloor = floor;
                }
            });
            return closestFloor;
        }
        
        function wrappedGoToFloor(nextFloor, elevator) {
            upDownPressRequests = upDownPressRequests.filter(e => e !== nextFloor); // remove floor we're headed to
            elevator.goToFloor(nextFloor);
        }

    },
        update: function(dt, elevators, floors) {
        }
}
