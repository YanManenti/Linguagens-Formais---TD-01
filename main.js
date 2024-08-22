import Pilha from "./stack.js";

function gerar(e){
    e.preventDefault();
    console.log(e);

    const pilha = new Pilha();
    pilha.adicionar("skibidi");
    
    printToTextBox(pilha.print());

    return false;
}

function printToTextBox(content){
    const textbox = document.querySelector("#id");
    textbox.value = content;

}