function gerar(e) {
  N = sanitizeInput(e.target["N"].value);
  T = sanitizeInput(e.target["T"].value);
  P = sanitizeInput(e.target["P"].value);
  S = sanitizeInput(e.target["S"].value);

  const conjuntos = {
    N: N,
    T: T,
    P: P,
    S: S,
  };

  gerarLinguagem(conjuntos);

  return false;
}

function gerarLinguagem(conjuntos) {
  const saida = [];
  const pilha = new Pilha();
  conjuntoAdicionar = pickConjunto(conjuntos);
  if (conjuntoAdicionar === null) {
    printToTextBox("Todos os conjuntos estão vazios");
    return false;
  }
  pilha.adicionar(pickRandom(conjuntos[conjuntoAdicionar]));
  while (!pilha.estaVazia()) {
    const topo = pilha.remover();
    if (topo === "ɛ") {
      break;
    }
    if (conjuntos[topo] === undefined) {
      saida.push(topo);
      continue;
    }
    pilha.adicionar(pickRandom(conjuntos[topo]));
  }

  printToTextBox(saida.join(""));
}

function pickConjunto(conjuntos) {
  for (const conjunto in conjuntos) {
    if (conjuntos[conjunto].length > 0) {
      return conjunto;
    }
  }
  return null;
}

function printToTextBox(content) {
  const textbox = document.querySelector("#result");
  textbox.value = content;
}

function sanitizeInput(input) {
  if (input === undefined || input === null || input === "") {
    return [];
  }
  const sanitized = input.split("|").map((item) => item.trim());
  return sanitized;
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

class Pilha {
  items = [];

  constructor() {
    this.items = [];
  }

  adicionar(item) {
    if (item === undefined || item === null) {
      alert("Item não pode ser nulo ou indefinido");
      return;
    }
    if (Array.isArray(item)) {
      alert("Item não pode ser um array");
      return;
    }
    let amount = 1;
    const beforeCount = this.items.length;
    while (item.length > 0) {
      const length = item.length - amount;
      this.items.push(item[length]);
      item = item.slice(0, length);
    }

    return this.items.length - beforeCount;
  }

  remover() {
    return this.items.pop();
  }

  verTopo() {
    return this.items[this.items.length - 1];
  }

  estaVazia() {
    return this.items.length === 0;
  }

  tamanho() {
    return this.items.length;
  }

  toString() {
    return this.items.toString();
  }

  print() {
    result = this.items.map((item, index) =>
      index === this.items.length - 1 ? item : ", " + item
    );
    result.reverse();
    return result.join("");
  }
}

function carregarExemplo() {
  const selected = document.querySelector("#exemploSelect").value;
  const inputN = document.querySelector("#N");
  const inputT = document.querySelector("#T");
  const inputP = document.querySelector("#P");
  const inputS = document.querySelector("#S");

  const exemplos = {
    1: {
      N: "aT",
      T: "bP | ɛ",
      P: "cS",
      S: "d",
    },
    2: {
      N: "aT | b",
      T: "bP | N",
      P: "cS | bS",
      S: "d | S",
    },
    3: {
      N: "",
      T: "",
      P: "",
      S: "aSb | ab",
    },
  };

  const exemplo = exemplos[selected];
  inputN.value = exemplo.N;
  inputT.value = exemplo.T;
  inputP.value = exemplo.P;
  inputS.value = exemplo.S;
}
