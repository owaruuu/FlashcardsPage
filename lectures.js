let options = {
  flipped : false,
  random : false,
}

//el  orden de los objetos es como apareceran en la pagina
const lectures = [
  {
    id: "0",
    name: "Leccion 1",
    termList: [
      { id: 0, term: "やまだ", extra: "kanji1", answer: "Respuesta1" },
      { id: 1, term: "Termino2", extra: "kanji2", answer: "Respuesta2" },
      { id: 2, term: "Termino3", extra: "kanji3", answer: "Respuesta3" },
    ],
  },
  {
    id: "1",
    name: "Leccion 2",
    termList: [
      { id: 0, term: "Termino1", extra: "日", answer: "Respuesta1" },
      { id: 1, term: "Termino2", extra: "", answer: "Respuesta2" },
      { id: 2, term: "Termino3", extra: "", answer: "Respuesta3" },
    ],
  },
  {
    id: "2",
    name: "Leccion 3",
    termList: [
      { id: 0, term: "はちこ", extra: "幸子", answer: "Respuesta1" },
      { id: 3, term: "Termino4", extra: "kanji4", answer: "Respuesta4" },
      { id: 1, term: "Termino2", extra: "Kanji2", answer: "Respuesta2" },
      { id: 2, term: "Termino3", extra: "kanji3", answer: "Respuesta3" },
    ],
  },
];

export { lectures, options };

//el localstorage es un objeto que en basado en keys guarda objetos
let local = {
  0: { 0: "learned", 1: "learning", 2: "", lastCheckout: "4/11/23" },
  1: { 0: "learned", 1: "learning", 2: "", lastCheckout: "No Checkout" },
};
