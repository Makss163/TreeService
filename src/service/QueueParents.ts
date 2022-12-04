import { Tree } from "../interface/Tree";

/** Сервис для работы с очередью при обходе графа в ширину */
export class QueueParents implements Tree.QueueI, Tree.QueueParentsI {

    public queueParents: Tree.ItemI[];
    constructor() {
        this.queueParents = [];
    }

    public addInQueue (item: Tree.ItemI) {
        if (item) {
            this.queueParents.push(item);
        }
    }

    public getFirstItemFromQueue() {
        return this.queueParents.shift();
    }

    public isQueueNotEmpty() {
        return this.queueParents.length > 0;
    }
}
