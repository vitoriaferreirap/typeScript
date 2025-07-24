/// <reference path="models/project.ts" />
/// <reference path="interfaces/drag-drop.ts" />
/// <reference path="decorators/autobind.ts" />
/// <reference path="state/project-state.ts" />
/// <reference path="util/validation.ts" />
/// <reference path="componentes/base-components.ts" />
/// <reference path="componentes/project-input.ts" />
/// <reference path="componentes/project-item.ts" />
/// <reference path="componentes/project-list.ts" />



namespace App {

//instanciando um novo objeto em cima da classe
new ProjectInput();
new ProjectList('active'); //instanciar a lista de projetos ativos
new ProjectList('finished'); //instanciar a lista de projetos finalizados
}

