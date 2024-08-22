class Pilha{

    items = [];

    constructor()
    {
        this.items = [];
    }

    adicionar(item){
        let amount = 1;
        const beforeCount = this.items.length;
        while(item.length > 0){
            this.items.push(item.slice(item.length - amount))
        }

        return this.items.length - beforeCount;
    }

    remover(){
        return this.items.pop();
    }

    verTopo(){
        return this.items[this.items.length - 1];
    }

    estaVazia(){
        return this.items.length === 0;
    }

    tamanho(){
        return this.items.length;
    }

    toString(){
        return this.items.toString();
    }

    print(){
        console.log(this.items.toString());
    }

}

export default Pilha;