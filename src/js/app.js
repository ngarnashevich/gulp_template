document.addEventListener('DOMContentLoaded', () => {

// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const navbar = document.querySelector('.navbar')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    if (!navbar.classList.contains('active')) {
      navbar.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      navbar.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      navbar.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu()


// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector('nav')

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav')
  } else {
    nav.classList.remove('fixed__nav')
  }
}
window.addEventListener('scroll', fixedNav)

});


