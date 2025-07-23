//Validation usando interfaces
//A interface Validatable define as regras de validação que podem ser aplicadas a diferentes tipos de dados.
//Ela pode ser usada para validar strings, números ou outros tipos de dados que atendam aos critérios especificados.
interface Validatable { 
    value: string | number; //pode ser string ou number
    required?: boolean; 
    minLength?: number; 
    maxLength?: number; 
    min?: number; 
    max?: number; 
}
//fuction de validação que usará a interface Validatable para validar os dados de entrada.
function validate(validatableInput: Validatable) {
    let isValid = true; //variável para armazenar o resultado da validação

    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0; //verifica se o valor é obrigatório e não está vazio
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength; //verifica se o valor atende ao comprimento mínimo
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength; //verifica se o valor atende ao comprimento máximo
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min; //verifica se o valor é maior ou igual ao mínimo
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max; //verifica se o valor é menor ou igual ao máximo
    }

    return isValid; //retorna o resultado da validação
}




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

//ProjectList Class
class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;

    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`; //define o id do elemento com base no tipo (active ou finished)

        this.attach();
        this.renderContent(); 
        
    }

    //método para renderizar o conteúdo do template de lista de projetos
    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId; //define o id da lista dentro do elemento
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase()
        + ' PROJECTS'; //define o texto do título com base no tipo (active ou finished)
    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
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

    //método para anexar e manipular elementos ao template


    //metodo que sera validado os dados de entrada do usuário
    //retorna uma tupla com os valores de entrada do usuário
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        //validar os dados de entrada usando a função validate
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
            minLength: 5
        };

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };

        const peopleValidatable: Validatable = {
            value: +enteredPeople, //converter para número
            required: true,
            min: 1,
            max: 5
        };

        if (!validate(titleValidatable) || !validate(descriptionValidatable) ||!validate(peopleValidatable)) {
            alert('Invalid input, please try again!'); //alerta se os dados de entrada não forem válidos
            return; //retorna undefined se a validação falhar
        }else {
            //retorna uma tupla com os valores de entrada do usuário
            return [enteredTitle, enteredDescription, +enteredPeople]; //converter para número
        }


    }

    //método para configurar o evento de submit
    @autobind //decorator para vincular o contexto de 'this' ao método
    private submitHandler(event: Event) {
        event.preventDefault(); //previne o comportamento padrão do formulário de recarregar a página
        const userInput = this.gatherUserInput(); //chama o método para obter os dados de entrada do usuário
        
        // Tupla : tipo de array com quantidade fixa de elementos e tipos específicos
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title);
            console.log(description);
            console.log(people);
        }
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
const activeProjectList = new ProjectList('active'); //instanciar a lista de projetos ativos
const finishedProjectList = new ProjectList('finished'); //instanciar a lista de projetos finalizados