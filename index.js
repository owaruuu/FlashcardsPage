//jshint esversion:9

"use strict";

import { lectures, options } from "./lectures.js";
// import {ReplaceState, PushHistoryState} from "./history.js";

const titleButton = document.getElementById("title-btn");
titleButton.addEventListener("click", () => ReloadPage());

//Seccion Touch Watch
function watchForHover() {
    // lastTouchTime is used for ignoring emulated mousemove events
    let lastTouchTime = 0;

    function enableHover() {
        if (new Date() - lastTouchTime < 500) return;
        document.body.classList.add("hasHover");
    }

    function disableHover() {
        document.body.classList.remove("hasHover");
    }

    function updateLastTouchTime() {
        lastTouchTime = new Date();
    }

    document.addEventListener("touchstart", updateLastTouchTime, true);
    document.addEventListener("touchstart", disableHover, true);
    document.addEventListener("mousemove", enableHover, true);

    enableHover();
}

watchForHover();
//Fin Seccion Touch Watch

//Seccion History
let state = {
    currentPage: "home",
    lastLecture: {},
    lastAmmount: 0,
    lastPercentage: 0,
};

window.history.replaceState(state, null, "");

window.onpopstate = function (event) {
    if (event.state) {
        state = event.state;
    }

    Render(state);
};

function Render(state) {
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

/**representa el contador del progress bar*/
var termIndex = 0;
var termId = 0;

//guarda referencia al timeout cuando hago click en un boton de knowledge
var nextTermTimeoutId;

let randomTermList = [];
let currentTermList = [];

const app = document.getElementById("app");
const setContainer = document.querySelector(".sets-container");


function FlipTerms(event) {
    console.log("fliping terms");

    //FIX esto deberia vivir en el local storage ??
    //cambiar options object
    options.flipped = event.target.checked;
    console.log("new options flipped value is: " + options.flipped);

    //actualizar card
    //necesito una referencia al lecture object actual
    let title = document.querySelector(".title-div").childNodes[0];
    console.log(title);
    let currentLecture = GetLecture(title.textContent);
    let promptText = document.querySelector("#prompt-text");
    let answerText = document.querySelector("#answer-text");

    PopulateBigCardParameters(promptText, answerText);
}

function RandomizeTerms(event) {
    console.log("randomizing terms");

    options.random = event.target.checked;
    console.log("new random option value is : " + options.random);

    //obtener referencia a la leccion actual
    const lectureName = document.querySelector('.title-div').childNodes[0].textContent;
    const currentLectureObject = GetLecture(lectureName);

    if (options.random) {
        //deep copy la leccion
        randomTermList = JSON.parse(JSON.stringify(currentLectureObject.termList));

        //randomiza and set
        randomTermList = shuffleArray(randomTermList);
        currentTermList = randomTermList;

        //get reference to progress bar
        let progressBar = document.querySelector('.progress-bar-josue');
        progressBar.innerHTML = "";

        PopulateProgressBar(progressBar, currentLectureObject.id);

        PopulateBigCard();

        //updateKnowledgebuttons
        let lectureObj = GetLecture(lectureName);
        // let currentTermId = GetTermId(currentTermList, currentTermList[termIndex].term);
        let currentTermId = currentTermList[termIndex].id;
        CheckLearnStatus(lectureObj, currentTermId);
    } else {
        currentTermList = currentLectureObject.termList;

        let progressBar = document.querySelector('.progress-bar-josue');
        progressBar.innerHTML = "";

        PopulateProgressBar(progressBar, currentLectureObject.id);

        PopulateBigCard();

        let lectureObj = GetLecture(lectureName);
        // let currentTermId = GetTermId(currentTermList, currentTermList[termIndex].term)
        let currentTermId = currentTermList[termIndex].id;
        CheckLearnStatus(lectureObj, currentTermId);
    };
}

//setear switchs events
let flipSwitch = document.getElementById("flipTermsSwitch");
let randomSwitch = document.getElementById("randomSwitch");
flipSwitch.addEventListener("click", FlipTerms);
randomSwitch.addEventListener('click', RandomizeTerms);

CreateHomepageApp(setContainer);

function CreateHomepageApp(container) {
    //crear barra buscar
    let searchDiv = document.createElement("div");
    searchDiv.classList.add("searchContainer");
    app.appendChild(searchDiv);

    let searchLabel = document.createElement("label");
    searchLabel.classList.add("search-label");
    searchLabel.textContent = "Search by";
    searchDiv.appendChild(searchLabel);

    let searchOption = CreateSelectElement(["Name", "Content", "Tag"]);

    searchDiv.appendChild(searchOption);

    let search = document.createElement("input");
    search.classList.add("search");
    search.setAttribute("id", "search");
    search.setAttribute("type", "search");
    search.addEventListener("input", FilterSets);
    searchDiv.appendChild(search);

    let foundDiv = document.createElement("div");
    foundDiv.classList.add("foundContainer");
    let foundText = document.createElement("p");
    foundText.classList.add("foundText");
    foundDiv.appendChild(foundText);
    app.appendChild(foundDiv);
    //Fin Seccion Busqueda

    lectures.forEach((lecture) => {
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

            //FIX como calculo el porcentage
            let amount = 0;
            lecture.termList.forEach((term) => {
                if (currentLocalObj[term.id] == "learned") {
                    amount++;
                }
            });

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

        if (learnedAmountStringObj !== null) {
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
        button.addEventListener("click", () => OnFlashSetButton(lecture, total));
    });
}

/** Revisa si hubo cambios en los archivos de texto de las lecciones */
function CheckUpdates(lectureObj, currentLocalObj) {
    console.log("checking for updates on lecture texts");

    //nuevo objeto que representa el local storage
    let newObject = {};

    lectureObj.termList.forEach((term) => {
        if (currentLocalObj.hasOwnProperty(term.id)) {
            console.log("contiene ya este key");
            newObject[term.id] = currentLocalObj[term.id];
        } else {
            console.log("no contenia este key");
            newObject[term.id] = "";
        }
    });

    let lastkey = "lastCheckout";

    if (currentLocalObj.hasOwnProperty(lastkey)) {
        console.log("existe last checkout, agregandolo al final del nuevo objeto");
        newObject[lastkey] = currentLocalObj[lastkey];
    } else {
        newObject[lastkey] = "No Checkout.";
    }

    console.log("updated localstorage acording to text file");
    localStorage.setItem(lectureObj.id, JSON.stringify(newObject));

    return newObject;
}

function OnFlashSetButton(lectureObj, ammount) {
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
function FlashSetButton(lectureObj, ammount) {
    //cancelo show next term, si llego a volver a la pagina anterior
    clearTimeout(nextTermTimeoutId);

    // let stringKey = event.currentTarget.name;
    let stringKey = lectureObj.name;
    //aqui crear pagina con informacion de set
    app.innerHTML = "";

    //lo primero que hago es checkear si existe un objeto local
    //esto me retorna un objeto local actualizado
    let localStorageObject = GetLocalStorageObject(lectureObj);

    //Creacion titulo
    let lectureTitle = document.createElement("h1");
    lectureTitle.classList.add("my-3");
    lectureTitle.textContent = stringKey;
    app.appendChild(lectureTitle);

    //Creacion info
    let termsAmmountDiv = CreateElement("section", app);
    let ammountText = CreateElement("p", termsAmmountDiv);
    let percentageText = CreateElement("p", termsAmmountDiv);

    ammountText.textContent = ammount + " Terms /";
    let percentage = CalculatePercentageLearned(lectureObj.id);
    percentageText.textContent = percentage + "% Learned";

    termsAmmountDiv.classList.add(
        "d-flex",
        "justify-content-center",
        "terms-ammount-div"
    );

    //Creacion Seccion botones
    let buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add(
        "buttons-div",
        "xwidth",
        "xwidth-md",
        "text-center",
        "text-md-start"
    );
    app.appendChild(buttonsContainer);

    let learnButton = CreateElement("button", buttonsContainer);
    learnButton.classList.add("learn-button");
    learnButton.textContent = "Learn";
    learnButton.setAttribute("data-id", lectureObj.id);
    learnButton.addEventListener("click", () => OnLearnLecture(lectureObj));

    let checkoutButton = CreateElement("button", buttonsContainer);
    checkoutButton.classList.add("checkout-button");
    checkoutButton.textContent = "Checkout";
    checkoutButton.setAttribute("data-id", lectureObj.id);
    checkoutButton.addEventListener("click", (event) =>
        CheckoutLecture(event, lectureObj)
    );

    //Creacion text last checkout en pagina de terminos
    let lastCheckoutTextDiv = CreateElement("div", buttonsContainer);
    let lastCheckoutText = CreateElement("span", lastCheckoutTextDiv);
    lastCheckoutText.setAttribute("id", "last-check-text-term-page");

    lastCheckoutText.textContent =
        "Last Checkout: " + localStorageObject["lastCheckout"];
    lastCheckoutTextDiv.classList.add("float-md-end");

    //Creacion seccion terminos
    let container = document.createElement("div");
    container.classList.add("set-container", "xwidth", "xwidth-md");
    app.appendChild(container);

    let cardArray = lectureObj.termList;
    // let cardArray2 = Object.values(objSets[stringKey]);

    //create each card
    lectureObj.termList.forEach((term) => {
        //console.log(term);
        CreatePairCard(term, container);
    });
}

/**
 * Es llamado cuando armo la pagina de terminos
 * y quiero mostrar el porcentage aprendido
 * @param {string} name nombre de la leccion
 */
function CalculatePercentageLearned(id) {
    console.log(
        "aqui estoy calculando el porcentage de learned desde una funcion propia"
    );
    //Cuando llego aqui ya hay un objeto local y actualizado

    //el total de terminos
    let total = 0;
    let tempObj = lectures.find((lecture) => lecture.id == id);
    if (tempObj == null) {
        console.log(
            "hubo un error y no encontre el id de la clase en el objeto lectures"
        );
    } else {
        total = tempObj.termList.length;
    }

    const learnedAmountStringObj = localStorage.getItem(id);
    const currentLocalObj = JSON.parse(learnedAmountStringObj);

    let percent = 0;
    let amount = 0;
    for (let [key, value] of Object.entries(currentLocalObj)) {
        if (value === "learned") amount++;
    }

    percent = Math.trunc((amount / total) * 100);

    return percent;
}

function OnLearnLecture(lectureObj) {
    state.currentPage = "lectureFlash";
    state.lastLecture = lectureObj;
    // PushHistoryState(state);
    window.history.pushState(state, null, "");
    console.log("pushed state");

    LearnLecture(lectureObj);
}

function LearnLecture(lectureObj) {
    console.log("click learn lecture");

    //reseteo el termIndex
    termIndex = 0;

    //seteo la current lecture
    if (options.random) {
        //deep copy la leccion
        randomTermList = JSON.parse(JSON.stringify(lectureObj.termList));

        //randomiza and set
        randomTermList = shuffleArray(randomTermList);
        currentTermList = randomTermList;
    } else {
        currentTermList = lectureObj.termList;
    };

    app.innerHTML = "";

    let titleDiv = CreateElement("div", app);
    titleDiv.classList.add("title-div", "d-flex", "flex-column", "flex-md-row");

    let title = CreateElement("h1", titleDiv);
    title.textContent = lectureObj.name;

    let optionsBtn = CreateElement("button", titleDiv);
    optionsBtn.textContent = "Options";
    optionsBtn.setAttribute("data-bs-toggle", "modal");
    optionsBtn.setAttribute("data-bs-target", "#exampleModal");

    let progressBar = CreateElement("div", app);
    progressBar.classList.add(
        "progress-bar-josue",
        "d-flex",
        "flex-column",
        "flex-lg-row"
    );



    PopulateProgressBar(progressBar, lectureObj.id);

    let middleDiv = CreateElement("div", app);
    middleDiv.classList.add("middle-div");

    let leftArrow = CreateElement("i", middleDiv);
    leftArrow.classList.add("fa-solid", "fa-angle-left", "fa-xl", "arrow-btn");
    leftArrow.setAttribute("data-direction", "left");
    leftArrow.addEventListener("click", (event) => ClickArrow(event, lectureObj));

    let bigCardDiv = CreateElement("div", middleDiv);
    let bigCard = CreateElement("div", bigCardDiv);
    let firstLabel = CreateElement("p", bigCard);
    let prompt = CreateElement("div", bigCard);
    let promptText = CreateElement("p", prompt);
    let separator = CreateElement("div", bigCard);
    let answerDiv = CreateElement("div", bigCard);
    let answerPlaceholder = CreateElement("p", answerDiv);
    let answerText = CreateElement("p", answerDiv);
    let secondLabel = CreateElement("p", bigCard);

    let rightArrow = CreateElement("i", middleDiv);
    rightArrow.classList.add("fa-solid", "fa-angle-right", "fa-xl", "arrow-btn");
    rightArrow.addEventListener("click", (event) =>
        ClickArrow(event, lectureObj)
    );
    rightArrow.setAttribute("data-direction", "right");

    bigCardDiv.classList.add("big-card-div", "m-2");
    bigCard.classList.add("big-card");
    firstLabel.classList.add("label", "txt-left");
    secondLabel.classList.add("label", "txt-right");
    prompt.classList.add("prompt", "flex-grow-1");
    separator.classList.add("separator");
    answerDiv.classList.add("answer-div", "flex-grow-1");
    answerDiv.addEventListener("click", ClickAnswer);
    answerPlaceholder.classList.add("answer-placeholder", "align-self-center");
    answerPlaceholder.setAttribute("id", "answer-placeholder");
    answerText.classList.add("answer", "align-self-center", "hide");
    answerText.setAttribute("id", "answer-text");

    firstLabel.textContent = "Term";
    secondLabel.textContent = "Answer";

    //FIX
    //aqui tengo que buscar la 'carta' correspondiente, por ahora
    //poner la primera nomas
    // let termObject = Object.values(objSets[lectureKey])[0];
    let termsLenght = lectureObj.termList.length;
    // let [key, value] = Object.entries(termObject)[0];

    // promptText.textContent = lectureObj.termList[0].term;

    promptText.classList.add("align-self-center");
    promptText.setAttribute("id", "prompt-text");
    promptText.setAttribute("data-termid", lectureObj.termList[0].id);
    answerPlaceholder.textContent = "Click to reveal";

    //Aqui populo la primera card cuando creo la pagina learn

    PopulateBigCardParameters(promptText, answerText);   

    //temp counter section
    let counterDiv = CreateElement("div", app);
    counterDiv.classList.add("counter");
    counterDiv.textContent = `1/${termsLenght}`;

    //Knowledge buttons section
    let knowledgeDiv = CreateElement("div", app);
    let noKnowledgeButton = CreateElement("button", knowledgeDiv);
    let knowledgeButton = CreateElement("button", knowledgeDiv);

    knowledgeDiv.classList.add("knowledge-div");
    noKnowledgeButton.classList.add("learning");
    knowledgeButton.classList.add("learned");

    noKnowledgeButton.textContent = "Learning";
    knowledgeButton.textContent = "Learned";

    //cuando termino de crear la pagina learn
    //checkeo por primera vez si hay algo en local storage
    // let currentTermId = GetTermId(
    //     currentTermList,
    //     currentTermList[termIndex].term
    // );
    let currentTermId = currentTermList[termIndex].id;

    CheckLearnStatus(lectureObj, currentTermId);

    noKnowledgeButton.addEventListener("click", (event) =>
        ClickKnowledgeButton(event, lectureObj, "learning")
    );
    knowledgeButton.addEventListener("click", (event) =>
        ClickKnowledgeButton(event, lectureObj, "learned")
    );
}

function PopulateBigCardParameters(termElem, answerElem) {
    let promptTextValue = currentTermList[termIndex].term;
    let answerTextValue = currentTermList[termIndex].answer;

    if (currentTermList[termIndex].extra !== "") {
        promptTextValue += "（" + currentTermList[termIndex].extra + "）";
    };

    termElem.textContent = options.flipped ? answerTextValue : promptTextValue;
    answerElem.textContent = options.flipped ? promptTextValue : answerTextValue;
}

function PopulateBigCard() {
    let promptTextValue = currentTermList[termIndex].term;
    let answerTextValue = currentTermList[termIndex].answer;

    if (currentTermList[termIndex].extra !== "") {
        promptTextValue += "（" + currentTermList[termIndex].extra + "）";
    };

    let termElem = document.getElementById('prompt-text');
    let answerElem = document.getElementById('answer-text');

    termElem.textContent = options.flipped ? answerTextValue : promptTextValue;
    answerElem.textContent = options.flipped ? promptTextValue : answerTextValue;
}

/**
 * Es llamado cuando creo la pantalla de learn
 * Crea los squares de la barra de progreso
 */
function PopulateProgressBar(parent, lectureId) {
    //obtengo referencia al local storage para revisar avanze
    let learnedAmountStringObj = localStorage.getItem(lectureId);
    let currentLocalObj = JSON.parse(learnedAmountStringObj);

    //Obtengo una referencia al tamano del local object
    const length = currentTermList.length;
    const half = Math.ceil(length / 2);
    let afterHalf = false;
    let counter = 1;

    //Creo 2 divs que serviran de left col y right col
    let leftDiv = CreateElement("div", parent);
    let rightDiv = CreateElement("div", parent);
    leftDiv.classList.add("d-flex", "flex-grow-1");
    rightDiv.classList.add("d-flex", "flex-grow-1");

    //Por cada termino en el array termlist(array de objetos con los terminos)
    //crear un cuadrado y con el id de ese termino buscar el valor
    //en el objeto local
    currentTermList.forEach((term) => {
        if (counter > half) {
            afterHalf = true;
        }

        let boxParent = afterHalf ? rightDiv : leftDiv;

        let knowledgeValue = currentLocalObj[term.id];

        let progressBarItem;

        switch (knowledgeValue) {
            case "learned":
                progressBarItem = CreateElement("div", boxParent);
                progressBarItem.classList.add("learned-progress", "progress-bar-item");
                break;
            case "learning":
                progressBarItem = CreateElement("div", boxParent);
                progressBarItem.classList.add("learning-progress", "progress-bar-item");
                break;
            case "":
                progressBarItem = CreateElement("div", boxParent);
                progressBarItem.classList.add("no-progress", "progress-bar-item");
                break;
            default:
                //FIX aqui podria crear una caja vacia
                console.log("no encontre un termino en el local obj");
                console.log("se procede a crear una caja nueva");
                progressBarItem = CreateElement("div", boxParent);
                progressBarItem.classList.add("no-progress", "progress-bar-item");
                break;
        }

        counter++;
    });

    let allProgressItem = document.getElementsByClassName("progress-bar-item");
    let currentProgressItem = allProgressItem[termIndex];
    // let firstProgressItem = document.querySelector('.progress-bar-josue').childNodes[0];
    console.log("added current class on populate");
    currentProgressItem.classList.add("progress-item-current");
}

/**Se llama cuando hago click en el boton de checkout */
function CheckoutLecture(event, lectureObj) {
    console.log("click checkout");
    let lectureId = event.target.dataset.id;
    const date = new Date().toLocaleDateString();

    let lectureObjString = localStorage.getItem(lectureObj.id);
    if (lectureObjString !== null) {
        console.log(lectureObjString);
        let lectureObject = JSON.parse(lectureObjString);
        console.log(lectureObject);
        lectureObject.lastCheckout = date;
        lectureObjString = JSON.stringify(lectureObject);
        localStorage.setItem(lectureObj.id, lectureObjString);
    } else {
        //crear el objeto desde 0 y luego agregar fecha

        let lectureObjString = CreateLocalStorageObject(lectureObj);
        console.log(lectureObjString);
        let lectureObject = JSON.parse(lectureObjString);
        console.log(lectureObject);
        lectureObject.lastCheckout = date;
        lectureObjString = JSON.stringify(lectureObject);
        localStorage.setItem(lectureObj.id, lectureObjString);
    }

    const lastCheckoutText = document.getElementById("last-check-text-term-page");
    lastCheckoutText.textContent = "Last Checkout: " + date;
}

/**Lo llamo cuando creo la pagina de learn por primera vez,
 * tambien cuando cambio de card
 * Actualiza los botones de knowledge
 */
function CheckLearnStatus(lectureObj, termId) {
    document.querySelector(".learning").setAttribute("id", "");
    document.querySelector(".learned").setAttribute("id", "");

    let currentString;
    let currentObject;

    currentString = localStorage.getItem(lectureObj.id);
    currentObject = JSON.parse(currentString);

    let prompt = document.querySelector(".prompt").firstChild;
    console.log(prompt.textContent);

    //basado en el id del termino actual, buscar el knowledge
    //en el local storage
    switch (currentObject[termId]) {
        case "learned":
            console.log("aqui cambio el boton learned");
            ChangeKnowledgeButtonString("learned");
            break;
        case "learning":
            console.log("aqui cambio el boton learning");
            ChangeKnowledgeButtonString("learning");
            break;
        case "":
            console.log("aqui hago nada");
            break;
        default:
            console.log("el valor es: " + value);
            break;
    }
}

function CreateLocalStorageObject(currentLectureObj) {
    //crear objeto
    let storageObject = {};
    let currentArray = currentLectureObj.termList;

    //popular objecto
    currentArray.forEach((term) => {
        storageObject[term.id] = "";
    });

    let objectString = JSON.stringify(storageObject);
    localStorage.setItem(currentLectureObj.id, objectString);

    return localStorage.getItem(currentLectureObj.id);
}

function ChangeKnowledgeButtonString(btnclass) {
    let leftButton = document.querySelector(".learning");
    let rightButton = document.querySelector(".learned");

    leftButton.removeAttribute("id");
    rightButton.removeAttribute("id");

    let buttonToChange = document.querySelector(`.${btnclass}`);
    buttonToChange.setAttribute("id", "checked");
}

function ChangeKnowledgeButtonElem(event, lectureId, tag, termId) {
    let leftButton = document.querySelector(".learning");
    let rightButton = document.querySelector(".learned");

    leftButton.removeAttribute("id");
    rightButton.removeAttribute("id");

    event.target.setAttribute("id", "checked");

    //aqui actualizar storage
    UpdateLocalStorage(lectureId, tag, termId);
}

/**
 * Es llamado cuando apreto un boton de knowledge
 */
function UpdateLocalStorage(lectureId, tag, termId) {
    console.log("boton clikeado " + tag);

    //aqui actualizar local storage
    let currentLecture = lectureId;

    let counter = 0;

    //aqui se encontro el objeto en local storage basado en la leccion actual
    let currentString = localStorage.getItem(currentLecture);
    let currentObject = JSON.parse(currentString);
    console.log(
        "el objeto que recibo dentro de updatelocal storage: " + currentString
    );

    //aqui buscar por el objeto por el key basado en el prompt
    for (let [key, value] of Object.entries(currentObject)) {
        if (key == termId) {
            console.log(
                "se encontro el prompt en la lista con el valor de: " + value
            );

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
}

/**
 * Se llama cuando termino de actualizar el local storage object
 */
function UpdateProgressBar(progressItem, classToAdd) {
    // let allProgressItem = document.getElementsByClassName('progress-bar-item');
    // let progressBar = document.querySelector('.progress-bar-josue');
    // // let progressItem = progressBar.childNodes[counter];
    // let progressItem =  allProgressItem[counter];

    progressItem.classList.remove("learning-progress");
    progressItem.classList.remove("learned-progress");
    progressItem.classList.remove("no-progress");

    // progressItem.setAttribute('class', '');

    switch (classToAdd) {
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
function ClickKnowledgeButton(event, lectureObj, tag) {
    // let currentTermId = GetTermId(
    //     lectureObj.termList,
    //     currentTermList[termIndex].term
    // );

    let currentTermId = currentTermList[termIndex].id;

    // console.log("current term id is : " + currentTermId);
    console.log("current term id is : " + currentTermId);

    let progressItem = document.querySelector(".progress-item-current");
    UpdateProgressBar(progressItem, tag);

    ChangeKnowledgeButtonElem(event, lectureObj.id, tag, currentTermId);

    DisableKnowledgeButtons();

    nextTermTimeoutId = setTimeout(
        () => ShowNextTerm(1, lectureObj),
        900
    );
    console.log("called shownextterm with timeout");
}

function DisableKnowledgeButtons() {
    let leftButton = document.querySelector(".learning");
    let rightButton = document.querySelector(".learned");

    leftButton.setAttribute("disabled", "disabled");
    rightButton.setAttribute("disabled", "disabled");

    setTimeout(function () {
        leftButton.removeAttribute("disabled");
        rightButton.removeAttribute("disabled");
    }, 500);
}

function ShowNextTerm(dir, lectureObj) {
    console.log("changing term");

    //obtengo el card actual y le doy la clase que lo hace moverse
    let bigCard = document.querySelector(".big-card");
    const className = dir === -1 ? "disappear-right" : "disappear-left";
    bigCard.classList.add(className);

    //despues la destruyo
    setTimeout(() => DeleteElement(bigCard), 300);

    //referencia a la barra y selecciono el cuadrado actual basado en termIndex
    let allProgressItem = document.getElementsByClassName("progress-bar-item");
    let progressItem = allProgressItem[termIndex];
    //le saco la clase que le da el borde amarillo
    progressItem.classList.toggle("progress-item-current");

    //necesito buscar el siguiente termino y popular la tarjeta
    //array de terminos
    let termsArray = lectureObj.termList;

    //modifico el termIndex basado en la direccion de la flecha
    if (termIndex + dir == termsArray.length) {
        termIndex = 0;
    } else if (termIndex + dir < 0) {
        termIndex = termsArray.length - 1;
    } else {
        termIndex += dir;
    }

    //seleccion el siguiente term con el index actualizado
    // let termObj = termsArray[termIndex];
    console.log("este es el numero index: " + termIndex);

    //le doy el borde amarillo a la siguiente caja
    updateSelectedProgressItem(termIndex);

    // console.log("este es el obj par prompt/meaning");
    // console.log(termObj);

    //creacion de nueva carta
    let bigCardDiv = document.querySelector(".big-card-div");

    let newCard = document.createElement("div");
    bigCardDiv.insertBefore(newCard, bigCardDiv.children[0]);

    let firstLabel = CreateElement("p", newCard);
    let prompt = CreateElement("div", newCard);
    let promptText = CreateElement("p", prompt);
    let separator = CreateElement("div", newCard);
    let answerDiv = CreateElement("div", newCard);
    let answerPlaceholder = CreateElement("p", answerDiv);
    let answerText = CreateElement("p", answerDiv);
    let secondLabel = CreateElement("p", newCard);

    newCard.classList.add("big-card");
    firstLabel.classList.add("label", "txt-left");
    secondLabel.classList.add("label", "txt-right");
    prompt.classList.add("prompt", "flex-grow-1");
    separator.classList.add("separator");
    answerDiv.classList.add("answer-div", "flex-grow-1");
    answerDiv.addEventListener("click", ClickAnswer);
    answerPlaceholder.classList.add("answer-placeholder", "align-self-center");
    answerPlaceholder.setAttribute("id", "answer-placeholder");
    answerText.classList.add("answer", "align-self-center", "hide");
    answerText.setAttribute("id", "answer-text");

    firstLabel.textContent = "Term";
    secondLabel.textContent = "Answer";
    answerPlaceholder.textContent = "Click to reveal";

    //populo el term
    // if(termsArray[termIndex].extra !== ""){
    //     promptText.textContent = termsArray[termIndex].term + "（" + termsArray[termIndex].extra+ "）";
    // }else{
    //     promptText.textContent = termsArray[termIndex].term;
    // }

    promptText.classList.add("align-self-center");
    promptText.setAttribute("id", "prompt-text");
    promptText.setAttribute("data-termid", termsArray[termIndex].id);

    let placeholder = document.querySelector(".answer-placeholder");
    placeholder.classList.remove("hide");

    let answer = document.querySelector(".answer");
    answer.classList.add("hide");

    //aqui escribo el contenido a la tarjeta basado en la opcion
    PopulateBigCardParameters(promptText, answer);
    //fin escribir el contenido card

    //buscar informacion guardada sobre boton
    
    //temp actualizar counter
    UpdateCounter(termsArray.length);

    //obtengo el id del termino actual
    // let currentTermId = GetTermId(
    //     lectureObj.termList,
    //     currentTermList[termIndex].term
    // );

    let currentTermId = currentTermList[termIndex].id;

    //cada vez que cambio de card revisar si existe algo en local storage
    CheckLearnStatus(lectureObj, currentTermId);
}

// function removeSelectedProgressItem(index){
//     console.log('called remove');
//     let progressItem = document.querySelector('.progress-bar-josue').childNodes[index];
//     progressItem.classList.remove('progress-item-current');
// }

function updateSelectedProgressItem(index) {
    let allProgressItem = document.getElementsByClassName("progress-bar-item");
    // let progressItem = document.querySelector('.progress-bar-josue').childNodes[index];
    let progressItem = allProgressItem[index];
    progressItem.classList.add("progress-item-current");
}

function UpdateCounter(total) {
    let counter = document.querySelector(".counter");
    counter.textContent = `${termIndex + 1}/${total}`;
}

function DeleteElement(element) {
    element.remove();
}

function ClickAnswer() {
    console.log("click en answer");
    //aqui es cuando cambio de estado los 'p' para mostrar la respuesta
    let placeholder = document.querySelector(".answer-placeholder");
    placeholder.classList.toggle("hide");

    let answer = document.querySelector(".answer");
    answer.classList.toggle("hide");
}

function ClickArrow(event, lectureObj) {
    clearTimeout(nextTermTimeoutId);

    let direction = event.target.dataset.direction;

    if (direction === "left") {
        ShowNextTerm(-1, lectureObj);
    } else {
        ShowNextTerm(1, lectureObj);
    }
}

/**
 * Creates an element and parents it
 * @param {String} elem
 * @param {Element} parent
 */
function CreateElement(elem, parent) {
    let element = document.createElement(`${elem}`);
    parent.appendChild(element);
    return element;
}

function CreatePairCard(termObj, parent) {
    //create container div
    let container = document.createElement("div");
    container.classList.add("pair-card-container", "d-flex");
    parent.appendChild(container);

    //FIX
    //create key div
    let keyDiv = document.createElement("div");
    keyDiv.classList.add("keyDiv", "align-self-center", "col-6");
    container.appendChild(keyDiv);

    if (termObj.extra !== "") {
        keyDiv.textContent = termObj.term + "（" + termObj.extra + "）";
    } else {
        keyDiv.textContent = termObj.term;
    }

    //create value div
    let valueDiv = document.createElement("div");
    valueDiv.textContent = termObj.answer;
    valueDiv.classList.add("valueDiv", "align-self-center", "col-6");
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

function FilterSets(event) {
    //aqui filtrar lista de lecciones
    //para mostrar solo lo que busque
    let search = document.getElementById("search");

    if (search.value === "") {
        console.log("Nada que buscar.");
        ResetFilter();
        return;
    }

    let select = document.getElementById("search-select");
    // console.log("filtering " + search.value);
    // console.log(select.options[select.selectedIndex].text);

    switch (select.value) {
        case "Name":
            FilterByName(search.value);
            break;
        case "Content":
            FilterByContent(search.value);
            break;
        case "Tag":
            console.log("La busqueda por Tag no esta implementada.");
            UpdateFoundText(`La busqueda por Tag no esta implementada.`);
            break;
        default:
            break;
    }
}

function FilterByName(filter) {
    filter = filter.toLowerCase();

    let textButton;
    let found = 0;

    let list = document.getElementsByClassName("set-button");
    for (let i = 0; i < list.length; i++) {
        textButton = list[i].childNodes[1].textContent;

        if (textButton.toLowerCase().indexOf(filter) > -1) {
            list[i].style.display = "";
            found++;
        } else {
            list[i].style.display = "none";
        }
    }

    UpdateFoundText(`${found} found.`);
}

function FilterByContent(filter) {
    console.log("Filtering by " + filter);
    filter = filter.toLowerCase();

    /**Array de strings que representan en que lecture esta el contenido*/
    let sets = [];
    let textButtonContent;

    //por cada objeto en lectures
    lectures.forEach((lecture) => {
        console.log("leyendo una leccion");
        lecture.termList.forEach((term) => {
            let sepTerm = SeparateString(term.term.toLowerCase());
            let sepExtra = SeparateString(term.extra.toLowerCase());
            let sepAnsw = SeparateString(term.answer.toLowerCase());
            //console.log(term.term);
            if (
                sepTerm.includes(filter) ||
                sepExtra.includes(filter) ||
                sepAnsw.includes(filter) ||
                term.answer.toLowerCase() == filter
            ) {
                console.log(sepTerm, term.extra, term.answer, filter);
                sets.push(lecture.name);
                console.log(`found ${filter} in ${lecture.name} inside "objSets"`);
            }
        });
    });

    //aqui modificar la lista si sets tiene algo
    if (sets.length > 0) {
        console.log("encontre algo y modificare la lista");
        UpdateFoundText(`${sets.length} found.`);

        /**Array de todos los botones de lectures*/
        let list = document.getElementsByClassName("set-button");
        for (let i = 0; i < list.length; i++) {
            /**Nombre de lecture dentro del boton */
            textButtonContent = list[i].childNodes[1].textContent;
            let found = false;

            //reviso si este boton coincide a uno de los botones que deberia dejar
            //si no, lo escondo
            sets.forEach((name) => {
                name = name.toLowerCase();
                textButtonContent = textButtonContent.toLowerCase();

                if (found) {
                    return;
                }
                if (textButtonContent == name) {
                    list[i].style.display = "";
                    found = true;
                } else {
                    list[i].style.display = "none";
                }
            });
        }
    }else{
        //necesito mostrar el mensaje 
        ResetFilter();
        UpdateFoundText(`${sets.length} found.`);

        //necesito devolver todos los botones
    }

    console.log(sets);
}

function ResetFilter() {
    let list = document.getElementsByClassName("set-button");
    for (let i = 0; i < list.length; i++) {
        list[i].style.display = "";
    }

    UpdateFoundText("");
}

function UpdateFoundText(text) {
    let label = document.querySelector(".foundText");
    label.textContent = text;
}

function CreateSelectElement(options) {
    let select = document.createElement("select");
    select.setAttribute("id", "search-select");
    select.addEventListener("change", FilterSets);
    options.forEach((option) => {
        let op = document.createElement("option");
        op.setAttribute("value", option);
        op.textContent = option;
        select.appendChild(op);
    });

    return select;
}

//Helpers

/**Return el objeto de local storage, si no existe lo crea, incluyendo la key 'lastCheckout
 * Si existe, lo revisa por actualizaciones y lo returna.
 */
function GetLocalStorageObject(lectureObj) {
    //intento obtener una referencia al objeto local basado en el id
    let localStorageString = localStorage.getItem(lectureObj.id);
    let localStorageObject = {};
    //si no existe
    if (localStorageString == null) {
        localStorageString = CreateLocalStorageObject(lectureObj);
        let lectureObject = JSON.parse(localStorageString);
        lectureObject.lastCheckout = "No Checkout";
        localStorageString = JSON.stringify(lectureObject);
        localStorage.setItem(lectureObj.id, localStorageString);
        localStorageObject = JSON.parse(localStorageString);
    } else {
        //si existe aprovechar de checkear por updates;
        let lectureObject = JSON.parse(localStorageString);
        localStorageObject = CheckUpdates(lectureObj, lectureObject);
    }

    // localStorageString = localStorage.getItem(lectureObj.id);
    return localStorageObject;
}

/**Retorna el objeto de lecture basado en el titulo */
function GetLecture(lectureTitle) {
    let foundLecture = {};
    for (let index = 0; index < lectures.length; index++) {
        if (lectures[index].name == lectureTitle) {
            console.log("found lecture?");
            foundLecture = lectures[index];
            break;
        }
    }
    return foundLecture;
}

function ReloadPage() {
    location.reload();
}

function ReturnAsString(text) {
    return text;
}

//variable name helper
const varToString = (varObj) => Object.keys(varObj)[0];

function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
}

/**Busca por todo el array y compara la palabra 'term' con el 'jap' o 'esp' de los objetos */
function GetTermId(termArray, term) {
    console.log("get term id");
    console.log(termArray);
    console.log(term);
    let id = -1;

    for (let index = 0; index < termArray.length; index++) {
        if (termArray[index].term == term || termArray[index.answer] == term) {
            console.log("found the term at index: " + index);
            id = termArray[index].id;
            break;
        }
    }

    if (id < 0) {
        console.log("hubo un error y no se encontro el termino dentro del array");
    } else {
        console.log("id encontrado " + id);
        return id;
    }
}

function shuffleArray(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

function SeparateString(term){
    let sep = term.split(/[、,()\s\/]/);
    //console.log(`separated term: ${sep}`);
    return sep;
}

//codigo Local Storage
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
