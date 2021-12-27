{
    init: function(elevators, floors) {
        var upDownPressRequests = [];

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
            // main elevator movement logic
            elevator.on("idle", function() {
                var pressedFloors = elevator.getPressedFloors();
                var currentFloor = elevator.currentFloor();

                if (pressedFloors.length > 0) { // if we have passengers
                    var nextFloor = getClosestFloor(currentFloor, pressedFloors);
                    wrappedGoToFloor(nextFloor, elevator);
                }
                else if (upDownPressRequests.length > 0) { // if we have no passengers but do have people waiting on floors
                    wrappedGoToFloor(upDownPressRequests[0], elevator);
                }
                else { // workaround because idle is not called repeatedly, only once
                    elevator.goToFloor(elevator.currentFloor()); 
                }
            });
        });

        function getClosestFloor(currentFloor, pressedFloors) {
            var closestFloor = 1000000;
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
