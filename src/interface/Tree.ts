import { QueueChildrens } from "../service/QueueChildrens";
import { QueueParents } from "../service/QueueParents";

export namespace Tree {
    export interface ItemI {
        id: number,
        parent: number | string,
        type?: any,
    }
    
    export interface TreeStoreI {
        /** Список всех элементов */
        items: ItemI[];

        /** Древовидные структуры */
        /** Список элементов по их идентификаторам */
        treeItemsById: Record<number | string, Tree.ItemI>;
        /** Связи элементов с их непосредственными дочерними узлами */
        treeChildrensByParentId: Record<number | string, Tree.ItemI[]>;
        /** Связи элементов с иерархией всех родительских узлов */
        treeAllParentsByItemId: Record<number | string, Tree.ItemI[]>;
        /** Связи элементов с иерархией всех вложенных дочерних узлов */
        treeAllChildrensByItemId: Record<number | string, Tree.ItemI[]>;
        /** Экземпляры вспомогательных сервисов для обхода графов */
        queueParents: QueueParents;
        queueChildrens: QueueChildrens;
    
        getAll: () => ItemI[];
        getItem: (itemId: number | string) => ItemI;
        getChildren: (parentId: number | string) => ItemI[];
        getAllChildren: (parentId: number | string) => ItemI[];
        getAllParents: (itemId: number | string) => ItemI[];
    }

    export interface QueueI {
        /** Получить из очереди первый узел */
        getFirstItemFromQueue: () => ItemI;
        /** Проверка на пустоту очереди */
        isQueueNotEmpty: () => boolean;
    }

    export interface QueueChildrensI {
        queueChildrens: ItemI[];
        /** Добавить в конец очереди список дочерних узлов */
        addInQueue: (items: ItemI[]) => void;
    }

    export interface QueueParentsI {
        queueParents: ItemI[];
        /** Добавить в очередь родительский узел */
        addInQueue: (item: ItemI) => void;
    }
}

