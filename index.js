//jshint esversion:9

//const express= require('express');

//necesito un array con los nombres/identificador de cada set disponible, este array estaria
//ordenado originalmente en el orden que los sets fueron creados
//cuando quiero hacer los botones/lista de sets haria un for loop por este array para crearlos.
//al momento de crearlos, aniado un attribute a los botones, este attribute despues serviria para
//buscar en un diccionario(opcion mas rapida) la informacion necesaria para crea la pagina de cards

const setArray = [
    "Leccion 1",
    "Leccion 2",
    "Leccion 3"
];

//objeto
const objSets = {
    "Leccion 1": [
        {"けむり（煙）"	:"humo"},
        {"まっしろ（真っ白）「な」":"totalmente blanco"},
        {"なかみ（中身）":	"contenido"},
    ],
    "Leccion 2": [
        {"じょうほう（情報）" :	"informacion"},
        {"ぶんぽう（文法）"	: "gramatica"},
        {"はつおん（発音）"	: "pronunciacion"},
    ],
};



const app = document.getElementById('app');
const setContainer = document.querySelector('.set-container');

CreateHomepageApp(setContainer);

function CreateHomepageApp(container){
    setArray.forEach(set => {
        let card = document.createElement('div');
        container.appendChild(card);
        let button = document.createElement('button');
        button.textContent = set;
        button.setAttribute('name', set);
        button.addEventListener('click', SetButton);
        card.appendChild(button);
    });
}

function SetButton(event){
    let stringKey = event.target.name;   
    // console.log(objSets[stringKey][0]);
    // console.log(Object.keys(objSets[stringKey])[0]);

    let [key, value] = Object.entries(objSets[stringKey][0])[0];
    console.log(key);
    console.log(value);
}




//////////////// OLD /////////////////////

// let set = {
//     name : "leccion 1",
//     cards : [
//     {"けむり（煙）"	:"humo"},
//     {"まっしろ（真っ白）「な」":"totalmente blanco"},
//     {"なかみ（中身）":	"contenido"},
//     ]
// };

//array
// const sets = [
//     {
//         name : "Leccion 1",
//         cards : [
//         {"けむり（煙）"	:"humo"},
//         {"まっしろ（真っ白）「な」":"totalmente blanco"},
//         {"なかみ（中身）":	"contenido"},
//         ] 
//     },
//     {
//         name : "Leccion 2",
//         cards : [
//         {"けむり（煙）"	:"humo"},
//         {"まっしろ（真っ白）「な」":"totalmente blanco"},
//         {"なかみ（中身）":	"contenido"},
//         ] 
//     }
// ];