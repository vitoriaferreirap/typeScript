"use strict";
//listas vinculadas
//1NÓ
class ListNode {
    value;
    next;
    constructor(value) {
        this.value = value;
    }
}
//<T> Permite receber qualquer tipo de dado ao criar um obj
class LinkedList {
    root; // propriedade opcional  Nó inicial
    tail; // Nó final (opcional)
    length = 0;
    add(value) {
        const node = new ListNode(value);
        // Verifica se a lista está vazia
        if (!this.root || !this.tail) {
            this.root = node;
            this.tail = node; // Se a lista está vazia, o nó inicial é também o nó final
        }
        else {
            this.tail.next = node; // Conecta o nó final atual ao novo nó
            this.tail = node; // Atualiza o nó final
        }
        this.length++; // Incrementa o tamanho da lista
    }
    getNumberOfElements() {
        return this.length; // Retorna o número de elementos na lista
    }
    print() {
        let current = this.root;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }
}
//instanciando um novo objeto da classe LinkedList
const numberList = new LinkedList();
numberList.add(1);
numberList.add(2);
numberList.add(3);
console.log(numberList.getNumberOfElements()); // 3
numberList.print(); // 1, 2, 3
const nameList = new LinkedList();
