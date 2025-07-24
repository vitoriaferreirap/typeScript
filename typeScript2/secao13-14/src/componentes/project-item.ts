import { autobind } from '../decorators/autobind.js';
import { Draggable } from '../interfaces/drag-drop-interfaces.js';
import { Project } from '../models/project.js';
import { projectState } from '../state/project-state.js';
import Cpm from './base-components.js';

//ProjectItem Class
export class ProjectItem extends Cpm<HTMLUListElement, HTMLLIElement> implements Draggable {
        //propriedade para armazenar o projeto associado ao item
        private project: Project;

        //getters e setters são usados para acessar e modificar propriedades de forma controlada
        get persons() {
            if (this.project.people === 1) {
                return '1 Pessoa'; //se houver apenas uma pessoa, retorna no singular
            } else {
                return `${this.project.people} Pessoas`; //caso contrário, retorna no plural
            }
        }


        constructor(hostId: string, project: Project) {
            super('single-project', hostId, false, project.id); //chama o construtor da classe base Component
            this.project = project;

            this.configure();
            this.renderContent();
        }
        @autobind
        dragStartHandler(event: DragEvent) {
            event.dataTransfer!.setData('text/plain', this.project.id);
            event.dataTransfer!.effectAllowed = 'move';
        }
        dragEndHandler(_: DragEvent): void {
        
        }

        configure() {
            //adiciona ouvintes de eventos para arrastar e soltar
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);

            //adiciona ouvinte para o botão de excluir
            const deleteBtn = this.element.querySelector('button:last-of-type')!;
            deleteBtn.addEventListener('click', this.deleteProjectHandler.bind(this, this.project.id));
        }

        renderContent() {
            this.element.querySelector('h2')!.textContent = this.project.title;
            this.element.querySelector('h3')!.textContent = this.persons + ' Atribuída'; //chama o getter people para obter o texto correto
            this.element.querySelector('p')!.textContent = this.project.description;
        }

        private deleteProjectHandler(projectId: string) {
            projectState.deleteProject(projectId);
        }
}
