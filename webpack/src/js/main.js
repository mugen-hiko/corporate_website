import '../scss/main.scss';

import '../img/assessment-and-proposal.svg';
import '../img/consultant-gray.jpg';
import '../img/consultant-mono.jpg';
import '../img/consultation.svg';
import '../img/department-support.svg';
import '../img/devops.svg';
import '../img/favicon.ico';
import '../img/hero.svg';
import '../img/logo.svg';
import '../img/logo-invert.svg';
import '../img/og-image.png';
import '../img/project-support.svg';
import '../img/rental-cio.svg';
import '../img/rental-cto.svg';
import '../img/rental-staff.svg';
import '../img/sre.svg';

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
