class IntegerSet{

    constructor(maxNumber){
        this.maxNumber = maxNumber;
        this.elements = new Array(maxNumber + 1).fill(false);
    }

    inserir(num){
        this._validaNum(num);
        this.elements[num] = true;
    }

    remover(num){
        this._validaNum(num);
        this.elements[num] = false;
    }

    pertence(num){
        this._validaNum(num);
        return this.elements[num];
    }   

    união(outroConjunto){
        this._validaConjunto(outroConjunto);
        const novoConjunto = new IntegerSet(this.maxNumber);
        for(let i = 0; i <= this.maxNumber; i++){
            novoConjunto.elements[i] = this.elements[i] || outroConjunto.elements[i];
        }
        return novoConjunto;
    }

    intersecção(outroConjunto){
        this._validaConjunto(outroConjunto);
        const novoConjunto = new IntegerSet(this.maxNumber);
        for(let i = 0; i <= this.maxNumber; i++){
            novoConjunto.elements[i] = this.elements[i] && outroConjunto.elements[i];
        }
        return novoConjunto;
    }

    diferença(outroConjunto){
        this._validaConjunto(outroConjunto);
        const novoConjunto = new IntegerSet(this.maxNumber);
        for(let i = 0; i <= this.maxNumber; i++){
            novoConjunto.elements[i] = this.elements[i] && !outroConjunto.elements[i];
        }
        return novoConjunto;
    }

    toString(){
        const elements = [];
        for(let i = 0; i < this.maxNumber; i++){

            if (this.elements[i]){
                elements.push(i)
            }
        }
        return elements.length > 0 ? `{${elements.join(', ')}}` : '{}';
    }

    // prefixo _ indica métodos privados 
    _validaNum(num){
        if(num < 0 || num > this.maxNumber || !Number.isInteger(num)){
            throw new Error(`Número inválido: ${num}. O número deve estar entre 0 e ${this.maxNumber}.`);
        }
    }

    _validaConjunto(outroConjunto){
        if(this.maxNumber !== outroConjunto.maxNumber){
            throw new Error(`Os conjuntos não têm o mesmo tamanho: ${this.maxNumber} e ${outroConjunto.maxNumber}.`);
        }
    }
}

// aplacação de teste
function testeIntegerSet(){
    console.log('=== Teste IntegerSet ===');

    // Criação de dois conjuntos inteiros
    const setA = new IntegerSet(10);
    const setB = new IntegerSet(10);

    setA.inserir(1);
    setA.inserir(3);
    setA.inserir(5);
    setA.inserir(7);
    
    setB.inserir(2);
    setB.inserir(3);
    setB.inserir(5);
    setB.inserir(4);
    setB.inserir(8);


    console.log('Conjunto A:', setA.toString());
    console.log('Conjunto B:', setB.toString());

    //operações
    console.log('A União B:', setA.união(setB).toString());
    console.log('A Interseção B:', setA.intersecção(setB).toString());
    console.log('Diferença A - B:', setA.diferença(setB).toString());

    //remover elemento
    setA.remover(3);
    console.log('Conjunto A após remover 3:', setA.toString());

    //pertence
    console.log('O número 3 pertence ao conjunto A?', setA.pertence(3));
    console.log('O número 2 pertence ao conjunto B?', setB.pertence(2));

}

testeIntegerSet();