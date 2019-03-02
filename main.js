{
    init: function(elevators, floors) {
        console.clear();
        const topFloor = floors.length - 1;
        var elevator = elevators[0];

        elevator.on("idle", function() {
            var pressedFloors = elevator.getPressedFloors();

            if(pressedFloors.length == 0) {
                // do the default, dumb moving behavior when there are no passengers and no up button presses
                defaultMovement();
            }
            else {
                // there are pressed floors (passengers in elevator), so move to first pressed floor in the array
                pressedFloors.every(function(floorNum) {
                    elevator.goToFloor(floorNum);
                    return false;
                });
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