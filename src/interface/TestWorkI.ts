export interface ItemI {
    id: number,
    parent: number | string,
    type?: any,
}

export interface TreeStoreI {
    items: ItemI[];
    getAll: () => ItemI[];
    getItem: (itemId: number | string) => ItemI;
    getChildren: (parentId: number | string) => ItemI[];
    getAllChildren: (parentId: number | string) => ItemI[];
    getAllParents: (itemId: number | string) => ItemI[];
}
