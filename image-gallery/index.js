"use strict";

const clientID='ZZFRoyDNtIkQhyYAxyfF3exdVXVmigc9nk7h0JnQtvo';
let url = `https://api.unsplash.com/photos/random/?count=12&client_id=${clientID}&orientation=landscape`;
getData();

const searchButton = document.querySelector('.search-button');
const searchField = document.querySelector('.search');

searchButton.addEventListener('click', getInput);

function getInput(){
    let input = searchField.value;
    url=`https://api.unsplash.com/photos/random/?query=${input}&count=12&client_id=${clientID}&orientation=landscape`;
    getData();
}

let state = [];
const galleryContainer= document.querySelector('.main > .content-container');

async function getData(){
    const res = await fetch(url);
    const data = await res.json();
    state = data;
    setData(state);
}

function setData(array){
    let links = array.map((item) => {return item.urls.regular});
    console.log(links);

    while(galleryContainer.hasChildNodes()){
        const image = document.querySelector('.gallery-image');
        galleryContainer.removeChild(image);
    }

    for (let link of links){
        const image = document.createElement("img");
        image.classList.add('gallery-image');
        image.src = `${link}`;
        image.alt = 'image';
        galleryContainer.append(image);
    }
}
