import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  if (delay < 0) {
    iziToast.warning({
      message: '❗ Delay cannot be negative.',
      position: 'topRight',
    });
    return;
  }

  createPromise(delay, state)
    .then(ms => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${ms}ms`,
        position: 'topRight',
      });
      form.reset();
    })
    .catch(ms => {
      iziToast.error({
        message: `❌ Rejected promise in ${ms}ms`,
        position: 'topRight',
      });
      form.reset();
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
