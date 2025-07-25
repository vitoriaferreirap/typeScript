//Drag  & Drop Interfaces - arrastar e soltar

export interface Draggable {
    dragStartHandler(event: DragEvent): void; //método para iniciar o arrasto
    dragEndHandler(event: DragEvent): void; //método para finalizar o arrasto
}
export interface DragTarget {
    dragOverHandler(event: DragEvent): void; //método para lidar com o evento de arrastar sobre o alvo
    dropHandler(event: DragEvent): void; //método para lidar com o evento de soltar no alvo
    dragLeaveHandler(event: DragEvent): void; //método para lidar com o evento de sair do alvo
}
    



