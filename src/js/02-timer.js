
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startEl = document.querySelector('[data-start]');
startEl.disabled = true;

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = null;
let selectedTime = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (timerId) clearInterval(timerId);

        if (selectedDates[0] < Date.now()) {

            startEl.disabled = true;
            Notiflix.Notify.failure('Please choose a date in the future');
            return;
        } else {

            startEl.disabled = false;
        }

        selectedTime = selectedDates[0];
        timerUpdate(convertMs(selectedTime - Date.now()));
    },
};

function onStart() {
    let remainingTime = selectedTime - Date.now();
    startEl.disabled = true;

    timerId = setInterval(() => {
        remainingTime = selectedTime - Date.now();
        if (remainingTime > 0) {
            timerUpdate(convertMs(remainingTime));
        } else {
            clearInterval(timerId);
            Notiflix.Notify.info('Time is gone!');
        }
    }, 1000);
}

flatpickr('#datetime-picker', options);

function pad(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function timerUpdate({ days, hours, minutes, seconds }) {
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
}

startEl.addEventListener('click', onStart);
