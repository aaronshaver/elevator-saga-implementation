{
    init: function(elevators, floors) {
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

        // Whenever the elevator is idle (has no more queued destinations)
        elevator.on("idle", function() {
            var pressedFloors = elevator.getPressedFloors();
            var currentFloor = elevator.currentFloor();
            if (pressedFloors.length == 0) {
                var nextFloor = currentFloor + 1;
                if (nextFloor == floors.length) {
                    nextFloor = 0;
                }
                elevator.goToFloor(nextFloor);              
            }
            else {
                var nextFloor = getClosestFloor(currentFloor, pressedFloors);
                elevator.goToFloor(nextFloor);
            }
        });

        function getClosestFloor(currentFloor, pressedFloors) {
            var closestFloor = 1000;
            pressedFloors.forEach(function(floor) {
                if (Math.abs(currentFloor - floor) < Math.abs(closestFloor - floor)) {
                   closestFloor = floor;
                }
            });
            return closestFloor;
        }

    },
    update: function(dt, elevators, floors) {
    }
}
