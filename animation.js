function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
}

const animationItems = document.querySelectorAll('.animated_item');

function checkSlide() {
    animationItems.forEach(item => {
        const itemInAt = (window.scrollY + window.innerHeight) - item.getBoundingClientRect().height/2;
        const isHalfShown = itemInAt > item.offsetTop;
        if (isHalfShown) {
            item.classList.add('active')}
    })
}
window.addEventListener('scroll', debounce(checkSlide))  

const burgerButton = document.querySelector('.header__burger');
const navigationMenu = document.querySelector('.navigation');

burgerButton.addEventListener('click', () => {
  burgerButton.classList.toggle('open')
  navigationMenu.classList.toggle('open')
})

window.addEventListener('click',(e) => {
  let withinBoundaries = (e.composedPath().includes(burgerButton) || e.composedPath().includes(navigationMenu));
  if (!withinBoundaries) {
      burgerButton.classList.remove('open');
      navigationMenu.classList.remove('open')
  }
});