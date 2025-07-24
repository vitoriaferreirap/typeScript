//Project Type
enum ProjectStatus {
    Active,
    Finished
}

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {}
}

//Project state management

//listener personalizado
type Listener<T> = (items: T[]) => void;

class State<T> {
    //protected - acesse classes que herdam State
    protected listeners: Listener<T>[] = []; //array para armazenar os ouvintes

     addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn); //adiciona o ouvinte ao array de ouvintes
    }
}

class ProjectState  extends State<Project> {
    private projects: Project[] = []; //array para armazenar os projetos
    private static instance: ProjectState; //variável para armazenar a instância única da classe

    private constructor() {
        super();
    }

    //método para obter a instância única da classe
    static getInstance() {
        if (this.instance) {
            return this.instance; //retorna a instância existente se já foi criada
        }
        this.instance = new ProjectState(); //cria uma nova instância se não existir (nova lista de projetos)
        return this.instance;
    }

    //projeto inicia ativo
    addProject(title: string, description: string, numOfPeople: number) {
         // Verifica se já existe um projeto com o mesmo título e descrição
        const exists = this.projects.some(
        prj => prj.title === title && prj.description === description
    );
        if (exists) {
            alert('Já existe um projeto com esse título e descrição!');
        return;
    }

        
        const newProject = new Project(
            Math.random().toString(), //random = gera um id aleatório para o projeto
            title,
            description,
            numOfPeople,
            ProjectStatus.Active //status do projeto inicia como ativo
        );
    
        this.projects.push(newProject); //adiciona o novo projeto ao array de projetos
        //percorrer todos os ouvintes e chamar a função de callback para notificar sobre o novo projeto
        for (const listener of this.listeners) {
            listener(this.projects.slice()); //passa uma cópia da lista de projetos para o ouvinte
        }
    }
}

//instancia um obj de estado que sera usado para gerenciar os projetos
const projectState = ProjectState.getInstance();

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

//Component Base Class - define estrutura básica para componentes
//class abstrata - base para herança para outros componentes
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;// T é o tipo do elemento host (HTMLDivElement)

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;

        //aplicando operação ternária
        this.element.id = newElementId ? newElementId : ''; //se newElementId for fornecido, define o id do elemento, caso contrário, deixa vazio
    
        this.attach(insertAtStart); //anexa o elemento ao hostElement


    }   
    //método para anexar o elemento ao hostElement
    private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element); //anexa o elemento ao hostElement
    }
  
    //métodos abstratos são definidos na classe base e devem ser implementados nas classes filhas
    abstract configure(): void;
    abstract renderContent(): void; 
}

//ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement> {

    assignedProjects: Project[]; //array para armazenar os projetos atribuídos à lista (active ou finished)

    constructor(private type: 'active' | 'finished') {

        //super = chama o construtor da classe base Component
        super('project-list', 'app', false, `${type}-projects`); 
        this.assignedProjects = []; //inicializa o array de projetos atribuídos
        
        this.configure(); //chama o método de configuração para adicionar ouvintes e renderizar os projetos
       
        this.renderContent(); 
        
    }

       //método para configurar o componente (Usado para resolver problemas de contexto)
    configure() {
         //ADD OUVINTE ao estado do projeto para atualizar a lista quando um novo projeto for adicionado
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
                if(this.type === 'active') {
                    return prj.status === ProjectStatus.Active; //filtra os projetos ativos
                }                       
                return prj.status === ProjectStatus.Finished; //filtra os projetos finalizados
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects(); //chama o método para renderizar os projetos atribuídos
        });
        
     }
    //método para renderizar o conteúdo do template de lista de projetos
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId; //define o id da lista dentro do elemento
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase()
        + ' PROJECTS'; //define o texto do título com base no tipo (active ou finished)
    }

    //método para renderizar a lista de projetos atribuídos
    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = ''; //limpa a lista antes de renderizar os projetos
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement('li'); //cria um novo item de lista
            listItem.textContent = prjItem.title; //define o texto do item de lista como o título do projeto
            listEl.appendChild(listItem); //adiciona o item de lista à lista
        }
    }
}

//ProjectInput Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

//instanciando um novo objeto em cima da classe
const prjInput = new ProjectInput();
const activeProjectList = new ProjectList('active'); //instanciar a lista de projetos ativos
const finishedProjectList = new ProjectList('finished'); //instanciar a lista de projetos finalizados