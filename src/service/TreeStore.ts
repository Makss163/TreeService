import { Tree } from "../interface/Tree";
import { QueueChildrens } from "./QueueChildrens";
import { QueueParents } from "./QueueParents";

export class TreeStore implements Tree.TreeStoreI {
    public items: Tree.ItemI[] = [];
    public treeItemsById: Record<number | string, Tree.ItemI> = {};
    public treeChildrensByParentId: Record<number | string, Tree.ItemI[]> = {};
    public treeAllParentsByItemId: Record<number | string, Tree.ItemI[]> = {};
    public treeAllChildrensByItemId: Record<number | string, Tree.ItemI[]> = {};
    public queueParents: QueueParents;
    public queueChildrens: QueueChildrens;

    constructor(items: Tree.ItemI[]) {
        this.items = items;
        this.queueParents = new QueueParents();
        this.queueChildrens = new QueueChildrens();

        if (this.items?.length) {
            for (let i = 0; i < this.items.length; i++) {
                const item: Tree.ItemI = this.items[i];
                this.treeItemsById[item.id] = item;
                
                if (!this.treeChildrensByParentId[item.parent]) {
                    this.treeChildrensByParentId[item.parent] = [];
                }
                this.treeChildrensByParentId[item.parent].push(item);
            }
            this.bindItemsWithChildrensParents();
        }
    }

    /** Создать связи элементнов со всеми дочерними и родительскими узлами */
    public bindItemsWithChildrensParents() {
        for (let i = 0; i < this.items.length; i++) {
            if (!this.items[i]?.id) continue;

            const itemId = this.items[i].id;
            const parentId = this.items[i].parent;

            this.treeAllParentsByItemId[itemId] = [];
            this.treeAllChildrensByItemId[itemId] = [];

            this.bindAllParentsWithItem(itemId, parentId);
            this.bindAllChildrensWithItem(itemId);
        }
    }

    /** Создать связи элемента и цепи родительских узлов */
    public bindAllParentsWithItem(itemId: number, firstParentId: number | string) {
        const firstParent: Tree.ItemI = this.getItem(firstParentId);
        if (firstParent) this.queueParents.addInQueue(firstParent);
        while(this.queueParents.isQueueNotEmpty()) {
            const currentParent = this.queueParents.getFirstItemFromQueue();
            if (!currentParent) continue;
            this.treeAllParentsByItemId[itemId].push(currentParent);
            const nextParent: Tree.ItemI = this.getItem(currentParent.parent);
            this.queueParents.addInQueue(nextParent);
        }
    }

    /** Создать связи элемента и цепи всех вложенных дочерних узлов */
    public bindAllChildrensWithItem(itemId: number) {
        const childrensFirstLevel = this.getChildren(itemId);
        this.queueChildrens.addInQueue(childrensFirstLevel);
        while (this.queueChildrens.isQueueNotEmpty()) {
            const firstChild = this.queueChildrens.getFirstItemFromQueue();
            if (!firstChild) continue;
            this.treeAllChildrensByItemId[itemId].push(firstChild);
            const childrensNextLevel = this.getChildren(firstChild.id);
            this.queueChildrens.addInQueue(childrensNextLevel);
        }
    }

    /** Получить исходный список элементов */
    public getAll() {
        return this.items;
    }

    /** Получить элемент по его идентификатору */
    public getItem(itemId: number | string) {
        return this.treeItemsById[itemId];
    }

    /** Получить элементы, являющиеся дочерними для указанного */
    public getChildren(parentId: number | string) {
        return this.treeChildrensByParentId[parentId] ?? [];
    }

    /** Получить цепочку дочерних эелментов, начиная от указанного */
    public getAllChildren(parentId: number | string) {
        return this.treeAllChildrensByItemId[parentId] ?? [];
    }

    /** Получить цепочку родительских элементов, начиная от указанного */
    public getAllParents(itemId: number | string) {
        return this.treeAllParentsByItemId[itemId] ?? [];
    }
}
