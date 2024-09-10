const blackout = document.createElement('div');
blackout.classList.add('blackout');
blackout.style.cssText = `position: fixed; left: 0; top: 0; height: 100vh; width: 100vw; background: #000; opacity: 0; z-index: 1;`; 
document.body.prepend(blackout);

document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('.button-burger').addEventListener('click', toggleMenu);
    document.querySelector('.menu-item-active').addEventListener('click', () => toggleMenu());
    document.querySelector('.blackout').addEventListener('click', () => toggleMenu());

    let items = document.querySelectorAll('.menu-item');
    for(let item of items){
    item.addEventListener('click', () => toggleMenu());
    }
});



// Блокировка прокрутки страницы
function toggleMenu(){
    document.querySelector('.header-top-wrapper').classList.toggle('open');

    if(document.querySelector('.header-top-wrapper').classList.contains('open')){
        document.body.style.overflow = 'hidden'
        blackout.style.opacity = 0.5;
    } else {
        document.body.style.overflow = 'visible';
        blackout.style.opacity = 0.0;
    }
    
} 