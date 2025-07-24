import { autobind } from '../decorators/autobind.js';
import { DragTarget } from '../interfaces/drag-drop-interfaces.js';
import { Project, ProjectStatus } from '../models/project.js';
import { projectState } from '../state/project-state.js';
import Cpm from './base-components.js';
import { ProjectItem } from './project-item.js';

type ProjectListType = 'active' | 'finished';
    //ProjectList Class
export class ProjectList extends Cpm<HTMLDivElement, HTMLElement> implements DragTarget {
    type: ProjectListType;
    assignedProjects: Project[];

    constructor(type: ProjectListType) {
         console.log('Criando ProjectList do tipo:', type);
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    //método para lidar com o evento de arrastar sobre o alvo
    @autobind //decorator para vincular o contexto de 'this' ao método
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault(); //previne o comportamento padrão do navegador ao arrastar sobre o alvo
            const listEl = this.element.querySelector('ul')!; //seleciona a lista dentro do elemento
            listEl.classList.add('droppable'); //adiciona a classe 'droppable' para indicar que o alvo está pronto para receber o item arrastado
        }
    }
    //método para lidar com o evento de soltar no alvo
   dropHandler(event: DragEvent) {
    event.preventDefault();
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
    prjId,
    this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    );
}

    // método para lidar com o evento de sair do alvo
    @autobind
    dragLeaveHandler(_: DragEvent): void {
        const listEl = this.element.querySelector('ul')!; //seleciona a lista dentro do elemento
        listEl.classList.remove('droppable'); //remove a classe 'droppable' para indicar que o alvo não está mais pronto para receber o item arrastado
     }

    //método para configurar o componente (Usado para resolver problemas de contexto)
    configure() {

        this.element.addEventListener('dragover', this.dragOverHandler); //adiciona ouvinte para o evento de arrastar sobre o alvo
        this.element.addEventListener('dragleave', this.dragLeaveHandler); //adiciona ouvinte para o evento de sair do alvo
        this.element.addEventListener('drop', this.dropHandler); //adiciona ouvinte para o evento de soltar no alvo
        

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
           new ProjectItem(listEl.id, prjItem); //cria um novo item de projeto para cada projeto atribuído
        }
    }
}

