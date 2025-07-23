//autobind decorator
/**
 * Decorator criado para vincular o contexto de 'this' ao método,
 * garantindo que o método seja chamado com o contexto correto.
 * Isso é útil quando o método é passado como callback,
 * como no caso do evento de submit do formulário.
 */

function autobind(
    _: any,
    _2: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjustedDescriptor;
}


//ProjectInput Class
class ProjectInput{
    /**
 * O código TypeScript (app.ts), depois de compilado para JavaScript (app.js),
 * é responsável por pegar o conteúdo do template e inserir na página. TONANDO VISIVEL
 * Template é um elemento HTML que serve como modelo para criar novos elementos.
 * Acessar o template e o (host - local onde o template será inserido)
 */
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
    @autobind //decorator para vincular o contexto de 'this' ao método
    private submitHandler(event: Event) {
        event.preventDefault(); //previne o comportamento padrão do formulário de recarregar a página
        console.log(this.titleInputElement.value);
        console.log(this.descriptionInputElement.value);
        console.log(this.peopleInputElement.value);
    }
    private configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }

}

//instanciar a classe 
const prjInput = new ProjectInput();