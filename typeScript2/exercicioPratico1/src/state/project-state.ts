import { Project, ProjectStatus } from '../models/project.js';

//listener personalizado
type Listener<T> = (items: T[]) => void;

export class State<T> {
    //protected - acesse classes que herdam State
    protected listeners: Listener<T>[] = []; //array para armazenar os ouvintes

     addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn); //adiciona o ouvinte ao array de ouvintes
    }
}

export class ProjectState  extends State<Project> {
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
        this.updateListeners(); //chama o método para atualizar os ouvintes com a lista atualizada de projetos
    }

    //método para mover um projeto de status (active ou finished)
    //recebe o id do projeto e o novo status    git push
 moveProject(projectId: string, newStatus: ProjectStatus) {
    console.log('moveProject chamado com:', projectId, newStatus, this.projects.map(p => p.id));
    const project = this.projects.find(prj => prj.id === projectId);
    if (project && project.status !== newStatus) {
        project.status = newStatus;
        console.log('Status alterado:', project);
        this.updateListeners();
    } else {
        console.log('Não alterou:', project, newStatus);
    }
}
    private updateListeners() {
        //percorrer todos os ouvintes e chamar a função de callback para notificar sobre o novo projeto
        for (const listener of this.listeners) {
            listener(this.projects.slice()); //passa uma cópia da lista de projetos para o ouvinte
        }
    }

    //deletar um projeto
    deleteProject(projectId: string) {
        this.projects = this.projects.filter(prj => prj.id !== projectId);
        //percorrer todos os ouvintes e chamar a função de callback para notificar sobre a lista atualizada de projetos
        for (const listener of this.listeners) {
            listener(this.projects.slice()); //passa uma cópia da lista de projetos para o ouvinte
        }
    }

}

//instancia um obj de estado que sera usado para gerenciar os projetos
export const projectState = ProjectState.getInstance();
