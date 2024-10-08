function gerar(e) {
  const conjuntos = {};
  const nodeArray = document.querySelectorAll(".nomeInput");
  //Pega todos os ids dos inputs de nome.
  const idArray = Array.from(nodeArray).map((node) => node.id);
  idArray.forEach((id) => {
    //Pega o valor do input de nome.
    const nome = document.getElementById(id).value;
    const conjuntoId = id.replace("nameInput", "conjuntoInput");
    //Pega o valor do input de conjunto.
    const conjuntoValue = document.getElementById(conjuntoId).value;
    //Adiciona o nome e o conjunto ao objeto conjuntos.
    conjuntos[nome] = sanitizeInput(conjuntoValue);
  });

  //Gera a linguagem.
  gerarLinguagem(conjuntos);

  return false;
}

function adicionarInput() {
  let newId = 0;
  const lastInput = getLastInput();
  const container = document.getElementById("formulario");
  const wrapper = document.createElement("div");
  wrapper.className = "inputWrapper";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Nome...";
  nameInput.className = "nomeInput";
  if (lastInput !== null) {
    newId = parseInt(lastInput.id.replace("nameInput", "")) + 1;
  }
  nameInput.id = "nameInput" + newId;
  const conjuntoInput = document.createElement("input");
  conjuntoInput.type = "text";
  conjuntoInput.placeholder = "Conjunto...";
  conjuntoInput.className = "conjuntoInput";
  conjuntoInput.id = "conjuntoInput" + newId;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.innerHTML = "X";
  removeButton.onclick = () => {
    wrapper.remove();
  };
  removeButton.className = "remover";

  wrapper.appendChild(nameInput);
  wrapper.appendChild(conjuntoInput);
  wrapper.appendChild(removeButton);
  container.appendChild(wrapper);
}

function getLastInput() {
  const inputs = document.querySelectorAll(".nomeInput");
  if (inputs.length === 0) {
    return null;
  }
  return inputs[inputs.length - 1];
}

function gerarLinguagem(conjuntos) {
  const saida = [];
  const pilha = new Pilha();
  conjuntoAdicionar = pickConjunto(conjuntos);
  if (conjuntoAdicionar === null) {
    printToTextBox("Todos os conjuntos estão vazios");
    return false;
  }
  //Adiciona o conjunto inicial na pilha.
  pilha.adicionar(pickRandom(conjuntos[conjuntoAdicionar]));

  //Enquanto a pilha não estiver vazia, remove o topo.
  //Se for ɛ, sai do loop.
  //Se for um terminal(não está no objeto conjuntos), adiciona à saida e continua.
  //Se for um não-terminal, adiciona um item aleatório do conjunto que corresponde ao não-terminal.
  //Repete até o conjunto estar vazio, então sai do loop.
  //Junta o array de saida em uma string e imprime no textbox.
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
  //Pega o primeiro conjunto que não está vazio ou retorna null.
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
  //Remove espaços em branco e separa os itens por "|".
  const sanitized = input.split("|").map((item) => item.trim());
  return sanitized;
}

function pickRandom(array) {
  //Retorna um item aleatório do array usando seu tamanho.
  return array[Math.floor(Math.random() * array.length)];
}

class Pilha {
  items = [];

  constructor() {
    this.items = [];
  }

  //Única diferença é que os items são adicionados em ordem reversa(chamada .reverse())
  //para o item mais a esquerda ficar no topo.
  adicionar(item) {
    if (item === undefined || item === null) {
      alert("Item não pode ser nulo ou indefinido");
      return;
    }
    if (Array.isArray(item)) {
      alert("Item não pode ser um array");
      return;
    }
    const beforeCount = this.items.length;
    item
      .split("")
      .reverse()
      .forEach((char) => {
        this.items.push(char);
      });
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
    return result.join("");
  }
}

function carregarExemplo() {
  const selected = document.querySelector("#exemploSelect").value;

  const formulario = document.getElementById("formulario");
  if (formulario.children.length > 0) {
    formulario.innerHTML = "";
    if (selected === "0") {
      return;
    }
  }
  adicionarInput();
  adicionarInput();
  adicionarInput();
  adicionarInput();
  const inputName1 = document.querySelector("#nameInput0");
  const inputName2 = document.querySelector("#nameInput1");
  const inputName3 = document.querySelector("#nameInput2");
  const inputName4 = document.querySelector("#nameInput3");
  const inputConjunto1 = document.querySelector("#conjuntoInput0");
  const inputConjunto2 = document.querySelector("#conjuntoInput1");
  const inputConjunto3 = document.querySelector("#conjuntoInput2");
  const inputConjunto4 = document.querySelector("#conjuntoInput3");

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
  inputName1.value = "N";
  inputName2.value = "T";
  inputName3.value = "P";
  inputName4.value = "S";
  inputConjunto1.value = exemplo.N;
  inputConjunto2.value = exemplo.T;
  inputConjunto3.value = exemplo.P;
  inputConjunto4.value = exemplo.S;
}
