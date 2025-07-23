//Tipos em TS , descrevem a estrutura de um objeto ou função
type FileData = {
    path: string;
    content: 'admin';
}

/**
 * const arquivo: FileData = {
 *   path: '/admin',
 *   content: 'admin'
 * };
 * 
 * Exemplo de objeto baseado no tipo FileData
 */

type DatabaseData = {
    connectionUrl: string;
    credentials: 'user';
}
type Status = {
    isConnected: boolean;
    errorMessage?: string;
}

//intersection de tipos 
type AccessedFileData = FileData & Status;
type AccessedDatabaseData = DatabaseData & Status;

