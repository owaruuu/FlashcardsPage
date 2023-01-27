//jshint esversion:9

//const express= require('express');

const setNameArray = [
    "Leccion 1",
    "Leccion 2",
    "Leccion 3",
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
    "Leccion 3": [
        {"けむり（煙）"	:"humo"},
        {"おばさん」":"señora"},
        {"しろ（城）":	"castillo"},
    ],
};

const app = document.getElementById('app');
const setContainer = document.querySelector('.set-container');

CreateHomepageApp(setContainer);

function CreateHomepageApp(container){
    //crear barra buscar
    let searchDiv = document.createElement('div');
    searchDiv.classList.add('searchContainer');
    app.appendChild(searchDiv);

    let searchLabel = document.createElement('label');
    searchLabel.classList.add('search-label');
    searchLabel.textContent = 'Search by';
    searchDiv.appendChild(searchLabel);

    let searchOption = CreateSelectElement(
        ['Name',
        'Content',
        'Tag']
    );

    searchDiv.appendChild(searchOption);

    let search = document.createElement('input');
    search.classList.add('search');
    search.setAttribute('id', 'search');
    search.setAttribute('type', 'search');
    search.addEventListener('input', FilterSets);
    searchDiv.appendChild(search);

    let foundDiv = document.createElement('div');
    foundDiv.classList.add('foundContainer');
    let foundText = document.createElement('p');
    foundText.classList.add('foundText');
    foundText.textContent = "0 found.";
    foundDiv.appendChild(foundText);
    app.appendChild(foundDiv);

    setNameArray.forEach(set => {
        // let card = document.createElement('div');
        // container.appendChild(card);
        let button = document.createElement('button');
        // button.textContent = set;
        button.classList.add('set-button');
        button.setAttribute('name', set);
        button.addEventListener('click', FlashSetButton);
        container.appendChild(button);
        let text = document.createElement('div');
        text.textContent = set;
        button.appendChild(text);
        // card.appendChild(button);
    });
}

function FlashSetButton(event){
    let stringKey = event.currentTarget.name; 
    //aqui crear pagina con informacion de set
}

function FilterSets(event){
    //aqui filtrar lista de lecciones 
    //para mostrar solo lo que busque
    let search = document.getElementById('search');

    if(search.value === ''){
        console.log('Nada que buscar.');
        ResetFilter();
        return;
    }

    let select = document.getElementById('search-select');
    // console.log("filtering " + search.value);
    // console.log(select.options[select.selectedIndex].text);

    switch (select.value) {
        case 'Name':
            FilterByName(search.value);
            break;
        case 'Content':
            FilterByContent(search.value);
            break;
        case 'Tag':
            console.log('La busqueda por Tag no esta implementada.');
            break;
        default:
            break;
    }
}

function FilterByName(filter){
    filter = filter.toLowerCase();

    let textButton;
    let found = 0;

    let list = document.getElementsByClassName('set-button');
    for (let i = 0; i < list.length; i++) {
        textButton = list[i].firstChild.textContent;

        if(textButton.toLowerCase().indexOf(filter) > -1){
            list[i].style.display = '';
            found++;
        }else{
            list[i].style.display = 'none';
        }       
    }

    UpdateFoundText(`${found} found.`);
}

function FilterByContent(filter){
    console.log('Filtering by ' + filter);
    filter = filter.toLowerCase();
    let sets = [];
    let textButton;

    //for each pair in objSets
    for(const [key, values] of Object.entries(objSets)){
        values.forEach(pairObject => {
            const [innerKey, innerValue] = Object.entries(pairObject)[0];
            if(innerKey === filter || innerValue === filter){
                sets.push(key);
                console.log(`found ${filter} in ${key} inside "objSets"`);
                return;
            }
        });
    }

    //aqui modificar la lista si sets tiene algo
    if(sets.length > 0){
        console.log("encontre algo y modificare la lista");
        UpdateFoundText(`${sets.length} found.`);
        let list = document.getElementsByClassName('set-button');
        for (let i = 0; i < list.length; i++) {
            textButton = list[i].firstChild.textContent;
            let found = false;

            sets.forEach(name => {
                name = name.toLowerCase();
                if(found){
                    return;
                }
                if(textButton.toLowerCase().indexOf(name) > -1){
                    list[i].style.display = '';
                    found = true;
                }else{
                    list[i].style.display = 'none';
                }       
            });      
        }
    }

    console.log(sets);
}

function ResetFilter(){
    let list = document.getElementsByClassName('set-button');
    for (let i = 0; i < list.length; i++) {
            list[i].style.display = '';        
    }

    UpdateFoundText('');
}

function UpdateFoundText(text){
    let label = document.querySelector('.foundText');
    label.textContent = text;
}

function CreateSelectElement(options){
    let select = document.createElement('select');
    select.setAttribute('id', 'search-select');
    select.addEventListener('change', FilterSets);
    options.forEach(option => {
        let op = document.createElement('option');
        op.setAttribute('value', option);
        op.textContent = option;
        select.appendChild(op);
    });

    return select;
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