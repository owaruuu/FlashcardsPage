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
    id: "4",
    name: "Clase 1",
    termList: [
      { id: 0, term: "せつめい", extra: "説明", answer: "Explicacion" },
      { id: 1, term: "ないよう", extra: "内容", answer: "Contenido, Detalle" },
      {
        id: 2,
        term: "きめます、きめる",
        extra: "決める",
        answer: "Decidir, Elegir",
      },
      { id: 3, term: "じゅぎょう", extra: "授業", answer: "Clase" },
      { id: 4, term: "かいわ", extra: "会話", answer: "Conversacion" },
      { id: 5, term: "ふくしゅう", extra: "復習", answer: "Repaso" },
      { id: 6, term: "か", extra: "課", answer: "Contador leccion" },
      { id: 7, term: "ほんもの", extra: "本物", answer: "Real, Autentico" },
      { id: 8, term: "にんき", extra: "人気", answer: "Popular" },
      { id: 9, term: "ぐ", extra: "具", answer: "Relleno/Ingrediente" },
      {
        id: 10,
        term: "ざいりょう",
        extra: "材料",
        answer: "Material/Materiales",
      },
      {
        id: 11,
        term: "ぐざい",
        extra: "具材",
        answer:
          "Ingrediente(Carne, pescado y verduras para añadir a sopas, guisos, etc.)",
      },
      {
        id: 12,
        term: "しょくざい",
        extra: "食材",
        answer:
          "Ingrediente(Carne, pescado y verduras en general utilizados en la cocina.)",
      },
      {
        id: 13,
        term: "ようい",
        extra: "用意",
        answer:
          "Preparacion(Cuando lo que hay que preparar es formulista o específico.)",
      },
      {
        id: 14,
        term: "よういする、よういします",
        extra: "用意する",
        answer: "Preparar",
      },
      {
        id: 15,
        term: "じゅんび",
        extra: "準備",
        answer:
          "Preparacion(Puede ser más amplio e incluir posturas distintas de los objetos)",
      },
      {
        id: 16,
        term: "じゅんびする、じゅんびします",
        extra: "準備する",
        answer: "Preparar",
      },
      {
        id: 17,
        term: "おいはらう、おいはらいます",
        extra: "追い払う",
        answer: "Alejarse",
      },
      {
        id: 18,
        term: "は/はっぱ",
        extra: "葉/葉っぱ",
        answer: "Hoja(s) de arbol o flor",
      },
      { id: 19, term: "ふじん", extra: "婦人", answer: "Señora(s)" },
      { id: 20, term: "しゃかい", extra: "社会", answer: "Sociedad" },
      {
        id: 21,
        term: "かつやく",
        extra: "活躍",
        answer: "Participacion activa",
      },
      { id: 22, term: "さんか", extra: "参加", answer: "Participacion" },
      {
        id: 23,
        term: "さんかする、さんかします",
        extra: "参加する",
        answer: "Participar",
      },
      { id: 24, term: "けんり", extra: "権利", answer: "Derechos" },
      {
        id: 25,
        term: "とうひょうけん",
        extra: "投票権",
        answer: "Derecho de voto",
      },
      { id: 26, term: "おくる、おくります", extra: "贈る", answer: "Regalar" },
      {
        id: 27,
        term: "れんしゅう",
        extra: "練習",
        answer: "Practica, Entrenamiento",
      },
      {
        id: 28,
        term: "りゆう",
        extra: "理由",
        answer: "Razon, Pretexto, Motivo",
      },
      { id: 29, term: "ぜんぶ", extra: "全部", answer: "Todo" },
      { id: 30, term: "つかいます、つかう", extra: "使う", answer: "Usar" },
      {
        id: 31,
        term: "ならいます、ならう",
        extra: "習う",
        answer: "Aprender(de un profesor), Tomar clases en",
      },
      {
        id: 32,
        term: "かんじ",
        extra: "漢字",
        answer: "Kanji, Caracter chino",
      },
      { id: 33, term: "よみます、よむ", extra: "読む", answer: "Leer" },
      {
        id: 34,
        term: "かた",
        extra: "方",
        answer: "Direccion, Persona, Manera",
      },
      {
        id: 35,
        term: "なおします、なおす",
        extra: "直す",
        answer: "Reparar, Arreglar, Corregir",
      },
      {
        id: 36,
        term: "はなします、はなす",
        extra: "話す",
        answer: "Hablar, Decir",
      },
      { id: 37, term: "かきます、かく", extra: "書く", answer: "Escribir " },
      {
        id: 38,
        term: "かきます、かく",
        extra: "描く",
        answer: "Dibujar, Pintar",
      },
      { id: 39, term: "みじかい", extra: "短い", answer: "Corto" },
      {
        id: 40,
        term: "かんがえます、かんがえる",
        extra: "考える",
        answer: "Pensar, Contemplar, Meditar",
      },
      { id: 41, term: "しゃしん", extra: "写真", answer: "Foto" },
      { id: 42, term: "ろう", extra: "蝋", answer: "Cera" },
      { id: 43, term: "ロウソク/キャンドル", extra: "", answer: "Vela" },
      { id: 44, term: "ひつよう", extra: "必要", answer: "Necesario" },
      {
        id: 45,
        term: "ぜったいにひつよう",
        extra: "ぜったいに必要",
        answer: "No puede faltar, Debe tener",
      },
      {
        id: 46,
        term: "あまずっぱい",
        extra: "甘酸っぱい",
        answer: "Agridulce",
      },
      { id: 47, term: "す", extra: "酢", answer: "Vinagre" },
      { id: 48, term: "はんぶん", extra: "半分", answer: "Mitad" },
      { id: 49, term: "やさい", extra: "野菜", answer: "Vegetal" },
      {
        id: 50,
        term: "たまごやき",
        extra: "卵焼き",
        answer: "Tamagoyaki, Omelette japones",
      },
      {
        id: 51,
        term: "とります、とる",
        extra: "取る",
        answer: "Sacar, Remover",
      },
      {
        id: 52,
        term: "せわた",
        extra: "背わた",
        answer: "Tracto digestivo del camaron",
      },
      {
        id: 53,
        term: "のせます、のせる",
        extra: "乗せる",
        answer: "Poner algo en (algo)",
      },
      { id: 54, term: "さいご", extra: "最後", answer: "Final, Conclusion" },
      { id: 55, term: "かたち", extra: "形", answer: "Forma, Figura" },
      {
        id: 56,
        term: "まきます、まく",
        extra: "巻く",
        answer: "Enrollar, Envolver",
      },
      { id: 57, term: "おまつり", extra: "お祭り", answer: "Festival" },
      { id: 58, term: "にんぎょう", extra: "人形", answer: "Muñeca" },
      { id: 59, term: "とくべつ", extra: "特別", answer: "Especial" },
      { id: 60, term: "かざり", extra: "", answer: "Decoracion" },
      { id: 61, term: "けんこう", extra: "", answer: "Salud" },
      {
        id: 62,
        term: "しあわせ",
        extra: "幸せ",
        answer: "Felicidad, Buena suerte",
      },
      { id: 63, term: "いのります、いのる", extra: "祈る", answer: "Rezar" },
      { id: 64, term: "きせつ", extra: "季節", answer: "Estacion(del año)" },
      { id: 65, term: "もも", extra: "桃", answer: "Durazno" },
      { id: 66, term: "はだ", extra: "肌", answer: "Piel" },
      {
        id: 67,
        term: "おふろ",
        extra: "お風呂",
        answer: "Ducha, Duchar, Lugar de ducha",
      },
      { id: 68, term: "よくそう", extra: "浴槽", answer: "Bañera" },
    ],
  },
  {
    id: "5",
    name: "Clase 1 Kanji",
    termList: [
      { id: 0, term: "説明", extra: "", answer: "せつめい / Explicacion" },
      {
        id: 1,
        term: "内容",
        extra: "",
        answer: "ないよう / Contenido, Detalle",
      },
      {
        id: 2,
        term: "決める",
        extra: "",
        answer: "きめます、きめる / Decidir, Elegir",
      },
      { id: 3, term: "授業", extra: "", answer: "じゅぎょう / Clase" },
      { id: 4, term: "会話", extra: "", answer: "かいわ / Conversacion" },
      { id: 5, term: "復習", extra: "", answer: "ふくしゅう / Repaso" },
      { id: 6, term: "課", extra: "", answer: "か / Contador leccion" },
      { id: 7, term: "本物", extra: "", answer: "ほんもの / Real, Autentico" },
      { id: 8, term: "人気", extra: "", answer: "にんき / Popular" },
      { id: 9, term: "具", extra: "", answer: "ぐ / Relleno/Ingrediente" },
      {
        id: 10,
        term: "材料",
        extra: "",
        answer: "ざいりょう / Material/Materiales",
      },
      {
        id: 11,
        term: "具材",
        extra: "",
        answer:
          "ぐざい / Ingrediente(Carne, pescado y verduras para añadir a sopas, guisos, etc.)",
      },
      {
        id: 12,
        term: "食材",
        extra: "",
        answer:
          "しょくざい / Ingrediente(Carne, pescado y verduras en general utilizados en la cocina.)",
      },
      {
        id: 13,
        term: "用意",
        extra: "",
        answer:
          "ようい / Preparacion(Cuando lo que hay que preparar es formulista o específico.)",
      },
      {
        id: 15,
        term: "準備",
        extra: "",
        answer:
          "じゅんび / Preparacion(Puede ser más amplio e incluir posturas distintas de los objetos)",
      },
      {
        id: 17,
        term: "追い払う",
        extra: "",
        answer: "おいはらう、おいはらいます / Alejarse",
      },
      {
        id: 18,
        term: "葉/葉っぱ",
        extra: "",
        answer: "は/はっぱ / Hoja(s) de arbol o flor",
      },
      { id: 19, term: "婦人", extra: "", answer: "ふじん / Señora(s)" },
      { id: 20, term: "社会", extra: "", answer: "しゃかい / Sociedad" },
      {
        id: 21,
        term: "活躍",
        extra: "",
        answer: "かつやく / Participacion activa",
      },
      { id: 22, term: "参加", extra: "", answer: "さんか / Participacion" },
      { id: 24, term: "権利", extra: "", answer: "けんり / Derechos" },
      {
        id: 25,
        term: "投票権",
        extra: "",
        answer: "とうひょうけん / Derecho de voto",
      },
      {
        id: 26,
        term: "贈る",
        extra: "",
        answer: "おくる、おくります / Regalar",
      },
      {
        id: 27,
        term: "練習",
        extra: "",
        answer: "れんしゅう / Practica, Entrenamiento",
      },
      {
        id: 28,
        term: "理由",
        extra: "",
        answer: "りゆう / Razon, Pretexto, Motivo",
      },
      { id: 29, term: "全部", extra: "", answer: "ぜんぶ / Todo" },
      { id: 30, term: "使う", extra: "", answer: "つかいます、つかう / Usar" },
      {
        id: 31,
        term: "習う",
        extra: "",
        answer:
          "ならいます、ならう / Aprender(de un profesor), Tomar clases en",
      },
      {
        id: 32,
        term: "漢字",
        extra: "",
        answer: "かんじ / Kanji, Caracter chino",
      },
      { id: 33, term: "読む", extra: "", answer: "よみます、よむ / Leer" },
      {
        id: 34,
        term: "方",
        extra: "",
        answer: "かた / Direccion, Persona, Manera",
      },
      {
        id: 35,
        term: "直す",
        extra: "",
        answer: "なおします、なおす / Reparar, Arreglar, Corregir",
      },
      {
        id: 36,
        term: "話す",
        extra: "",
        answer: "はなします、はなす / Hablar, Decir",
      },
      { id: 37, term: "書く", extra: "", answer: "かきます、かく / Escribir " },
      {
        id: 38,
        term: "描く",
        extra: "",
        answer: "かきます、かく / Dibujar, Pintar",
      },
      { id: 39, term: "短い", extra: "", answer: "みじかい / Corto" },
      {
        id: 40,
        term: "考える",
        extra: "",
        answer: "かんがえます、かんがえる / Pensar, Contemplar, Meditar",
      },
      { id: 41, term: "写真", extra: "", answer: "しゃしん / Foto" },
      { id: 42, term: "蝋", extra: "", answer: "ろう / Cera" },
      { id: 43, term: "必要", extra: "", answer: "ひつよう / Necesario" },
      {
        id: 45,
        term: "甘酸っぱい",
        extra: "",
        answer: "あまずっぱい / Agridulce",
      },
      { id: 46, term: "酢", extra: "", answer: "す / Vinagre" },
      { id: 47, term: "半分", extra: "", answer: "はんぶん / Mitad" },
      { id: 48, term: "野菜", extra: "", answer: "やさい / Vegetal" },
      {
        id: 49,
        term: "卵焼き",
        extra: "",
        answer: "たまごやき / Tamagoyaki, Omelette japones",
      },
      {
        id: 50,
        term: "取る",
        extra: "",
        answer: "とります、とる / Sacar, Remover",
      },
      {
        id: 51,
        term: "背わた",
        extra: "",
        answer: "せわた / Tracto digestivo del camaron",
      },
      {
        id: 52,
        term: "乗せる",
        extra: "",
        answer: "のせます、のせる / Poner algo en (algo)",
      },
      { id: 53, term: "最後", extra: "", answer: "さいご / Final, Conclusion" },
      { id: 54, term: "形", extra: "", answer: "かたち / Forma, Figura" },
      {
        id: 55,
        term: "巻く",
        extra: "",
        answer: "まきます、まく / Enrollar, Envolver",
      },
      { id: 56, term: "お祭り", extra: "", answer: "おまつり / Festival" },
      { id: 57, term: "人形", extra: "", answer: "にんぎょう / Muñeca" },
      { id: 58, term: "特別", extra: "", answer: "とくべつ / Especial" },
      {
        id: 59,
        term: "幸せ",
        extra: "",
        answer: "しあわせ / Felicidad, Buena suerte",
      },
      { id: 60, term: "祈る", extra: "", answer: "いのります、いのる / Rezar" },
      { id: 61, term: "季節", extra: "", answer: "きせつ / Estacion(del año)" },
      { id: 62, term: "桃", extra: "", answer: "もも / Durazno" },
      { id: 63, term: "肌", extra: "", answer: "はだ / Piel" },
      {
        id: 64,
        term: "お風呂",
        extra: "",
        answer: "おふろ / Ducha, Duchar, Lugar de ducha",
      },
      { id: 65, term: "浴槽", extra: "", answer: "よくそう / Bañera" },
    ],
  },
  {
    id: "6",
    name: "Clase 1 Extra",
    termList: [
      { id: 0, term: "こくさい", extra: "国際", answer: "Internacional" },
      {
        id: 1,
        term: "じょせい",
        extra: "女性",
        answer: "Mujer, Genero Femenino",
      },
      {
        id: 2,
        term: "だんせい",
        extra: "男性",
        answer: "Hombre, Genero Masculino",
      },
      { id: 3, term: "おおい", extra: "多い", answer: "Muchos, Numeroso" },
      {
        id: 4,
        term: "すすみます、すすむ",
        extra: "進む",
        answer: "Progresar, Avanzar",
      },
      {
        id: 5,
        term: "きょういく",
        extra: "教育",
        answer: "Educacion, Entrenamiento",
      },
      { id: 6, term: "うけます、うける", extra: "受ける", answer: "Recibir" },
      {
        id: 7,
        term: "あるべき",
        extra: "有るべき",
        answer: "Ideal, Deseable, La forma que algo deberia ser",
      },
      {
        id: 8,
        term: "ふえます、ふえる",
        extra: "増える",
        answer: "Incrementar, Multiplicar",
      },
      { id: 9, term: "ねん", extra: "年", answer: "Año" },
      {
        id: 10,
        term: "せかい",
        extra: "世界",
        answer: "El mundo, Sociedad, El Universo",
      },
      { id: 11, term: "はじめて", extra: "初めて", answer: "Por primera vez" },
      { id: 12, term: "せいじ", extra: "政治", answer: "Politica, Gobierno" },
      {
        id: 13,
        term: "みとめます、みとめる",
        extra: "認める",
        answer: "Permitir, Aprovar",
      },
      { id: 14, term: "だいとうりょう", extra: "大統領", answer: "Presidente" },
      { id: 15, term: "しゅじん", extra: "主人", answer: "Esposo" },
      { id: 16, term: "かない", extra: "家内", answer: "Esposa" },
      { id: 17, term: "あと", extra: "後", answer: "Atras, Despues" },
      { id: 18, term: "ようやく", extra: "漸く", answer: "Finalmente" },
      { id: 19, term: "くにぐに", extra: "国々", answer: "Paises" },
      {
        id: 20,
        term: "あつまります、あつまる",
        extra: "集まる",
        answer: "Juntarse",
      },
      { id: 21, term: "やくそく", extra: "約束", answer: "Promesa, Cita" },
      { id: 22, term: "やくそくする", extra: "約束する", answer: "Prometer" },
      { id: 23, term: "だい", extra: "第", answer: "Prefijo numero ordinal" },
      { id: 24, term: "しょう", extra: "賞", answer: "Premio" },
      {
        id: 25,
        term: "とくに",
        extra: "特に",
        answer: "En particular..., En especial...",
      },
      { id: 26, term: "しき", extra: "式", answer: "Ceremonia" },
      {
        id: 27,
        term: "おかなう",
        extra: "行う",
        answer: "Llevar a cabo, Hacer",
      },
      { id: 28, term: "えいが", extra: "映画", answer: "Pelicula" },
      { id: 29, term: "げんざい", extra: "現在", answer: "Ahora" },
      { id: 30, term: "さいご", extra: "最後", answer: "Ultimo" },
      { id: 31, term: "さいしょ", extra: "最初", answer: "Primero" },
    ],
  },
  {
    id: "7",
    name: "Clase 1 Extra Kanji",
    termList: [
      { id: 0, term: "国際", extra: "", answer: "こくさい / Internacional" },
      {
        id: 1,
        term: "女性",
        extra: "",
        answer: "じょせい / Mujer, Genero Femenino",
      },
      {
        id: 2,
        term: "男性",
        extra: "",
        answer: "だんせい / Hombre, Genero Masculino",
      },
      { id: 3, term: "多い", extra: "", answer: "おおい / Muchos, Numeroso" },
      {
        id: 4,
        term: "進む",
        extra: "",
        answer: "すすみます、すすむ / Progresar, Avanzar",
      },
      {
        id: 5,
        term: "教育",
        extra: "",
        answer: "きょういく / Educacion, Entrenamiento",
      },
      {
        id: 6,
        term: "受ける",
        extra: "",
        answer: "うけます、うける / Recibir",
      },
      {
        id: 7,
        term: "有るべき",
        extra: "",
        answer: "あるべき / Ideal, Deseable, La forma que algo deberia ser",
      },
      {
        id: 8,
        term: "増える",
        extra: "",
        answer: "ふえます、ふえる / Incrementar, Multiplicar",
      },
      { id: 9, term: "年", extra: "", answer: "ねん / Año" },
      {
        id: 10,
        term: "世界",
        extra: "",
        answer: "せかい / El mundo, Sociedad, El Universo",
      },
      {
        id: 11,
        term: "初めて",
        extra: "",
        answer: "はじめて / Por primera vez",
      },
      {
        id: 12,
        term: "政治",
        extra: "",
        answer: "せいじ / Politica, Gobierno",
      },
      {
        id: 13,
        term: "認める",
        extra: "",
        answer: "みとめます、みとめる / Permitir, Aprovar",
      },
      {
        id: 14,
        term: "大統領",
        extra: "",
        answer: "だいとうりょう / Presidente",
      },
      { id: 15, term: "主人", extra: "", answer: "しゅじん / Esposo" },
      { id: 16, term: "家内", extra: "", answer: "かない / Esposa" },
      { id: 17, term: "後", extra: "", answer: "あと / Atras, Despues" },
      { id: 18, term: "漸く", extra: "", answer: "ようやく / Finalmente" },
      { id: 19, term: "国々", extra: "", answer: "くにぐに / Paises" },
      {
        id: 20,
        term: "集まる",
        extra: "",
        answer: "あつまります、あつまる / Juntarse",
      },
      { id: 21, term: "約束", extra: "", answer: "やくそく / Promesa, Cita" },
      {
        id: 22,
        term: "約束する",
        extra: "",
        answer: "やくそくする / Prometer",
      },
      {
        id: 23,
        term: "第",
        extra: "",
        answer: "だい / Prefijo numero ordinal",
      },
      { id: 24, term: "賞", extra: "", answer: "しょう / Premio" },
      {
        id: 25,
        term: "特に",
        extra: "",
        answer: "とくに / En particular..., En especial...",
      },
      { id: 26, term: "式", extra: "", answer: "しき / Ceremonia" },
      {
        id: 27,
        term: "行う",
        extra: "",
        answer: "おかなう / Llevar a cabo, Hacer",
      },
      { id: 28, term: "映画", extra: "", answer: "えいが / Pelicula" },
      { id: 29, term: "現在", extra: "", answer: "げんざい / Ahora" },
      { id: 30, term: "最後", extra: "", answer: "さいご / Ultimo" },
      { id: 31, term: "最初", extra: "", answer: "さいしょ / Primero" },
    ],
  },
];

export { lectures, options };

//el localstorage es un objeto que en basado en keys guarda objetos
let local = {
  0: { 0: "learned", 1: "learning", 2: "", lastCheckout: "4/11/23" },
  1: { 0: "learned", 1: "learning", 2: "", lastCheckout: "No Checkout" },
};
