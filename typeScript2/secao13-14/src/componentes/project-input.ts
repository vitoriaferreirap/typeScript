import { autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';
import * as Validatable from '../util/validation.js';
import Cpm from './base-components.js';

//ProjectInput Class
export class ProjectInput extends Cpm<HTMLDivElement, HTMLFormElement> {
    /**
 * O código TypeScript (app.ts), depois de compilado para JavaScript (app.js),
 * é responsável por pegar o conteúdo do template e inserir na página. TONANDO VISIVEL
 * Template é um elemento HTML que serve como modelo para criar novos elementos.
 * Acessar o template e o (host - local onde o template será inserido)
 */
  
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    //acessar o elemento do template
    constructor() {
        super('project-input', 'app', true, 'user-input'); //chama o construtor da classe base Component

        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;
     
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() {
        //não é necessário implementar este método, pois não há conteúdo a ser renderizado no template de entrada
    }

    //métodos para anexar e manipular elementos ao template


    //metodo que sera validado os dados de entrada do usuário
    //retorna uma tupla com os valores de entrada do usuário
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        //validar os dados de entrada usando a função validate
        const titleValidatable: Validatable.Validatable = {
            value: enteredTitle,
            required: true,
            minLength: 5
        };

        const descriptionValidatable: Validatable.Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };

        const peopleValidatable: Validatable.Validatable = {
            value: +enteredPeople, //converter para número
            required: true,
            min: 1,
            max: 5
        };

        if (!Validatable.validate(titleValidatable) || !Validatable.validate(descriptionValidatable) ||!Validatable.validate(peopleValidatable)) {
            alert('Invalid input, please try again!'); //alerta se os dados de entrada não forem válidos
            return; //retorna undefined se a validação falhar   
        }else {
            //retorna uma tupla com os valores de entrada do usuário
            return [enteredTitle, enteredDescription, +enteredPeople]; //converter para número
        }


    }

     private clearInputs() {
        this.titleInputElement.value = ''; //limpa o campo de título
        this.descriptionInputElement.value = ''; 
        this.peopleInputElement.value = ''; //limpa o campo de número de pessoas
    }

    //método para configurar o evento de submit
    @autobind //decorator para vincular o contexto de 'this' ao método
    private submitHandler(event: Event) {
        event.preventDefault(); //previne o comportamento padrão do formulário de recarregar a página
        const userInput = this.gatherUserInput(); //chama o método para obter os dados de entrada do usuário
        
        // Tupla : tipo de array com quantidade fixa de elementos e tipos específicos
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people); //adiciona o projeto ao estado global
            this.clearInputs(); //limpa os campos de entrada após a validação bem-sucedida
        }
    }
    
}
