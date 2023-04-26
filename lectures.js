const lectures = [
  {
    id: "0",
    name: "Lecture 1",
    termList: [
      { id: 0, jap: "Termino1", kanji: "kanji1", esp: "Respuesta1" },
      { id: 1, jap: "Termino2", kanji: "kanji2", esp: "Respuesta2" },
      { id: 2, jap: "Termino3", kanji: "", esp: "Respuesta3" },
    ],
  },

  {
    id: "1",
    name: "Lecture 2",
    termList: [
      { id: 0, jap: "Termino1", kanji: "kanji1", esp: "Respuesta1" },
      { id: 1, jap: "Termino2", kanji: "", esp: "Respuesta2" },
      { id: 2, jap: "Termino3", kanji: "kanji2", esp: "Respuesta3" },
    ],
  },
];

export { lectures };

//el localstorage es un objeto que en basado en keys guarda objetos
let local = {
    0 : { 0 : "learned", 1 : "learning" , 2 : "", "lastCheckout" : "4/11/23"},
    1 : { 0 : "learned", 1 : "learning" , 2 : "", "lastCheckout" : "No Checkout"},
}
