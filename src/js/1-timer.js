import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const getInput = document.querySelector("#datetime-picker");
const getBtn = document.querySelector("button[data-start]");

const getDays = document.querySelector(".value[data-days]");
const getHours = document.querySelector(".value[data-hours]");
const getMin = document.querySelector(".value[data-minutes]");
const getSec = document.querySelector(".value[data-seconds]");

let userSelectedDate = null;
let timerId = null;

getBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (!selectedDate || selectedDate <= new Date()) {
      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
      });

      getBtn.disabled = true;
      userSelectedDate = null;
      return;
    }

    userSelectedDate = selectedDate;
    getBtn.disabled = false;
  },
};

flatpickr(getInput, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function updateTimer() {
  const currentTime = new Date();
  const difference = userSelectedDate - currentTime;

  if (difference <= 0) {
    clearInterval(timerId);

    getDays.textContent = "00";
    getHours.textContent = "00";
    getMin.textContent = "00";
    getSec.textContent = "00";

    getInput.disabled = false;
    getBtn.disabled = true;

    return;
  }

  const { days, hours, minutes, seconds } = convertMs(difference);

  getDays.textContent = addLeadingZero(days);
  getHours.textContent = addLeadingZero(hours);
  getMin.textContent = addLeadingZero(minutes);
  getSec.textContent = addLeadingZero(seconds);
}

getBtn.addEventListener("click", () => {
  getBtn.disabled = true;
  getInput.disabled = true;

  updateTimer();

  timerId = setInterval(updateTimer, 1000);
});
