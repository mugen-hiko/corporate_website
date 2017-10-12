$(() => {
  let toggle = $('#nav-toggle');
  let menu   = $('#nav-menu');

  toggle.click(() => {
    toggle.toggleClass('is-active');
    menu.toggleClass('is-active');
  });

  if (location.hash) {
    let navOffset = $('nav').height();

    scrollBy(0, -(navOffset));
  }
});
