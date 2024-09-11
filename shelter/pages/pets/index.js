const blackout = document.createElement('div');
blackout.classList.add('blackout');
blackout.style.cssText = `position: fixed; left: 0; top: 0; height: 100vh; width: 100vw; background: #000; opacity: 0; z-index: -1; transition: opacity 0.9s ease;`; 
document.body.prepend(blackout);

document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('.button-burger').addEventListener('click', toggleMenu);
    document.querySelector('.menu-item-active').addEventListener('click', () => toggleMenu());

    let items = document.querySelectorAll('.menu-item');
    for(let item of items){
    item.addEventListener('click', () => toggleMenu());
    }
});

// Блокировка прокрутки страницы
function toggleMenu(){
    document.querySelector('.header').classList.toggle('open');

    if(document.querySelector('.header').classList.contains('open')){
        document.querySelector('.blackout').addEventListener('click', function(){
            document.querySelector('.header').classList.remove('open');
            document.body.style.overflow = 'visible';
            blackout.style.opacity = 0.0;
            blackout.style.zIndex = -1;
        });
        document.body.style.overflow = 'hidden'
        blackout.style.opacity = 0.5;
        blackout.style.zIndex = 1;
    } else {
        document.body.style.overflow = 'visible';
        blackout.style.opacity = 0.0;
        blackout.style.zIndex = -1;
    }
    
}  