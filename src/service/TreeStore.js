"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var TreeStore = /** @class */ (function () {
    function TreeStore(items) {
        var _a;
        this.items = [];
        this.treeItemsById = {};
        this.treeGroupItemsByParentId = {};
        this.items = items;
        if ((_a = this.items) === null || _a === void 0 ? void 0 : _a.length) {
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                this.treeItemsById[item.id] = item;
                if (!this.treeGroupItemsByParentId[item.parent]) {
                    this.treeGroupItemsByParentId[item.parent] = [];
                }
                this.treeGroupItemsByParentId[item.parent].push(item);
            }
        }
    }
    TreeStore.prototype.getAll = function () {
        return this.items;
    };
    TreeStore.prototype.getItem = function (itemId) {
        return this.treeItemsById[itemId];
    };
    TreeStore.prototype.getChildren = function (parentId) {
        var _a;
        return (_a = this.treeGroupItemsByParentId[parentId]) !== null && _a !== void 0 ? _a : [];
    };
    TreeStore.prototype.getAllChildren = function (parentId) {
        var childrensFirstLevel = this.getChildren(parentId);
        var stackAllChildrens = __spreadArrays(childrensFirstLevel);
        var result = [];
        while (stackAllChildrens.length > 0) {
            var item = stackAllChildrens.pop();
            if (item) {
                result.push(item);
                var childrensLowLevel = this.getChildren(item.id);
                stackAllChildrens.push.apply(stackAllChildrens, childrensLowLevel);
            }
        }
        return result;
    };
    TreeStore.prototype.getAllParents = function (itemId) {
        var item = this.getItem(itemId);
        var result = [];
        if (item) {
            var parent_1 = this.getItem(item.parent);
            if (parent_1) {
                var stackAllParents = [parent_1];
                result.push(parent_1);
                while (stackAllParents.length > 0) {
                    var item_1 = stackAllParents.pop();
                    var parent_2 = this.getItem(item_1.parent);
                    if (parent_2) {
                        result.push(parent_2);
                        stackAllParents.push(parent_2);
                    }
                }
            }
        }
        return result;
    };
    return TreeStore;
}());
exports.TreeStore = TreeStore;
