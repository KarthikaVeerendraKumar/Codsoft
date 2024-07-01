document.addEventListener("DOMContentLoaded", function() {
    const currentTimeElement = document.getElementById('current-time');
    const alarmMessageElement = document.getElementById('alarm-message');
    const alarmHourSelect = document.getElementById('alarm-hour');
    const alarmMinuteSelect = document.getElementById('alarm-minute');
    const setAlarmButton = document.getElementById('set-alarm-button');

    let alarmTime = null;
    let alarmTimeout = null;

    // Populate hour and minute select elements
    for (let i = 0; i < 24; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = i.toString().padStart(2, '0');
        alarmHourSelect.appendChild(option);
    }

    for (let i = 0; i < 60; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = i.toString().padStart(2, '0');
        alarmMinuteSelect.appendChild(option);
    }

    // Update current time every second
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;

        if (alarmTime && now >= alarmTime) {
            alarmMessageElement.textContent = "Alarm ringing!";
            clearTimeout(alarmTimeout);
            alarmTimeout = null;
            alarmTime = null;
            alert("Alarm ringing!");
        }
    }

    setInterval(updateTime, 1000);

    setAlarmButton.addEventListener('click', function() {
        const selectedHour = parseInt(alarmHourSelect.value);
        const selectedMinute = parseInt(alarmMinuteSelect.value);
        const now = new Date();

        alarmTime = new Date();
        alarmTime.setHours(selectedHour);
        alarmTime.setMinutes(selectedMinute);
        alarmTime.setSeconds(0);

        if (alarmTime < now) {
            alarmTime.setDate(alarmTime.getDate() + 1);
        }

        alarmMessageElement.textContent = `Alarm set for ${alarmTime.toLocaleTimeString()}`;

        if (alarmTimeout) {
            clearTimeout(alarmTimeout);
        }

        alarmTimeout = setTimeout(() => {
            alarmMessageElement.textContent = "Alarm ringing!";
            alert("Alarm ringing!");
        }, alarmTime.getTime() - now.getTime());
    });
});
