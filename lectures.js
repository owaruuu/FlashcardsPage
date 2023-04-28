let options = {
  flipped: false,
  random: false,
};

//el  orden de los objetos es como apareceran en la pagina
const lectures = [
  {
    id: "3",
    name: "Leccion 1 Minna",
    termList: [
      { id: 0, term: "わたし", extra: "私", answer: "Yo" },
      { id: 1, term: "わたしたち", extra: "私たち", answer: "Nosotros" },
      { id: 2, term: "あなた", extra: "", answer: "Usted" },
      { id: 3, term: "あのひと", extra: "あの人", answer: "Aquella persona" },
      {
        id: 4,
        term: "あのかた",
        extra: "あの方",
        answer: "Aquella persona(formal)",
      },
      { id: 5, term: "みなさん", extra: "皆さん", answer: "Todos" },
      { id: 6, term: "さん", extra: "", answer: "Señor" },
      { id: 7, term: "ちゃん", extra: "", answer: "Sufijo niños" },
      { id: 8, term: "くん", extra: "", answer: "Sufijo varones" },
      { id: 9, term: "じん", extra: "人", answer: "Sufijo nacionalidad" },
      { id: 10, term: "せんせい", extra: "先生", answer: "Profesor" },
      {
        id: 11,
        term: "きょうし",
        extra: "教師",
        answer: "Profesor(cuando te refieres a ti mismo)",
      },
      { id: 12, term: "がくせい", extra: "学生", answer: "Estudiante" },
      {
        id: 13,
        term: "かいしゃいん",
        extra: "会社員",
        answer: "Empleado de una empresa",
      },
      {
        id: 14,
        term: "しゃいん",
        extra: "社員",
        answer: "Empleado de la empresa",
      },
      {
        id: 15,
        term: "ぎんこういん",
        extra: "銀行員",
        answer: "Empleado de banco",
      },
      { id: 16, term: "いしゃ", extra: "医者", answer: "Doctor" },
      {
        id: 17,
        term: "けんきゅうしゃ",
        extra: "研究者",
        answer: "Investigador",
      },
      { id: 18, term: "エンジニア", extra: "", answer: "Ingeniero" },
      { id: 19, term: "だいがく", extra: "大学", answer: "Universidad" },
      { id: 20, term: "びょういん", extra: "病院", answer: "Hospital" },
      { id: 21, term: "でんき", extra: "電気", answer: "Electricidad" },
      { id: 22, term: "だれ", extra: "", answer: "Quien" },
      { id: 23, term: "どなた", extra: "", answer: "Quien(formal)" },
      { id: 24, term: "さい", extra: "歳 / 才", answer: "Contador edad" },
      { id: 25, term: "なんさい", extra: "何歳", answer: "Que edad" },
      { id: 26, term: "おいくつ", extra: "", answer: "Que edad(formal)" },
      { id: 27, term: "はい", extra: "", answer: "Si" },
      { id: 28, term: "いいえ", extra: "", answer: "No" },
      { id: 29, term: "しつれいですが", extra: "", answer: "Disculpe pero" },
      { id: 30, term: "おなまえは？", extra: "", answer: "Cual es tu nombre?" },
      { id: 31, term: "はじめまして", extra: "", answer: "Mucho gusto" },
      {
        id: 32,
        term: "どうぞよろしく",
        extra: "",
        answer: "Encantado de conocerte",
      },
      {
        id: 33,
        term: "こちらは。。。さんです",
        extra: "",
        answer: "Le presento a...",
      },
      { id: 34, term: "。。。からきました", extra: "", answer: "Vengo de..." },
      { id: 35, term: "アメリカ", extra: "", answer: "EE.UU" },
      { id: 36, term: "イギリス", extra: "", answer: "Inglaterra" },
      { id: 37, term: "インド", extra: "", answer: "India" },
      { id: 38, term: "インドネシア", extra: "", answer: "Indonesia" },
      { id: 39, term: "かんこく", extra: "韓国", answer: "Corea del sur" },
      { id: 40, term: "タイ", extra: "", answer: "Tailandia" },
      { id: 41, term: "ちゅうごく", extra: "中国", answer: "China" },
      { id: 42, term: "ドイツ", extra: "", answer: "Alemania" },
      { id: 43, term: "にほん", extra: "日本", answer: "Japon" },
      { id: 44, term: "フランス", extra: "", answer: "Francia" },
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
