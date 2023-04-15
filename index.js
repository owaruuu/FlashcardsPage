//jshint esversion:9

"use strict";

import {ReplaceState, PushHistoryState} from "./history.js";

//Seccion Touch Watch

function watchForHover() {
    // lastTouchTime is used for ignoring emulated mousemove events
    let lastTouchTime = 0;
  
    function enableHover() {
      if (new Date() - lastTouchTime < 500) return
      document.body.classList.add('hasHover');
    }
  
    function disableHover() {
      document.body.classList.remove('hasHover');
    }
  
    function updateLastTouchTime() {
      lastTouchTime = new Date();
    }
  
    document.addEventListener('touchstart', updateLastTouchTime, true);
    document.addEventListener('touchstart', disableHover, true);
    document.addEventListener('mousemove', enableHover, true);
  
    enableHover();
  }
  
  watchForHover();
//Fin Seccion Touch Watch

//Seccion History
let state = {
    currentPage : "home",
    lastLecture: "",
};

ReplaceState(state);

// window.history.replaceState(state, null, "");

window.onpopstate = function(event) {
    if(event.state){
        state = event.state;
    }

    Render(state);
};

function Render(state){
    switch (state.currentPage) {
        case "home":
            ReloadPage();
            break;
        case "lectureList":
            FlashSetButton(state.lastLecture);
            break;
        case "lectureFlash":
            console.log("lecture Flash");
            break;
        default:
            break;
    }
}

function ReloadPage(){
    location.reload();
}

//Fin Seccion History

var termIndex = 0;
var nextTermTimeoutId;//guarda referencia al timeout cuando hago click en un boton de knowledge

const app = document.getElementById('app');
const setContainer = document.querySelector('.sets-container');

function ReturnAsString(text){
    return text;
}

const setNameArray = [
    "Leccion 1",
    "Clase 1",
];

//objeto
let objSets = {
    // "Leccion 1": [
    //     {"けむり（煙）"	:"humo",
    //      "knowledge" : ""},
    //     {"まっしろ（真っ白）「な」":"totalmente blanco"},
    //     {"なかみ（中身）":	"contenido"},
    // ],
    // "Leccion 2": [
    //     {"じょうほう（情報）" :	"informacion"},
    //     {"ぶんぽう（文法）"	: "gramatica"},
    //     {"はつおん（発音）"	: "pronunciacion"},
    // ],
};

for (const lecture of setNameArray) {
    objSets[lecture] = [];
}

const fetchExternalData = () => {
    return Promise.all([
      fetch("./files/Leccion 1.txt"),
      fetch("./files/clase 1 primer semestre 2023.txt"),
    ])
    .then(results => {
      return Promise.all(results.map(result => result.text()));
    });
};

fetchExternalData()
.then(result => {
    CheckForTabsAndSpaces(result);
})
.then(() => CreateHomepageApp(setContainer))

//File Reader Section

// console.log("after setting the first key/pair");
// console.log(JSON.stringify(objSets));

// fetch(`files/${lecture}.txt`)
//   .then(response =>  response.text())
//   .then(text => CheckForTabsAndSpaces(text))
//   .then(() => CreateHomepageApp(setContainer))

//   console.log(JSON.stringify(objSets));

/**
 *  Llamado sobre el archivo de texto
 *  avanza por el texto separandolo en par de prompt y answer.
 * */  
function CheckForTabsAndSpaces(texts){
    let tempKey = "";
    let tempValue = "";
    let start = 0;

    for (let index = 0; index < texts.length; index++) {
        let tempKey = "";
        let tempValue = "";
        let start = 0;
        for (let j = 0; j < texts[index].length; j++) {
            if (texts[index].substr(j, 1) === '\t') {
                tempKey = texts[index].substr(start, j - start)
                start = j;
            }
            if (texts[index].substr(j, 1) === '\n') {
                tempValue = texts[index].substr(start+1, j - start - 2);//el 2 es necesario para remover '/r/n' del texto
                let tempObj = {[tempKey] : tempValue};
                let tempArray = objSets[setNameArray[index]];//IMPORTANT copias de arrays y objs apuntan a la misma memoria.
                tempArray.push(tempObj);//IMPORTANT esto modifica el array dentro de objSets   
                start = j+1;
            }
        }
    }

    // for (let j = 0; j < text.length; j++) {
    //     if (text.substr(j, 1) === '\t') {
    //         // len = j;
    //         //guardar un string temporal para el key
    //         tempKey = text.substr(start, j - start)
    //         //console.log((text.substr(start, j - start)));
    //         start = j;
    //     }
    //     if (text.substr(j, 1) === '\n') {
    //         //aqui debo crear un objeto con lo que llevo guardado
    //         //guardar un string temporal para el value
    //         //push un objeto al array con key de lecture en objsets
    //         tempValue = text.substr(start+1, j - start);
    //         let tempObj = {[tempKey] : tempValue};
    //         let tempArray = objSets[lecture];//IMPORTANT copias de arrays y objs apuntan a la misma memoria.
    //         tempArray.push(tempObj);//IMPORTANT esto modifica el array dentro de objSets

    //         // console.log((text.substr(start+1, j - start)));
    //         start = j+1;
    //     }
    // }

    // console.log(JSON.stringify(objSets));
}
//FIN seccion filereader

const varToString = varObj => Object.keys(varObj)[0];//variable name helper

//aqui probare el localStorage
let currentStorageObj;

//creacion de objeto de prueba
let leccion1Storage = {
    "けむり（煙）" : 'learned',
    "まっしろ（真っ白）「な」" : 'learning',
    "なかみ（中身）" : '',
    // "lastCheckout" : '3/1/2023',
};

let leccion2Storage = {
    "けむり（煙）" : 'learned',
    "まっしろ（真っ白）「な」" : 'learning',
    "なかみ（中身）" : '',
};

//esto limpia todo el local storage
// localStorage.clear();

// para poder agregar un item a local storage debo convertirlo a string
// localStorage.setItem('name', 'josue');
// let objString = JSON.stringify(leccion1Storage);
// localStorage.setItem('Leccion 1', objString);

// let objString2 = JSON.stringify(leccion2Storage);
// localStorage.setItem('Leccion 2', objString2);
// console.log("local storage saved");

// console.log("local storage");
// for (let i = 0; i < localStorage.length; i++)   {
//     console.log(localStorage.key(i) + "=" + localStorage.getItem(localStorage.key(i)));
// }

//aqui checkeo si el objeto localstorage.leccion1 existe
// currentStorageObj = JSON.parse(localStorage.leccion1);
// if(currentStorageObj !== null){
//     const varName = varToString({currentStorageObj});
//     console.log(`el valor guardado en ${varName} es: `);
//     console.log(currentStorageObj);
// }else{
//     console.log('no se encontro la variable en localStorage');
// }

//FIN seccion local storage

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

    // let key = "";
    // let value = [];
    //FIX crear un boton por cada key en objSets
        let index = 0;

    for(let [key, value] of Object.entries(objSets)){
        // console.log("tho");
        console.log(key);
        //console.log(value);

        let button = document.createElement('button');
        button.classList.add('set-button','row');
        // button.classList.add()
        button.setAttribute('name', key);
        button.addEventListener('click', () => OnFlashSetButton(button.name));
        container.appendChild(button);

        //numbers container
        const numberContainer = CreateElement('div', button);
        numberContainer.classList.add('set-buttons-helper', 'number-terms', 'col-12', 'col-sm-4');

        //number of cards div
        const numberDiv = CreateElement('div', numberContainer);
        numberDiv.classList.add('align-self-center');
        const total = objSets[setNameArray[index++]].length;
        console.log(total);
        numberDiv.textContent = total + ' Terminos';

        //percent learned div
        const percentDiv = CreateElement('div', numberContainer);
        const learnedAmountStringObj = localStorage.getItem(key);
        const currentLocalObj = JSON.parse(learnedAmountStringObj); 
        console.log("current local storage object");
        console.log(learnedAmountStringObj);
        let percent = 0;
        
        if(learnedAmountStringObj !== null){           
            let amount = 0;
            for(let [key, value] of Object.entries(currentLocalObj)){
                if(value ==="learned") amount++;
            }

            percent = Math.trunc((amount / total) * 100);
        }else{
            percent = "0"
        }
    
        percentDiv.textContent = `(${percent}% Learned.)`;      
        
        //lecture name div
        let textDiv = document.createElement('div');
        textDiv.textContent = key;
        textDiv.classList.add('button-title', 'col-12', 'col-sm-4');
        button.appendChild(textDiv);

        //last visit div
        const lastVisitDiv = CreateElement('div', button);
        lastVisitDiv.classList.add('set-buttons-helper', 'last-visit', 'col-12', 'col-sm-4', 'text-center', 'text-sm-end');

        if(learnedAmountStringObj !== null){
            if(currentLocalObj.hasOwnProperty("lastCheckout")){
                console.log("existe last check");
                let last = currentLocalObj.lastCheckout;
                lastVisitDiv.textContent = `Last Checkout: ${last}`;
            }else{
                lastVisitDiv.textContent = `No checkout.`;
            }
        }else{   
            lastVisitDiv.textContent = `No checkout.`;
        }
    }    
}

function OnFlashSetButton(name){
    state.currentPage = "lectureList";
    state.lastLecture = name;
    PushHistoryState(state);
    // window.history.pushState(state, null, "");
    console.log("pushed state");

    FlashSetButton(name);
}

function FlashSetButton(name)
{
    // let stringKey = event.currentTarget.name; 
    let stringKey = name; 
    //aqui crear pagina con informacion de set
    console.log('clicked boton');
    app.innerHTML = '';

    let lectureTitle = document.createElement('h1');
    lectureTitle.classList.add('my-3');
    lectureTitle.textContent = stringKey;
    app.appendChild(lectureTitle);
    
    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-div','xwidth','xwidth-md');
    app.appendChild(buttonsContainer);

    let learnButton = document.createElement('button');
    learnButton.classList.add('learn-button');
    learnButton.textContent = 'Learn';
    learnButton.setAttribute('data-lecture', stringKey);
    learnButton.addEventListener('click', OnLearnLecture);
    buttonsContainer.appendChild(learnButton);

    //FIX aqui agregar boton de checkout
    let checkoutButton = CreateElement('button', buttonsContainer);
    checkoutButton.classList.add('checkout-button');
    checkoutButton.textContent = "Checkout";
    checkoutButton.setAttribute('data-lecture', stringKey);
    checkoutButton.addEventListener('click', CheckoutLecture);

    let container = document.createElement('div');
    container.classList.add('set-container','xwidth','xwidth-md');
    app.appendChild(container);

    let cardArray = Object.values(objSets[stringKey]);

    //create each card
    cardArray.forEach(pair => {
        let [key, value] = Object.entries(pair)[0];
        CreatePairCard(key, value, container);
    });
}

function OnLearnLecture(event){
    state.currentPage = "lectureFlash";
    state.lastLecture = event.target.dataset.lecture;
    PushHistoryState(state);
    //window.history.pushState(state, null, "");
    console.log("pushed state");

    LearnLecture(event);
}

function LearnLecture(event)
{  
    console.log('click learn lecture');

    termIndex = 0;

    let lectureKey = event.target.dataset.lecture;
    app.innerHTML = '';

    let titleDiv = CreateElement('div', app);
    titleDiv.classList.add('title-div');

    let title = CreateElement('h1', titleDiv);
    title.textContent = lectureKey;

    let progressBar = CreateElement('div', app);
    progressBar.classList.add('progress-bar-josue');

    PopulateProgressBar(progressBar,lectureKey);

    let middleDiv = CreateElement('div', app);
    middleDiv.classList.add('middle-div');

    let leftArrow = CreateElement('i', middleDiv);
    leftArrow.classList.add('fa-solid', 'fa-angle-left', 'fa-xl', 'arrow-btn');
    leftArrow.setAttribute('data-direction', 'left');
    leftArrow.addEventListener('click', ClickArrow);

    let bigCardDiv = CreateElement('div', middleDiv);
    let bigCard = CreateElement('div', bigCardDiv);
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

    bigCardDiv.classList.add('big-card-div', 'm-2');
    bigCard.classList.add('big-card');
    firstLabel.classList.add('label', 'txt-left');
    secondLabel.classList.add('label', 'txt-right');
    prompt.classList.add('prompt', 'flex-grow-1');
    separator.classList.add('separator');
    answerDiv.classList.add('answer-div', 'flex-grow-1');
    answerDiv.addEventListener('click', ClickAnswer);
    answerPlaceholder.classList.add('answer-placeholder', 'align-self-center');
    answerPlaceholder.setAttribute('id', 'answer-placeholder');
    answerText.classList.add('answer', 'align-self-center', 'hide');
    answerText.setAttribute('id', 'answer-text');

    firstLabel.textContent = "Term";
    secondLabel.textContent = "Answer";

    //FIX
    //aqui tengo que buscar la 'carta' correspondiente, por ahora
    //poner la primera nomas
    let termObject = Object.values(objSets[lectureKey])[0];
    let termsLenght = Object.values(objSets[lectureKey]).length;
    let [key, value] = Object.entries(termObject)[0];
    promptText.textContent = key;
    promptText.classList.add('align-self-center');
    promptText.setAttribute('id', 'prompt-text');
    answerPlaceholder.textContent = "Click to reveal";
    answerText.textContent = value;

    //temp counter section
    let counterDiv = CreateElement('div', app);
    counterDiv.classList.add('counter');
    counterDiv.textContent = `1/${termsLenght}`;

    //Knowledge buttons section
    let knowledgeDiv = CreateElement('div', app);
    let noKnowledgeButton = CreateElement('button', knowledgeDiv);
    let knowledgeButton = CreateElement('button', knowledgeDiv);

    knowledgeDiv.classList.add('knowledge-div');
    noKnowledgeButton.classList.add('learning');
    knowledgeButton.classList.add('learned');

    noKnowledgeButton.textContent = 'Learning';
    knowledgeButton.textContent = 'Learned';

    //cuando termino de crear la pagina learn 
    //checkeo por primera vez si hay algo en local storage
    CheckLearnStatus();

    noKnowledgeButton.addEventListener('click', ClickKnowledgeButton);
    knowledgeButton.addEventListener('click', ClickKnowledgeButton);
}

/**
 * Es llamado cuando creo la pantalla de learn
 */
function PopulateProgressBar(parent, key){
    let termsArray = Object.values(objSets[key]);
    let length = objSets[key].length;
    console.log('length of lecture: ' + length);
    // console.log(termsArray);

    let learnedAmountStringObj = localStorage.getItem(key);
    let currentLocalObj = JSON.parse(learnedAmountStringObj); 
    console.log("current local storage object");
    console.log(learnedAmountStringObj);

    if(learnedAmountStringObj == null){
        learnedAmountStringObj = CreateLocalStorageObject(key);
        currentLocalObj = JSON.parse(learnedAmountStringObj); 
    }
           
    for(let [key, value] of Object.entries(currentLocalObj)){
        switch (value){
            case "learned":
                let progressBarItemLearned = CreateElement('div', parent);
                progressBarItemLearned.classList.add('learned-progress');  
                break;
            case "learning":
                let progressBarItemLearning = CreateElement('div', parent);
                progressBarItemLearning.classList.add('learning-progress');  
                break;
            case "":
                let progressBarItemNone = CreateElement('div', parent);
                progressBarItemNone.classList.add('progress-bar-item');  
                break;
            default:
                console.log('no encontre un termino en el local obj'); 
                break;
        }
    }
    

    let firstProgressItem = document.querySelector('.progress-bar-josue').childNodes[0];
    console.log('added current class on populate');
    firstProgressItem.classList.add('progress-item-current');


    // for (let index = 0; index < length; index++) {
    //     let progressBarItem = CreateElement('div', parent);

    //     //FIX clase depende en estado 
    //     progressBarItem.classList.add('progress-bar-item');    
    // }
}

function CheckoutLecture(event){
    console.log("click checkout");
    let lectureKey = event.target.dataset.lecture;
    const date = new Date().toLocaleDateString();

    let lectureObjString = localStorage.getItem(lectureKey);
    if(lectureObjString !== null){
        console.log(lectureObjString);
        let lectureObject = JSON.parse(lectureObjString);
        console.log(lectureObject);
        lectureObject.lastCheckout = date;
        lectureObjString = JSON.stringify(lectureObject);
        localStorage.setItem(lectureKey, lectureObjString);
    }else{
        //crear el objeto desde 0 y luego agregar fecha
        CreateLocalStorageObject(lectureKey);
        let lectureObjString = localStorage.getItem(lectureKey);
        console.log(lectureObjString);
        let lectureObject = JSON.parse(lectureObjString);
        console.log(lectureObject);
        lectureObject.lastCheckout = date;
        lectureObjString = JSON.stringify(lectureObject);
        localStorage.setItem(lectureKey, lectureObjString);
    }
    
}

function CheckLearnStatus(){
    let currentString;
    let currentObject;
    let currentLecture = document.querySelector('.title-div').firstChild.textContent;

    //reviso todo el localstorage hasta encontrar 
    //un item con el key igual a la leccion actual
      
        if(localStorage[currentLecture]){
            console.log("found");
            currentString = localStorage.getItem(currentLecture);
            currentObject = JSON.parse(currentString);

            let prompt = document.querySelector('.prompt').firstChild;
            console.log(prompt.textContent);

            for(let [key, value] of Object.entries(currentObject)){
                if(key === prompt.textContent){
                    console.log("found key," + "its value is :" + value);
                    switch (value) {
                        case "learned": console.log("aqui cambio el boton learned");
                            ChangeKnowledgeButtonString("learned");
                            break;
                        case "learning": console.log("aqui cambio el boton learning");
                            ChangeKnowledgeButtonString("learning");    
                            break;
                        case "": console.log("aqui hago nada");
                            break;
                        default: console.log("el valor es: " + value);
                            break;
                    }
                }
            }
        }else
        {
            console.log("No se encontro la leccion en Local Storage");


            CreateLocalStorageObject(currentLecture);
            // //crear objeto
            // let storageObject = {};
            // let currentArray = objSets[currentLecture];

            // //popular objecto
            // for (let index = 0; index < currentArray.length; index++) {
            //     const obj = currentArray[index];  
            //     const firstKey = Object.keys(obj)[0];
                
            //     storageObject[firstKey]  = '';             
            // }

            // let objectString = JSON.stringify(storageObject);
            // localStorage.setItem(currentLecture, objectString);
        }  
}

function CreateLocalStorageObject(currentLecture){
    //crear objeto
    let storageObject = {};
    let currentArray = objSets[currentLecture];

    //popular objecto
    for (let index = 0; index < currentArray.length; index++) {
        const obj = currentArray[index];  
        const firstKey = Object.keys(obj)[0];
        
        storageObject[firstKey]  = '';             
    }

    let objectString = JSON.stringify(storageObject);
    localStorage.setItem(currentLecture, objectString);

    return localStorage.getItem(currentLecture);
}

function ChangeKnowledgeButtonString(btnclass){
    let leftButton = document.querySelector('.learning');
    let rightButton = document.querySelector('.learned');

    leftButton.removeAttribute('id');
    rightButton.removeAttribute('id');

    let buttonToChange = document.querySelector(`.${btnclass}`);
    buttonToChange.setAttribute('id','checked');    
}

function ChangeKnowledgeButtonElem(element){
    let leftButton = document.querySelector('.learning');
    let rightButton = document.querySelector('.learned');

    leftButton.removeAttribute('id');
    rightButton.removeAttribute('id');

    element.setAttribute('id','checked');

    //aqui actualizar storage
    UpdateLocalStorage(element);
}

/**
 * Es llamado cuando apreto un boton de knowledge
 */
function UpdateLocalStorage(btnClicked){
    console.log("boton clikeado " + btnClicked.className);

    //aqui actualizar local storage
    let currentLecture = document.querySelector('.title-div').firstChild.textContent;

    let counter = 0;

    if(localStorage[currentLecture]){
        //aqui se encontro el objeto en local storage basado en la leccion actual
        console.log("al hacer click en el boton se encontro un objeto en local storage");
        let currentString = localStorage.getItem(currentLecture);
        let currentObject = JSON.parse(currentString);  

        let prompt = document.querySelector('.prompt').firstChild;   
        
        //aqui buscar por el objeto por el key basado en el prompt
        for(let [key, value] of Object.entries(currentObject)){
            
            if(key === prompt.textContent){
                console.log("se encontro el prompt en la lista con el valor de: " + value);
                
                //cambio el valor del key actual basado en la clase del boton
                currentObject[key] = btnClicked.className;
                
                //reemplazo el objeto en localstorage con el objeto actualizado
                localStorage.setItem(currentLecture, JSON.stringify(currentObject));
                console.log("se cambio el valor a: " + btnClicked.className);
                break;
            }

            counter++;
        }

        
    }else{
        //esto nunca deberia pasar
        console.log("No se encontro la leccion en Local Storage al momento de actualizar y deberia crear uno");
    }

    //una vez actualizado el local storage deberia rehacer o actualizar la barra de progreso
    console.log("veces que busque un key en local storage:" + counter);
    UpdateProgressBar(counter, btnClicked.className);

}

/**
 * Se llama cuando termino de actualizar el local storage object
 */
function UpdateProgressBar(counter, classToAdd){
    let progressBar = document.querySelector('.progress-bar-josue');
    let progressItem = progressBar.childNodes[counter];

    progressItem.classList.remove('learning-progress');
    progressItem.classList.remove('learned-progress');

    // progressItem.setAttribute('class', '');

    switch(classToAdd){
        case "learning":
            progressItem.classList.add("learning-progress");
            break;
        case "learned":
            progressItem.classList.add("learned-progress");
            break;
        default:
            console.log("hubo un error");
            break;
    }
}

//necesito sacarle a los dos las clases y desactivarlos
function ClickKnowledgeButton(event){
    //buscar ambos botones y sacarle el checked
    ChangeKnowledgeButtonElem(event.target);

    DisableKnowledgeButtons();
    
    nextTermTimeoutId = setTimeout(() => ShowNextTerm(1), 1000); 
    console.log('called shownextterm with timeout');  
}

function DisableKnowledgeButtons(){
    let leftButton = document.querySelector('.learning');
    let rightButton = document.querySelector('.learned');

    leftButton.setAttribute('disabled' , 'disabled');
    rightButton.setAttribute('disabled', 'disabled');

    setTimeout(function(){
        leftButton.removeAttribute('disabled');
        rightButton.removeAttribute('disabled');
    }, 500);
}

function ShowNextTerm(dir){
    console.log('changing term');

    let bigCard = document.querySelector('.big-card');
    const className = dir === -1 ? "disappear-right" : "disappear-left";
    bigCard.classList.add(className);
    //bigCard.classList.add('disappear-right'); //activar despues
    setTimeout(() => DeleteElement(bigCard), 300);
    
    //necesito buscar el siguiente termino y popular la tarjeta
    let currentLecture = document.querySelector('.title-div').firstChild.textContent;
    let termsArray = Object.values(objSets[currentLecture]);

    let progressItem = document.querySelector('.progress-bar-josue').childNodes[termIndex];
    progressItem.classList.toggle('progress-item-current');

    // removeSelectedProgressItem(termIndex);
    // console.log('called remove selected item');

    if(termIndex + dir == termsArray.length){
        termIndex = 0;
    }else if(termIndex + dir < 0){
         termIndex = termsArray.length - 1;
    }else{
        termIndex += dir;
    }

    let termObj = termsArray[termIndex];
    console.log('este es el numero index: ' + termIndex);

    updateSelectedProgressItem(termIndex);

    console.log('este es el obj par prompt/meaning');
    console.log(termObj);

    let [key, value] = Object.entries(termObj)[0];

    //FIX aqui buscar el termino actual y basado en 'knowledge'
    //modificar las clases de los botones de abajo
    let knowledge = Object.values(termObj)[1];
    //console.log(knowledge);

    //creacion de nueva carta
    let bigCardDiv = document.querySelector('.big-card-div');

    //parentElement.insertBefore(newElement, parentElement.children[2]);

    let newCard = document.createElement('div');
    bigCardDiv.insertBefore(newCard, bigCardDiv.children[0]);
    
    let firstLabel = CreateElement('p', newCard);
    let prompt = CreateElement('div', newCard);
    let promptText= CreateElement('p', prompt);
    let separator = CreateElement('div', newCard);
    let answerDiv = CreateElement('div', newCard);
    let answerPlaceholder = CreateElement('p', answerDiv);
    let answerText = CreateElement('p', answerDiv);
    let secondLabel = CreateElement('p', newCard);

    newCard.classList.add('big-card');
    firstLabel.classList.add('label', 'txt-left');
    secondLabel.classList.add('label', 'txt-right');
    prompt.classList.add('prompt', 'flex-grow-1');
    separator.classList.add('separator');
    answerDiv.classList.add('answer-div', 'flex-grow-1');
    answerDiv.addEventListener('click', ClickAnswer);
    answerPlaceholder.classList.add('answer-placeholder', 'align-self-center');
    answerPlaceholder.setAttribute('id', 'answer-placeholder');
    answerText.classList.add('answer', 'align-self-center', 'hide');
    answerText.setAttribute('id', 'answer-text');

    firstLabel.textContent = "Term";
    secondLabel.textContent = "Answer";
    answerPlaceholder.textContent = "Click to reveal";

    //FIX //popular datos
    // prompt = document.querySelector('.prompt').firstChild;
    promptText.textContent = key;
    promptText.classList.add('align-self-center');
    promptText.setAttribute('id', 'prompt-text');

    let placeholder = document.querySelector('.answer-placeholder');
    placeholder.classList.remove('hide');

    let answer = document.querySelector('.answer');
    answer.classList.add('hide');
    answer.textContent = value;

    //reset botones
    //buscar informacion guardada sobre boton
    document.querySelector('.learning').setAttribute('id','');
    document.querySelector('.learned').setAttribute('id','');

    //temp actualizar counter
    UpdateCounter(termsArray.length);

    //cada vez que cambio de card revisar si existe algo en local storage
    CheckLearnStatus();
}

// function removeSelectedProgressItem(index){
//     console.log('called remove');
//     let progressItem = document.querySelector('.progress-bar-josue').childNodes[index];
//     progressItem.classList.remove('progress-item-current');
// }

function updateSelectedProgressItem(index){
    let progressItem = document.querySelector('.progress-bar-josue').childNodes[index];
    progressItem.classList.add('progress-item-current');
}

function UpdateCounter(total){
    let counter = document.querySelector('.counter');
    counter.textContent = `${termIndex+1}/${total}`;
}

function DeleteElement(element){
    element.remove();
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
    clearTimeout(nextTermTimeoutId);

    let direction = event.target.dataset.direction;
    // console.log(event.target.dataset.direction);

    if(direction === 'left'){
        ShowNextTerm(-1);
    }else{
        ShowNextTerm(1);
    }
}

/**
 * Creates an element and parents it
 * @param {String} elem
 * @param {Element} parent
 */
function CreateElement(elem, parent){
    let element =document.createElement(`${elem}`);
    parent.appendChild(element);
    return element;
}

function CreatePairCard(key, value, parent){
    //create container div
    let container = document.createElement('div');
    container.classList.add('pair-card-container', 'row-12');
    parent.appendChild(container);

    //create key div
    let keyDiv = document.createElement('div');
    keyDiv.textContent = key;
    keyDiv.classList.add('keyDiv', 'align-self-center', 'col-md-6');
    container.appendChild(keyDiv);

    //create value div
    let valueDiv = document.createElement('div');
    valueDiv.textContent = value;
    valueDiv.classList.add('valueDiv', 'text-end', 'col-md-6');
    container.appendChild(valueDiv);

    //FIX aqui devolver la estrella y hacerla funcionar
    //create misc div
    // <i class="fa-regular fa-star"></i>
    // let miscDiv = document.createElement('div');
    // let star = document.createElement('i');
    // star.classList.add('fa-regular', 'fa-star');
    // miscDiv.appendChild(star);
    // container.appendChild(miscDiv);
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
            UpdateFoundText(`La busqueda por Tag no esta implementada.`);
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
        textButton = list[i].childNodes[1].textContent;

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
    for(const [key, value] of Object.entries(objSets)){
        console.log("leyendo una leccion");
        for (const term of value) {
            
            const [innerKey, innerValue] = Object.entries(term)[0];
            console.log(innerValue);
            if(innerKey.toLowerCase() === filter || innerValue.toLowerCase() === filter){
                
                sets.push(key);
                console.log(`found ${filter} in ${key} inside "objSets"`);
                break;
            }
        }       
    }

    console.log("despues del found el return no me deja pasar aca ?");

    //aqui modificar la lista si sets tiene algo
    if(sets.length > 0){
        console.log("encontre algo y modificare la lista");
        UpdateFoundText(`${sets.length} found.`);
        let list = document.getElementsByClassName('set-button');
        for (let i = 0; i < list.length; i++) {
            textButton = list[i].childNodes[1].textContent;
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

//print all local storage
// console.log("local storage");
// for (let i = 0; i < localStorage.length; i++)   {
//     console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
// }

