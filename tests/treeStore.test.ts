import { Tree } from "../src/interface/Tree";
import { TreeStore } from "../src/service/TreeStore";

describe('TreeStore', () => {

    /** Исходный массив объектов */
    let listItems: Tree.ItemI[];
    /** Экземпляр класса */
    let treeStore: Tree.TreeStoreI;

    /** Перед каждым тестом перезаписываем ссылку на новый исходный список объектов */
    beforeEach(() => {
        listItems = [
            { id: 1, parent: 'root' },
            { id: 2, parent: 1, type: 'test' },
            { id: 3, parent: 1, type: 'test' },

            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' },

            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null },
        ];
        treeStore = new TreeStore(listItems);
    });

    test('Проверка получения элемента по идентификатору', () => {
        const actualResult = treeStore.getItem(7);
        const expectedResult = { id: 7, parent: 4, type: null };
        expect(actualResult).toEqual(expectedResult);
    })

    test('Проверка получения всех элементов', () => {
        const actualResult = treeStore.getAll();
        const expectedResult = listItems;
        expect(actualResult).toEqual(expectedResult);
    })

    test('Проверка получения всех дочерних элементов для элемента, указанного по id (по существующему id)', () => {
        const actualResult = treeStore.getChildren(4);
        const expectedResult = [
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null },
        ];
        expect(actualResult).toEqual(expectedResult);
    })

    test('Проверка получения всех дочерних элементов для элемента, указанного по id (по id, у которого нет дочерних)', () => {
        const actualResult = treeStore.getChildren(8);
        const expectedResult = [];
        expect(actualResult).toEqual(expectedResult);
    })

    test('Проверка получения цепочки дочерних элементов', () => {
        const actualResult = treeStore.getAllChildren(2);
        const expectedResult = [
            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' },
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null },
        ];
        expect(actualResult).toEqual(expectedResult);
    })

    test('Проверка получения цепочки родительских элементов', () => {
        const actualResult = treeStore.getAllParents(8);
        const expectedResult = [
            { id: 4, parent: 2, type: 'test' },
            { id: 2, parent: 1, type: 'test' },
            { id: 1, parent: 'root' },
        ];
        expect(actualResult).toEqual(expectedResult);
    })
});
