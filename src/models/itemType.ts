export interface ItemTypeInterface {
  id: number;
  checked: boolean;
  title: string;
  color: string;
}

export class ItemTypeModel implements ItemTypeInterface {
  id: number;
  checked: boolean;
  title: string;
  color: string;

  constructor(o: ItemTypeInterface) {
    this.id = o.id;
    this.checked = o.checked;
    this.title = o.title;
    this.color = o.color;
  }
}
