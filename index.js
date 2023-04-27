//jshint esversion:9

"use strict";

import { lectures } from "./lectures.js";
// import {ReplaceState, PushHistoryState} from "./history.js";

const titleButton = document.getElementById('title-btn');
titleButton.addEventListener('click', () => ReloadPage());

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
    lastLecture: {},
    lastAmmount: 0,
    lastPercentage: 0,
};

window.history.replaceState(state, null, "");

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
            FlashSetButton(state.lastLecture, state.lastAmmount);
            break;
        case "lectureFlash":
            console.log("lecture Flash");
            break;
        default:
            break;
    }
}
//Fin Seccion History

var termIndex = 0;
var termId = 0;

//guarda referencia al timeout cuando hago click en un boton de knowledge
var nextTermTimeoutId;

const app = document.getElementById('app');
const setContainer = document.querySelector('.sets-container');

//FIX REMOVE
const setNameArray = [
    "Leccion 1 Minna",
    "Clase 1",
    "Clase 1 Extra",
    "Clase 1 Kanji",
    "Clase 1 Kanji Extra",
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

//FIX REMOVE
const fetchExternalData = () => {
    return Promise.all([
    //   fetch("./files/Leccion 1.txt"),
    fetch("./files/Leccion 1 Minna.txt"),
    fetch("./files/clase 1 primer semestre 2023.txt"),
    fetch("./files/Clase 1 Extra.txt"),
    fetch("./files/clase 1 primer semestre 2023 kanji.txt"),
    fetch("./files/Clase 1 Kanji Extra.txt"),
    //   fetch("./files/prueba.txt"),
    ])
    .then(results => {
      return Promise.all(results.map(result => result.text()));
    });
};

// fetchExternalData()
// .then(result => {
//     CheckForTabsAndSpaces(result);
// })
// .then(() => CreateHomepageApp(setContainer))

//File Reader Section

/**
 *  Llamado sobre el archivo de texto
 *  avanza por el texto separandolo en par de prompt y answer.
 * */  
function CheckForTabsAndSpaces(texts){
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
}
//FIN seccion filereader

//aqui probare el localStorage
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

CreateHomepageApp(setContainer );

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
    foundDiv.appendChild(foundText);
    app.appendChild(foundDiv);
    //Fin Seccion Busqueda

    lectures.forEach(lecture => {
      //creo button div
      let button = document.createElement("button");
      button.classList.add("set-button", "row");
      button.setAttribute("name", lecture.name);
      container.appendChild(button);

      //numbers container
      const numberContainer = CreateElement("div", button);
      numberContainer.classList.add(
        "set-buttons-helper",
        "number-terms",
        "col-12",
        "col-sm-4"
      );

      //number of cards div
      const numberDiv = CreateElement("div", numberContainer);
      numberDiv.classList.add("align-self-center");
      const total = lecture.termList.length;
      numberDiv.textContent = total + " Terminos";

      //percent learned div
      let percent = 0;

      //veo si existe un local storage con la leccion actual
      const percentDiv = CreateElement("div", numberContainer);
      const learnedAmountStringObj = localStorage.getItem(lecture.id);
      let currentLocalObj = {};

      //si no existe simplemente pongo 0
      //si existe
      if (learnedAmountStringObj == null) {
        console.log("no se encontro local storage para esta id: " + lecture.id);
        percent = "0";
      } else {
        currentLocalObj = JSON.parse(learnedAmountStringObj);
        console.log("current local storage object for this lecture");
        console.log(learnedAmountStringObj);

        let amount = 0;
        for (let [key, value] of Object.entries(currentLocalObj)) {
          if (value === "learned") amount++;
        }

        percent = Math.trunc((amount / total) * 100);
      }

      percentDiv.textContent = `(${percent}% Learned.)`;
      //Fin percent learned div

      //lecture name div
      let textDiv = document.createElement("div");
      textDiv.textContent = lecture.name;
      textDiv.classList.add("button-title", "col-12", "col-sm-4");
      button.appendChild(textDiv);

      //last visit div
      const lastVisitDiv = CreateElement("div", button);
      lastVisitDiv.classList.add(
        "set-buttons-helper",
        "last-visit",
        "col-12",
        "col-sm-4",
        "text-center",
        "text-sm-end"
      );

      if (learnedAmountStringObj !== null) 
      {
        if (currentLocalObj.hasOwnProperty("lastCheckout")) {
          let last = currentLocalObj.lastCheckout;
          lastVisitDiv.textContent = `Last Checkout: ${last}`;
        } else {
          lastVisitDiv.textContent = `No checkout.`;
        }
      } else {
        lastVisitDiv.textContent = `No checkout.`;
      }

      //Dejo el event listener al final porque necesito los valores
      button.addEventListener("click", () =>
        OnFlashSetButton(lecture, total)
      );
    });  
}

/** Revisa si hubo cambios en los archivos de texto de las lecciones */
function CheckUpdates(lectureKey, currentLocalObj){
    console.log("checking for updates on lecture texts");

    //nuevo objeto que representa el local storage
    let newObject = {};

    //aqui aga
    let lectureArray = objSets[lectureKey];
    for (const object of lectureArray) {//por cada objecto dentro del array
        for (const key in object) {//por cada key de cada objeto
            if(currentLocalObj.hasOwnProperty(key)){
                console.log("contiene ya este key");
                newObject[key] = currentLocalObj[key];
            }else{
                console.log("no contenia este key");
                newObject[key] = "";
            }
        }     
    }

    let lastkey = "lastCheckout";

    if(currentLocalObj.hasOwnProperty(lastkey)){
        console.log("existe last checkout, agregandolo al final del nuevo objeto");      
        newObject[lastkey] = currentLocalObj[lastkey];
        // console.log(JSON.stringify(newObject));
    }

    console.log("updated localstorage acording to text file");
    localStorage.setItem(lectureKey, JSON.stringify(newObject));

    return newObject;
}

function OnFlashSetButton(lectureObj, ammount){
    //console.log("percent cuando lo recibe la funcion que creala pagina: " + percentage);
    state.currentPage = "lectureList";
    state.lastLecture = lectureObj;
    state.lastAmmount = ammount;
    // PushHistoryState(state);
    window.history.pushState(state, null, "");
    console.log("pushed state");

    FlashSetButton(lectureObj, ammount);
}

/** Crea la pagina con los terminos de esa clase y los botones para estudiar/checkout */
function FlashSetButton(lectureObj, ammount)
{
    //cancelo show next term, si llego a volver a la pagina anterior
    clearTimeout(nextTermTimeoutId);
   
    // let stringKey = event.currentTarget.name; 
    let stringKey = lectureObj.name; 
    //aqui crear pagina con informacion de set
    app.innerHTML = '';

    //Creacion titulo
    let lectureTitle = document.createElement('h1');
    lectureTitle.classList.add('my-3');
    lectureTitle.textContent = stringKey;
    app.appendChild(lectureTitle);

    //Creacion info
    let termsAmmountDiv = CreateElement('section', app);
    let ammountText = CreateElement('p', termsAmmountDiv);
    let percentageText = CreateElement('p', termsAmmountDiv);

    ammountText.textContent = ammount + " Terms /";
    let percentage = CalculatePercentageLearned(lectureObj.id);
    percentageText.textContent = percentage + "% Learned";

    termsAmmountDiv.classList.add('d-flex', 'justify-content-center', 'terms-ammount-div');
    
    //Creacion Seccion botones
    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-div','xwidth','xwidth-md', 'text-center', 'text-md-start');
    app.appendChild(buttonsContainer);

    let learnButton = CreateElement('button', buttonsContainer);
    learnButton.classList.add('learn-button');
    learnButton.textContent = 'Learn';
    learnButton.setAttribute('data-id', lectureObj.id);
    learnButton.addEventListener('click', () => OnLearnLecture(lectureObj));

    let checkoutButton = CreateElement('button', buttonsContainer);
    checkoutButton.classList.add('checkout-button');
    checkoutButton.textContent = "Checkout";
    checkoutButton.setAttribute('data-id', lectureObj.id);
    checkoutButton.addEventListener('click', (event) => CheckoutLecture(event, lectureObj));

    //Creacion text last checkout en pagina de terminos
    let lastCheckoutTextDiv = CreateElement('div', buttonsContainer);
    let lastCheckoutText = CreateElement('span', lastCheckoutTextDiv);
    lastCheckoutText.setAttribute('id', 'last-check-text-term-page');
    let localStorageObject = GetLocalStorageObject(lectureObj);
    lastCheckoutText.textContent = "Last Checkout: " + localStorageObject['lastCheckout'];  
    lastCheckoutTextDiv.classList.add('float-md-end');

    //Creacion seccion terminos
    let container = document.createElement('div');
    container.classList.add('set-container','xwidth','xwidth-md');
    app.appendChild(container);

    let cardArray = Object.values(lectureObj.termList);
    // let cardArray2 = Object.values(objSets[stringKey]);

    //create each card
    cardArray.forEach(term => {
        console.log(term);
        CreatePairCard(term, container);
    });
}

//FIX cambiar nombre a create ? y return el que existe si no crear uno
/**Return el objeto de local storage, si no existe lo crea, incluyendo la key 'lastCheckout*/
function GetLocalStorageObject(lectureObj){
    //FIX aqui deberia aprovechar de crearlo
    const learnedAmountString = localStorage.getItem(lectureObj.id);
    
    if(learnedAmountString == null ){
        let lectureObjString = CreateLocalStorageObject(lectureObj);
        let lectureObject = JSON.parse(lectureObjString);
        lectureObject.lastCheckout = "No Checkout";
        lectureObjString = JSON.stringify(lectureObject);
        localStorage.setItem(lectureObj.id, lectureObjString);
    }

    const localStorageString = localStorage.getItem(lectureObj.id);
    const localStorageObject = JSON.parse(localStorageString);
    return localStorageObject;
}

function isObjEmpty (obj) {
    return Object.keys(obj).length === 0;
}

/**
 * Es llamado cuando armo la pagina de terminos
 * y quiero mostrar el porcentage aprendido
 * @param {string} name nombre de la leccion
 */
function CalculatePercentageLearned(id){
    console.log("aqui estoy calculando el porcentage de learned desde una funcion propia");
    
    //el total de terminos
    let total = 0;
    let tempObj = lectures.find((lecture) => lecture.id == id);
    if(tempObj == null){
        console.log("hubo un error y no encontre el id de la clase en el objeto lectures");
    }else{
        total = tempObj.termList.length;
    }
    
    //trato de obtener el objeto de total basado en la id
    const learnedAmountStringObj = localStorage.getItem(id);

    if(learnedAmountStringObj != null){
        const currentLocalObj = JSON.parse(learnedAmountStringObj);   
           
        let percent = 0;
        let amount = 0;
        for(let [key, value] of Object.entries(currentLocalObj)){
            if(value ==="learned") amount++;
        }

        percent = Math.trunc((amount / total) * 100);

        return percent;
    }else {
        return 0;
    }
}

function OnLearnLecture(lectureObj){
    state.currentPage = "lectureFlash";
    state.lastLecture = lectureObj;
    // PushHistoryState(state);
    window.history.pushState(state, null, "");
    console.log("pushed state");

    LearnLecture(lectureObj);
}

function LearnLecture(lectureObj){  
    console.log('click learn lecture');

    termIndex = 0;

    let lectureKey = lectureObj.id;
    app.innerHTML = '';

    let titleDiv = CreateElement('div', app);
    titleDiv.classList.add('title-div');

    let title = CreateElement('h1', titleDiv);
    title.textContent = lectureObj.name;

    let progressBar = CreateElement('div', app);
    progressBar.classList.add('progress-bar-josue', 'd-flex', 'flex-column', 'flex-lg-row');

    PopulateProgressBar(progressBar, lectureObj);

    let middleDiv = CreateElement('div', app);
    middleDiv.classList.add('middle-div');

    let leftArrow = CreateElement('i', middleDiv);
    leftArrow.classList.add('fa-solid', 'fa-angle-left', 'fa-xl', 'arrow-btn');
    leftArrow.setAttribute('data-direction', 'left');
    leftArrow.addEventListener('click', (event) => ClickArrow(event, lectureObj));

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
    rightArrow.addEventListener('click',(event) => ClickArrow(event, lectureObj));
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
    // let termObject = Object.values(objSets[lectureKey])[0];
    let termsLenght = lectureObj.termList.length;
    // let [key, value] = Object.entries(termObject)[0];
    promptText.textContent = lectureObj.termList[0].jap;
    promptText.classList.add('align-self-center');
    promptText.setAttribute('id', 'prompt-text');
    answerPlaceholder.textContent = "Click to reveal";
    answerText.textContent = lectureObj.termList[0].esp;

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
    CheckLearnStatus(lectureObj, 0);

    noKnowledgeButton.addEventListener('click', (event) => ClickKnowledgeButton(event, lectureObj, "learning"));
    knowledgeButton.addEventListener('click', (event) => ClickKnowledgeButton(event, lectureObj, "learned"));
}

/**
 * Es llamado cuando creo la pantalla de learn
 * Crea los squares de la barra de progreso
 */
function PopulateProgressBar(parent, lectureObj){
    //let termsArray = Object.values(objSets[key]);

    //obtengo referencia al local storage para revisar avanze
    let learnedAmountStringObj = localStorage.getItem(lectureObj.id);
    let currentLocalObj = JSON.parse(learnedAmountStringObj); 

    //Ya no es necesario
    // //Creo un objeto local si no existe
    // if(learnedAmountStringObj == null){
    //     learnedAmountStringObj = CreateLocalStorageObject(key);
    //     currentLocalObj = JSON.parse(learnedAmountStringObj); 
    // }

    //Obtengo una referencia al tamano del local object
    const length = lectureObj.termList.length;
    const half = Math.ceil(length / 2);
    let afterHalf = false;
    let counter = 1;
    // console.log("half " + half);

    //Creo 2 divs que serviran de left col y right col
    let leftDiv = CreateElement('div', parent);
    let rightDiv = CreateElement('div', parent);
    leftDiv.classList.add('d-flex', 'flex-grow-1');
    rightDiv.classList.add('d-flex', 'flex-grow-1');
        

    //Por cada termino en el array termlist(array de objetos con los terminos)
    //crear un cuadrado y con el id de ese termino buscar el valor
    //en el objeto local
    lectureObj.termList.forEach(term => {
        if(counter > half){
            afterHalf = true;
        }

        let boxParent = afterHalf ? rightDiv : leftDiv;

        let knowledgeValue = currentLocalObj[term.id];

        let progressBarItem;

        switch (knowledgeValue){
            case "learned":
                progressBarItem = CreateElement('div', boxParent);
                progressBarItem.classList.add('learned-progress', 'progress-bar-item');  
                break;
            case "learning":
                progressBarItem = CreateElement('div', boxParent);
                progressBarItem.classList.add('learning-progress', 'progress-bar-item');  
                break;
            case "":
                progressBarItem = CreateElement('div', boxParent);
                progressBarItem.classList.add('no-progress', 'progress-bar-item');  
                break;
            default:
                //FIX aqui podria crear una caja vacia 
                console.log('no encontre un termino en el local obj'); 
                console.log("se procede a crear una caja nueva");
                progressBarItem = CreateElement('div', boxParent);
                progressBarItem.classList.add('no-progress', 'progress-bar-item'); 
                break;
        }

        counter++;
    });

    // for(let [key, value] of Object.entries(currentLocalObj)){
    //     if(counter > half){
    //         afterHalf = true;
    //     }

    //     let boxParent = afterHalf ? rightDiv : leftDiv;

    //     switch (value){
    //         case "learned":
    //             let progressBarItemLearned = CreateElement('div', boxParent);
    //             progressBarItemLearned.classList.add('learned-progress', 'progress-bar-item');  
    //             break;
    //         case "learning":
    //             let progressBarItemLearning = CreateElement('div', boxParent);
    //             progressBarItemLearning.classList.add('learning-progress', 'progress-bar-item');  
    //             break;
    //         case "":
    //             let progressBarItemNone = CreateElement('div', boxParent);
    //             progressBarItemNone.classList.add('no-progress', 'progress-bar-item');  
    //             break;
    //         default:
    //             console.log('no encontre un termino en el local obj'); 
    //             break;
    //     }

    //     counter++;
    // }
    
    let allProgressItem = document.getElementsByClassName('progress-bar-item');
    let firstProgressItem = allProgressItem[0];
    // let firstProgressItem = document.querySelector('.progress-bar-josue').childNodes[0];
    console.log('added current class on populate');
    firstProgressItem.classList.add('progress-item-current');
}

/**Se llama cuando hago click en el boton de checkout */
function CheckoutLecture(event, lectureObj){
    console.log("click checkout");
    let lectureId = event.target.dataset.id;
    const date = new Date().toLocaleDateString();

    let lectureObjString = localStorage.getItem(lectureObj.id);
    if(lectureObjString !== null){
        console.log(lectureObjString);
        let lectureObject = JSON.parse(lectureObjString);
        console.log(lectureObject);
        lectureObject.lastCheckout = date;
        lectureObjString = JSON.stringify(lectureObject);
        localStorage.setItem(lectureObj.id, lectureObjString);
    }else{
        //crear el objeto desde 0 y luego agregar fecha
        
        let lectureObjString = CreateLocalStorageObject(lectureObj);
        console.log(lectureObjString);
        let lectureObject = JSON.parse(lectureObjString);
        console.log(lectureObject);
        lectureObject.lastCheckout = date;
        lectureObjString = JSON.stringify(lectureObject);
        localStorage.setItem(lectureObj.id, lectureObjString);
    }
    
    const lastCheckoutText = document.getElementById('last-check-text-term-page');
    lastCheckoutText.textContent = "Last Checkout: " + date;
}

/**Lo llamo cuando creo la pagina de learn por primera vez,
 * tambien cuando cambio de card
 */
function CheckLearnStatus(lectureObj, termIndex){
    let currentString;
    let currentObject;
    let currentLectureId = lectureObj.id;

    currentString = localStorage.getItem(currentLectureId);
    currentObject = JSON.parse(currentString);

    let prompt = document.querySelector('.prompt').firstChild;
    console.log(prompt.textContent);

    //basado en el id del termino actual, buscar el knowledge
    //en el local storage
    switch (currentObject[termIndex]) {
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

function CreateLocalStorageObject(currentLectureObj){
    //crear objeto
    let storageObject = {};
    let currentArray = currentLectureObj.termList;

    //popular objecto
    currentArray.forEach(term => {
        storageObject[term.id]  = ''; 
    });

    let objectString = JSON.stringify(storageObject);
    localStorage.setItem(currentLectureObj.id, objectString);

    return localStorage.getItem(currentLectureObj.id);
}

function ChangeKnowledgeButtonString(btnclass){
    let leftButton = document.querySelector('.learning');
    let rightButton = document.querySelector('.learned');

    leftButton.removeAttribute('id');
    rightButton.removeAttribute('id');

    let buttonToChange = document.querySelector(`.${btnclass}`);
    buttonToChange.setAttribute('id','checked');    
}

function ChangeKnowledgeButtonElem(event, lectureObj, tag, id){
    let leftButton = document.querySelector('.learning');
    let rightButton = document.querySelector('.learned');

    leftButton.removeAttribute('id');
    rightButton.removeAttribute('id');

    event.target.setAttribute('id','checked');

    //aqui actualizar storage
    UpdateLocalStorage(lectureObj, tag, id);
}

function GetTermId(termArray, term){
    console.log("get term id");
    console.log(termArray);
    console.log(term);
    let id = -1;

    for (let index = 0; index < termArray.length; index++) {
        if(termArray[index].jap == term){
            console.log("found the term at index: "+ index);
            id = termArray[index].id;
            break;
        }
    }

    if(id < 0){
        console.log("hubo un error y no se encontro el termino dentro del array");
    }else{
        console.log("id encontrado " + id);
        return id;
    }
}

/**
 * Es llamado cuando apreto un boton de knowledge
 */
function UpdateLocalStorage(lectureObj, tag, id){
    console.log("boton clikeado " + tag);

    //aqui actualizar local storage
    let currentLecture = lectureObj.id;

    let counter = 0;

    //aqui se encontro el objeto en local storage basado en la leccion actual
    console.log("al hacer click en el boton se encontro un objeto en local storage");
    let currentString = localStorage.getItem(currentLecture);
    let currentObject = JSON.parse(currentString); 
    console.log("el objeto que recibo dentro de updatelocal storage: " + currentString); 

    let prompt = document.querySelector('.prompt').firstChild;   
    
    //aqui buscar por el objeto por el key basado en el prompt
    for(let [key, value] of Object.entries(currentObject)){
        
        if(key == id){
            console.log("se encontro el prompt en la lista con el valor de: " + value);
            
            //cambio el valor del key actual basado en la clase del boton
            currentObject[key] = tag;
            
            //reemplazo el objeto en localstorage con el objeto actualizado
            localStorage.setItem(currentLecture, JSON.stringify(currentObject));
            console.log("se cambio el valor a: " + tag);
            break;
        }

        counter++;
    }

    //una vez actualizado el local storage deberia rehacer o actualizar la barra de progreso
    console.log("veces que busque un key en local storage:" + counter);
    UpdateProgressBar(counter, tag);
}

/**
 * Se llama cuando termino de actualizar el local storage object
 */
function UpdateProgressBar(counter, classToAdd){
    let allProgressItem = document.getElementsByClassName('progress-bar-item');
    let progressBar = document.querySelector('.progress-bar-josue');
    // let progressItem = progressBar.childNodes[counter];
    let progressItem =  allProgressItem[counter];

    progressItem.classList.remove('learning-progress');
    progressItem.classList.remove('learned-progress');
    progressItem.classList.remove('no-progress');

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
function ClickKnowledgeButton(event, lectureObj, tag){
    //buscar ambos botones y sacarle el checked
    let promptText = document.getElementById("prompt-text").textContent;
    let currentTermId = GetTermId(lectureObj.termList, promptText)
    ChangeKnowledgeButtonElem(event, lectureObj, tag, currentTermId);

    DisableKnowledgeButtons();
    
    nextTermTimeoutId = setTimeout(() => ShowNextTerm(1, lectureObj), 1000); 
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

function ShowNextTerm(dir, lectureObj){
    console.log('changing term');

    let bigCard = document.querySelector('.big-card');
    const className = dir === -1 ? "disappear-right" : "disappear-left";
    bigCard.classList.add(className);
    //bigCard.classList.add('disappear-right'); //activar despues
    setTimeout(() => DeleteElement(bigCard), 300);
    
    //necesito buscar el siguiente termino y popular la tarjeta
    //let currentLecture = document.querySelector('.title-div').firstChild.textContent;
    let termsArray = lectureObj.termList;

    let allProgressItem = document.getElementsByClassName('progress-bar-item');
    let progressItem = allProgressItem[termIndex];
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

    let japValue = termsArray[termIndex].jap;
    let espValue = termsArray[termIndex].esp;
    let [key, value] = Object.entries(termObj)[0];

    //FIX aqui buscar el termino actual y basado en 'knowledge'
    //modificar las clases de los botones de abajo
    let knowledge = Object.values(termObj)[1];

    //creacion de nueva carta
    let bigCardDiv = document.querySelector('.big-card-div');

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
    promptText.textContent = japValue;
    promptText.classList.add('align-self-center');
    promptText.setAttribute('id', 'prompt-text');

    let placeholder = document.querySelector('.answer-placeholder');
    placeholder.classList.remove('hide');

    let answer = document.querySelector('.answer');
    answer.classList.add('hide');
    answer.textContent = espValue;

    //reset botones
    //buscar informacion guardada sobre boton
    document.querySelector('.learning').setAttribute('id','');
    document.querySelector('.learned').setAttribute('id','');

    //temp actualizar counter
    UpdateCounter(termsArray.length);

    //cada vez que cambio de card revisar si existe algo en local storage
    CheckLearnStatus(lectureObj, termIndex);
}

// function removeSelectedProgressItem(index){
//     console.log('called remove');
//     let progressItem = document.querySelector('.progress-bar-josue').childNodes[index];
//     progressItem.classList.remove('progress-item-current');
// }

function updateSelectedProgressItem(index){
    let allProgressItem = document.getElementsByClassName('progress-bar-item');
    // let progressItem = document.querySelector('.progress-bar-josue').childNodes[index];
    let progressItem = allProgressItem[index];
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

function ClickArrow(event, lectureObj){
    clearTimeout(nextTermTimeoutId);

    let direction = event.target.dataset.direction;

    if(direction === 'left'){
        ShowNextTerm(-1, lectureObj);
    }else{
        ShowNextTerm(1, lectureObj);
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

function CreatePairCard(termObj, parent){
    //create container div
    let container = document.createElement('div');
    container.classList.add('pair-card-container', 'd-flex');
    parent.appendChild(container);

    //FIX
    //create key div
    let keyDiv = document.createElement('div');
    keyDiv.classList.add('keyDiv', 'align-self-center', 'col-6');
    container.appendChild(keyDiv);

    if(termObj.kanji !== ""){
        keyDiv.textContent = termObj.jap + "（" + termObj.kanji+ "）";
    }else{
        keyDiv.textContent = termObj.jap;
    }

    //create value div
    let valueDiv = document.createElement('div');
    valueDiv.textContent = termObj.esp;
    valueDiv.classList.add('valueDiv', 'align-self-center', 'text-end', 'col-6');
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

    /**Array de strings que representan en que lecture esta el contenido*/
    let sets = [];
    let textButtonContent;

    //for each pair in objSets
    for(const [key, value] of Object.entries(objSets)){
        console.log("leyendo una leccion");
        for (const term of value) {
            
            const [innerKey, innerValue] = Object.entries(term)[0];
            // console.log(innerValue);
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

        /**Array de todos los botones de lectures*/
        let list = document.getElementsByClassName('set-button');
        for (let i = 0; i < list.length; i++) {
            /**Nombre de lecture dentro del boton */
            textButtonContent = list[i].childNodes[1].textContent;
            let found = false;

            //reviso si este boton coincide a uno de los botones que deberia dejar
            //si no, lo escondo
            sets.forEach(name => {
                name = name.toLowerCase();
                textButtonContent = textButtonContent.toLowerCase();
               
                if(found){
                    return;   
                }
                if(textButtonContent == name){
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

//Helpers
function ReloadPage(){
    location.reload();
}

function ReturnAsString(text){
    return text;
}

//variable name helper
const varToString = varObj => Object.keys(varObj)[0];


