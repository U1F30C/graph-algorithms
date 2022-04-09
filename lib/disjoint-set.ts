export interface Dictionary<T> {
  [key: string]: T;
}

interface DisjointSetElement {
  key: string;
  parent?: DisjointSetElement;
  children: DisjointSetElement[];
}

export class DisjointSet {
  private elements: Dictionary<DisjointSetElement> = {};

  makeSet(key: string): void {
    if (!this.elements[key]) {
      const element: DisjointSetElement = { key, children: [] };
      element.parent = element;
      this.elements[key] = element;
    }
  }

  merge(key1: string, key2: string) {
    const element1: DisjointSetElement = this.findRepresentative(key1);
    const element2: DisjointSetElement = this.findRepresentative(key2);

    if (element1 == element2) {
      return;
    } else {
      element2.parent = element1;
      element1.children.push(element2);
    }
  }

  findRepresentative(key: string) {
    const element = this.elements[key];
    return this._findRepresentative(element);
  }

  private _findRepresentative(element: DisjointSetElement): DisjointSetElement {
    if (element == element.parent) {
      return element;
    } else {
      return this._findRepresentative(<DisjointSetElement>element.parent);
    }
  }
}
