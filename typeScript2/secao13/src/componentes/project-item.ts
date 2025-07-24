/// <reference path="base-components.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../interfaces/drag-drop.ts" />

namespace App {
//ProjectItem Class
 export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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
        dragStartHandler(event: DragEvent): void {
            event.dataTransfer!.setData('text/plain', this.project.id);//define o id do projeto arrastado como dado transferido
            event.dataTransfer!.effectAllowed = 'move'; //define o efeito permitido para o arrasto
        }
        dragEndHandler(_: DragEvent): void {
        
        }

        configure() {
            //adiciona ouvintes de eventos para arrastar e soltar
            this.element.addEventListener('dragstart', (event: DragEvent) => {
                this.dragStartHandler(event);
            });
            this.element.addEventListener('dragend', (event: DragEvent) => {
                this.dragEndHandler(event);
            });

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
}