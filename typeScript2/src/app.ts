/**
 * O código TypeScript (app.ts), depois de compilado para JavaScript (app.js),
 *  é responsável por pegar o conteúdo do template e inserir na página 
 */

//acessar formulario.html
class ProjectInput{
    //Template é um elemento HTML que serve como modelo para criar novos elementos.
    //acessar o template e o host
    templateElement: HTMLTemplateElement; 
    hostElement: HTMLDivElement;
    element: HTMLFormElement;

    //acessar o elemento do template
    constructor() {
        // ! as HTMLTemplateElement é uma asserção de tipo que diz ao TypeScript que o elemento não será nulo
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        //content : acessa o conteúdo do template. 
        const importeNode = document.importNode(this.templateElement.content, true);
        this.element = importeNode.firstElementChild as HTMLFormElement; // pega o primeiro elemento filho do template
        this.attach();
    }

        private attach() {
            this.hostElement.insertAdjacentElement('afterbegin', this.element);
        }

}

//instanciar a classe 
const prjInput = new ProjectInput();