{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator

        // Whenever the elevator is idle (has no more queued destinations) ...
        elevator.on("idle", function() {

            // Listen for up and down button presses, and queue those right away
            floors.forEach(function(floor) {
                floor.on("up_button_pressed", function() {
                    if(elevator.loadFactor() < 0.25) {                
                        // go to floor of pressed up indicator right away
                        elevator.goToFloor(floor.floorNum(), true);
                    }
                });

                floor.on("down_button_pressed", function() {
                    if(elevator.loadFactor() < 0.25) {                
                        // go to floor of pressed up indicator right away
                        elevator.goToFloor(floor.floorNum(), true);
                    }
                });
            });

            elevator.goToFloor(0);
            elevator.goToFloor(1);
            elevator.goToFloor(2);
            elevator.goToFloor(3);
            elevator.goToFloor(4);
            elevator.goToFloor(3);
            elevator.goToFloor(2);
            elevator.goToFloor(1);
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}