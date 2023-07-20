interface ItemInterface {
  id: number;
  typeId: number;
}

export class ItemModel implements ItemInterface {
  id: number;
  typeId: number;

  constructor(o: ItemInterface) {
    this.id = o.id;
    this.typeId = o.typeId;
  }
}
