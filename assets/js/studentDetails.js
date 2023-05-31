let accordionButton = document.getElementById('hamburger');
let menu = document.getElementsByTagName('aside');
let list = document.getElementsByClassName('studentDetails');
accordionButton.addEventListener('click', () => {
    menu[0].classList.toggle('open');
    list[0].classList.toggle('close');
})