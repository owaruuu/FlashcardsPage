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
        {"けむり（煙）"	:"humo", "knowledge" : ""},
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
        {"おばさん":"señora"},
        {"しろ（城）":	"castillo"},
    ],
};

let termIndex = 0;

const app = document.getElementById('app');
const setContainer = document.querySelector('.sets-container');

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
    // foundText.textContent = "0 found.";
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
    console.log('clicked boton');
    app.innerHTML = '';

    let lectureTitle = document.createElement('h1');
    lectureTitle.textContent = stringKey;
    app.appendChild(lectureTitle);
    
    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-div');
    app.appendChild(buttonsContainer);

    let learnButton = document.createElement('button');
    learnButton.classList.add('learn-button');
    learnButton.textContent = 'Learn';
    learnButton.setAttribute('data-lecture', stringKey);
    learnButton.addEventListener('click', LearnLecture);
    buttonsContainer.appendChild(learnButton);

    let container = document.createElement('div');
    container.classList.add('set-container');
    app.appendChild(container);

    let cardArray = Object.values(objSets[stringKey]);

    //create each card
    cardArray.forEach(pair => {
        let [key, value] = Object.entries(pair)[0];
        CreatePairCard(key, value, container);
    });
}

function LearnLecture(event){
    console.log('click learn lecture');
    let lectureKey = event.target.dataset.lecture;
    app.innerHTML = '';

    let titleDiv = CreateElement('div', app);
    titleDiv.classList.add('title-div');

    let title = CreateElement('h1', titleDiv);
    title.textContent = lectureKey;

    let middleDiv = CreateElement('div', app);
    middleDiv.classList.add('middle-div');

    let leftArrow = CreateElement('i', middleDiv);
    leftArrow.classList.add('fa-solid', 'fa-angle-left', 'fa-xl', 'arrow-btn');
    leftArrow.setAttribute('data-direction', 'left');
    leftArrow.addEventListener('click', ClickArrow);

    let bigCard = CreateElement('div', middleDiv);
    let firstLabel = CreateElement('p', bigCard);
    let prompt = CreateElement('div', bigCard);
    let promptText= CreateElement('p', prompt);
    let separator = CreateElement('div', bigCard);
    let answerDiv = CreateElement('div', bigCard);
    let answerPlaceholder = CreateElement('p', answerDiv);
    let answerText = CreateElement('p', answerDiv);
    let secondLabel = CreateElement('p', bigCard);

    let rightArrow = CreateElement('i', middleDiv);
    rightArrow.classList.add('fa-solid', 'fa-angle-right', 'fa-xl', 'arrow-btn');
    rightArrow.addEventListener('click', ClickArrow);
    rightArrow.setAttribute('data-direction', 'right');

    bigCard.classList.add('big-card');
    firstLabel.classList.add('label', 'txt-left');
    secondLabel.classList.add('label', 'txt-right');
    prompt.classList.add('prompt');
    separator.classList.add('separator');
    answerDiv.classList.add('answer-div');
    answerDiv.addEventListener('click', ClickAnswer);
    answerPlaceholder.classList.add('answer-placeholder');
    answerText.classList.add('answer');
    answerText.classList.add('hide');

    firstLabel.textContent = "Term";
    secondLabel.textContent = "Answer";

    //aqui tengo que buscar la 'carta' correspondiente, por ahora
    //poner la primera nomas
    let termObject = Object.values(objSets[lectureKey])[0];
    let [key, value] = Object.entries(termObject)[0];
    promptText.textContent = key;
    answerPlaceholder.textContent = "Click to reveal answer";
    answerText.textContent = value;

    //Knowledge buttons section
    let knowledgeDiv = CreateElement('div', app);
    let noKnowledgeButton = CreateElement('button', knowledgeDiv);
    let knowledgeButton = CreateElement('button', knowledgeDiv);

    knowledgeDiv.classList.add('knowledge-div');
    noKnowledgeButton.classList.add('learning');
    knowledgeButton.classList.add('learned');

    noKnowledgeButton.textContent = 'Learning';
    knowledgeButton.textContent = 'Learned';

    noKnowledgeButton.addEventListener('click', ClickKnowledgeButton);
    knowledgeButton.addEventListener('click', ClickKnowledgeButton);
}

function ClickKnowledgeButton(event){
    //buscar ambos botones y sacarle el checked
    document.querySelector('.learning').classList.remove('checked');
    document.querySelector('.learned').classList.remove('checked');

    //ponerle checked al que hice click
    event.target.classList.add('checked');

    //aqui buscar el termino actual en el set
    //modificar 'knowledge' basado en el boton apretado

    setTimeout(() => ShowNextTerm(1), 150);
}

function ShowNextTerm(dir){
    console.log('changing term');
    
    //necesito buscar el siguiente termino y popular la tarjeta
    let currentLecture = document.querySelector('.title-div').firstChild.textContent;
    let termsArray = Object.values(objSets[currentLecture]);

    if(termIndex + dir == termsArray.length){
        termIndex = 0;
    }else if(termIndex + dir < 0){
         termIndex = termsArray.length - 1;
    }else{
        termIndex += dir;
    }

    let termObj = termsArray[termIndex];

    let [key, value] = Object.entries(termObj)[0];

    //aqui buscar el termino actual y basado en 'knowledge'
    //modificar las clases de los botones de abajo
    let knowledge = Object.values(termObj)[1];
    console.log(knowledge);

    // console.log(key, value);

    //popular datos
    let prompt = document.querySelector('.prompt').firstChild;
    prompt.textContent = key;

    let placeholder = document.querySelector('.answer-placeholder');
    placeholder.classList.remove('hide');

    let answer = document.querySelector('.answer');
    answer.classList.add('hide');
    answer.textContent = value;
    //reset botones
    //buscar informacion guardada sobre boton
    document.querySelector('.learning').classList.remove('checked');
    document.querySelector('.learned').classList.remove('checked');
}

function ClickAnswer(){
    console.log('click en answer');
    //aqui es cuando cambio de estado los 'p' para mostrar la respuesta
    let placeholder = document.querySelector('.answer-placeholder');
    placeholder.classList.toggle('hide');

    let answer = document.querySelector('.answer');
    answer.classList.toggle('hide');
}

function ClickArrow(event){
    let direction = event.target.dataset.direction;
    // console.log(event.target.dataset.direction);

    if(direction === 'left'){
        ShowNextTerm(-1);
    }else{
        ShowNextTerm(1);
    }
}

function CreateElement(elem, parent){
    let element =document.createElement(`${elem}`);
    parent.appendChild(element);
    return element;
}

function CreatePairCard(key, value, parent){
    //create container div
    let container = document.createElement('div');
    container.classList.add('pair-card-container');
    parent.appendChild(container);

    //create key div
    let keyDiv = document.createElement('div');
    keyDiv.textContent = key;
    keyDiv.classList.add('keyDiv');
    container.appendChild(keyDiv);

    //create value div
    let valueDiv = document.createElement('div');
    valueDiv.textContent = value;
    valueDiv.classList.add('valueDiv');
    container.appendChild(valueDiv);

    //create misc div
    // <i class="fa-regular fa-star"></i>
    let miscDiv = document.createElement('div');
    let star = document.createElement('i');
    star.classList.add('fa-regular', 'fa-star');
    miscDiv.appendChild(star);
    container.appendChild(miscDiv);
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