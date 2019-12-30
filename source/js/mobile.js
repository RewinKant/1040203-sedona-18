var navMain = document.querySelector('.nav');
var navToggle = document.querySelector('.nav__button');

navMain.classList.add('nav--close');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('nav--close')) {
    navMain.classList.remove('nav--close');
    navMain.classList.add('nav--show');
  }else {
    navMain.classList.remove('nav--show');
    navMain.classList.add('nav--close');
  }
});
