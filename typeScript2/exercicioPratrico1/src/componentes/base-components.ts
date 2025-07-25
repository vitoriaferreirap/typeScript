//Component Base Class - define estrutura básica para componentes
//class abstrata - base para herança para outros componentes

export const something = '...';

export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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

