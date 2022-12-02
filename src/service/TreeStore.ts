import { TreeStoreI, ItemI } from "../interface/TestWorkI";

export class TreeStore implements TreeStoreI {
    public items: ItemI[] = [];
    public treeItemsById: Record<number, ItemI> = {};
    public treeGroupItemsByParentId: Record<number, ItemI[]> = {};

    constructor(items: ItemI[]) {
        this.items = items;
        const treeItemsById = {};
        const treeGroupItemsByParentId = {};
        if (this.items?.length) {
            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                this.treeItemsById[item.id] = item;
                
                if (!this.treeGroupItemsByParentId[item.parent]) {
                    this.treeGroupItemsByParentId[item.parent] = [];
                }
                this.treeGroupItemsByParentId[item.parent].push(item);
            }
        }
    }

    public getAll() {
        return this.items;
    }

    public getItem(itemId: number | string) {
        return this.treeItemsById[itemId];
    }

    public getChildren(parentId: number | string) {
        return this.treeGroupItemsByParentId[parentId] ?? [];
    }

    public getAllChildren(parentId: number | string) {
        const childrensFirstLevel = this.getChildren(parentId);
        const stackAllChildrens = [...childrensFirstLevel];
        const result: ItemI[] = [];

        while (stackAllChildrens.length > 0) {
            const item = stackAllChildrens.pop();
            if (item) {
                result.push(item);
                const childrensLowLevel = this.getChildren(item.id);
                stackAllChildrens.push(...childrensLowLevel);
            }
        }

        return result;
    }

    public getAllParents(itemId: number | string) {
        const item = this.getItem(itemId);
        const result: ItemI[] = [];
        if (item) {
            const parent = this.getItem(item.parent);
            if (parent) {
                const stackAllParents = [parent];
                result.push(parent);
                while (stackAllParents.length > 0) {
                    // родительский элемент, который уже в результате
                    const previousParent = stackAllParents.pop();
                    // следующий родительский элемент
                    const nextParent = this.getItem(previousParent.parent);
                    if (nextParent) {
                        result.push(nextParent);
                        stackAllParents.push(nextParent);
                    }
                }
            }
        }

        return result;
    }
}
