const alarmTimeInput = document.getElementById('alarmTime');
const setAlarmBtn = document.getElementById('setAlarmBtn');
const statusElement = document.getElementById('status');
const alarmSound = document.getElementById('alarmSound');

let alarmTime = null;
let alarmTimeout = null;

setAlarmBtn.addEventListener('click', () => {
    if (alarmTimeInput.value) {
        const [hours, minutes] = alarmTimeInput.value.split(':');
        alarmTime = new Date();
        alarmTime.setHours(hours);
        alarmTime.setMinutes(minutes);
        alarmTime.setSeconds(0);
        const now = new Date();

        if (alarmTime > now) {
            const timeToAlarm = alarmTime - now;
            clearTimeout(alarmTimeout);
            alarmTimeout = setTimeout(triggerAlarm, timeToAlarm);
            statusElement.textContent = `Alarm set for ${alarmTime.toLocaleTimeString()}`;
        } else {
            statusElement.textContent = 'Please set a future time for the alarm.';
        }
    } else {
        statusElement.textContent = 'Please set a valid time for the alarm.';
    }
});

function triggerAlarm() {
    alarmSound.play();
    statusElement.textContent = 'Alarm ringing!';
}
