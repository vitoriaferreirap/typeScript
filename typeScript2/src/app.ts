/**
 * O código TypeScript (app.ts), depois de compilado para JavaScript (app.js),
 *  é responsável por pegar o conteúdo do template e inserir na página 
 */

//acessar formulario.html
class ProjectInput{
    //Template é um elemento HTML que serve como modelo para criar novos elementos.
    //acessar o template e o (host - local onde o template será inserido)
    templateElement: HTMLTemplateElement; 
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    //acessar o elemento do template
    constructor() {
        // ! as HTMLTemplateElement é uma asserção de tipo que diz ao TypeScript que o elemento não será nulo
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        //content : acessa o conteúdo do template. 
        const importeNode = document.importNode(this.templateElement.content, true);
        this.element = importeNode.firstElementChild as HTMLFormElement; // pega o primeiro elemento filho do template
        //adicionar um id ao elemento
        this.element.id = 'user-input';

        
        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
        this.attach();
    }

    //método para anexar o elemento ao template

    //método para configurar o evento de submit
    private submitHandler(event: Event) {
        event.preventDefault(); //previne o comportamento padrão do formulário de recarregar a página
        console.log(this.titleInputElement.value);
        console.log(this.descriptionInputElement.value);
        console.log(this.peopleInputElement.value);
    }
    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));//
    }
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }

}

//instanciar a classe 
const prjInput = new ProjectInput();