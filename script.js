document.addEventListener('DOMContentLoaded', function () {
    // Check if goals are already set in local storage
    if (localStorage.getItem('dailyGoal')) {
        document.getElementById('dailyGoal').textContent = localStorage.getItem('dailyGoal');
    }

    // Load workout history from local storage
    loadWorkouts();
    updateTotalDuration();
});

function addWorkout() {
    const workoutInput = document.getElementById('workout');
    const durationInput = document.getElementById('duration');

    const workout = workoutInput.value;
    const duration = parseInt(durationInput.value);

    if (workout && !isNaN(duration) && duration > 0) {
        // Save workout to local storage
        saveWorkout({ workout, duration });

        // Update UI
        loadWorkouts();
        updateTotalDuration();

        // Clear input fields
        workoutInput.value = '';
        durationInput.value = '';
    } else {
        alert('Please enter valid workout details.');
    }
}

function saveWorkout(workout) {
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
}

function loadWorkouts() {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    const workoutList = document.getElementById('workouts');
    workoutList.innerHTML = '';

    workouts.forEach((workout, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${workout.workout} - ${workout.duration} min`;
        workoutList.appendChild(listItem);
    });
}

function setGoal() {
    const goalInput = document.getElementById('goal');
    const goal = parseInt(goalInput.value);

    if (!isNaN(goal) && goal > 0) {
        // Save goal to local storage
        localStorage.setItem('dailyGoal', goal);

        // Update UI
        document.getElementById('dailyGoal').textContent = goal;

        // Clear input field
        goalInput.value = '';
    } else {
        alert('Please enter a valid daily goal.');
    }
}

function updateTotalDuration() {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    const totalDuration = workouts.reduce((total, workout) => total + workout.duration, 0);

    document.getElementById('totalDuration').textContent = totalDuration;
}
