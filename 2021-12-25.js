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
            if (pressedFloors.includes(0)) {
                elevator.goToFloor(0);
            }
            else if (pressedFloors.includes(1)) {
                elevator.goToFloor(1);
            }
            else  if (pressedFloors.includes(2)) {
                elevator.goToFloor(2);
            }
            else if (pressedFloors.includes(3)) {
                elevator.goToFloor(3);
            }
            else if (pressedFloors.includes(4)) {
                elevator.goToFloor(4);
            }
            else {
                elevator.goToFloor(0);
            }
        });
        
        elevator.
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
