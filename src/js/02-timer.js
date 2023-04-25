
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Import additional css styles
import 'flatpickr/dist/flatpickr.min.css'

let getRef = selector => document.querySelector(selector);
const imputDatePickerRef = getRef('#datetime-picker');
const btnStartRef = getRef('[data-start]');
const daysRef = getRef('[data-days]');
const hoursRef = getRef('[data-hours]');
const minutesRef = getRef('[data-minutes]');
const secondsRef = getRef('[data-seconds]');

let timeDifference = 0;
let timerId = null;
let formatDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        currentDifferenceDate(selectedDates[0]);
    },
};

btnStartRef.setAttribute('disabled', true);

// Initial flatpickr
flatpickr(imputDatePickerRef, options);

// Set click event listener on button start
btnStartRef.addEventListener('click', onBtnStart);

// Start timer
function onBtnStart() {
    timerId = setInterval(startTimer, 1000);
}

//date checking and rendering of date difference
function currentDifferenceDate(selectedDates) {
    const currentDate = Date.now();

    if (selectedDates < currentDate) {
        btnStartRef.setAttribute('disabled', true);
        return Notify.failure('Please choose a date in the future');
    }

    timeDifference = selectedDates.getTime() - currentDate;
    formatDate = convertMs(timeDifference);

    renderDate(formatDate);
    btnStartRef.removeAttribute('disabled');
}

//Timer
function startTimer() {
    btnStartRef.setAttribute('disabled', true);
    imputDatePickerRef.setAttribute('disabled', true);

    timeDifference -= 1000;

    if (secondsRef.textContent <= 0 && minutesRef.textContent <= 0) {
        Notify.success('Time end');
        clearInterval(timerId);
    } else {
        formatDate = convertMs(timeDifference);
        renderDate(formatDate);
    }
}

// Rendering date
function renderDate(formatDate) {
    secondsRef.textContent = formatDate.seconds;
    minutesRef.textContent = formatDate.minutes;
    hoursRef.textContent = formatDate.hours;
    daysRef.textContent = formatDate.days;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
