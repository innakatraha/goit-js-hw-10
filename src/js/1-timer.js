import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
let userSelectedDate = null;
const btn = document.querySelector('[data-start]');
btn.disabled = true;
let timerId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    const isPastDate = userSelectedDate.getTime() <= Date.now();

    if (isPastDate) {
      iziToast.show({
        message: 'Please choose a date in the future.',
        position: 'center',
      });
    }

    btn.disabled = isPastDate;
  },
};
flatpickr('#datetime-picker', options);
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
  return String(value).padStart(2, '0');
}
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}
btn.addEventListener('click', () => {
  btn.disabled = true;
  if (timerId) {
    clearInterval(timerId);
  }
  timerId = setInterval(() => {
    const timeDifference = userSelectedDate - new Date();
    if (timeDifference <= 0) {
      clearInterval(timerId);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    const timeComponents = convertMs(timeDifference);
    updateTimerDisplay(timeComponents);
  }, 1000);
});
