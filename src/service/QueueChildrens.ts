import { Tree } from "../interface/Tree";

/** Сервис для работы с очередью при обходе графа в ширину */
export class QueueChildrens implements Tree.QueueI, Tree.QueueChildrensI {

    public queueChildrens: Tree.ItemI[];
    constructor() {
        this.queueChildrens = [];
    }

    public addInQueue (items: Tree.ItemI[]) {
        if (items?.length) {
            this.queueChildrens.push(...items);
        }
    }

    public getFirstItemFromQueue() {
        return this.queueChildrens.shift();
    }

    public isQueueNotEmpty() {
        return this.queueChildrens.length > 0;
    }
}
