import '../scss/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.navbar-burger').forEach((el) => {
    el.addEventListener('click', () => {
      el.classList.toggle('is-active');
      document.querySelector('#' + el.dataset.target).classList.toggle('is-active');
    });
  });
});

window.addEventListener('load', () => {
  window.scrollBy(0, -(document.querySelector('nav').scrollHeight));
});
