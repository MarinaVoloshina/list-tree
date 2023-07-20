import { getRandomColor, getRandomNumber } from "@/utils";
import { ItemTypeInterface, ItemTypeModel } from "@/models/itemType";
import { ItemModel } from "@/models/item";
import { TristateCheckboxState } from "@/models/tristateCheckbox";

export class ListModel {
  name: string;

  types: Array<ItemTypeModel> = [];
  items: Array<ItemModel> = [];

  itemIdCounter = 0;
  isItemsSorted = true;

  constructor(name: string) {
    this.name = name;
    this.initialilizeItemTypes();
    this.initializeItems();
  }

  getTypeById(id: number): ItemTypeModel {
    return this.types.find((e) => e.id === id) as ItemTypeModel;
  }

  changeTypeColor(typeId: number, color: string): void {
    const idx = this.types.findIndex((e) => e.id === typeId);
    this.types[idx].color = color;
  }

  toggleType(typeId: number) {
    const idx = this.types.findIndex((e) => e.id === typeId);
    this.types[idx].checked = !this.types[idx].checked;
  }

  toggleIsSorted() {
    this.isItemsSorted ? this.shuffleItems() : this.sortItems();
  }

  private sortItems(): void {
    this.items = this.items.sort((a, b) => a.typeId - b.typeId);
    this.isItemsSorted = true;
  }

  private shuffleItems(): void {
    const { items } = this;

    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    this.items = items;
    this.isItemsSorted = false;
  }

  changeQuantityOfItemsByType(typeId: number, quantity: number): void {
    const currentQuantity = this.items.filter(
      (e) => e.typeId === typeId
    ).length;

    if (quantity > currentQuantity) {
      for (let x = 0; x < quantity - currentQuantity; x++) {
        this.itemIdCounter++;

        const newItem = new ItemModel({ id: this.itemIdCounter, typeId });
        const idx = this.isItemsSorted
          ? this.items.findIndex((e) => e.typeId === typeId)
          : getRandomNumber(0, (this.items.length || 1) - 1);

        this.items.splice(idx, 0, newItem);
      }

      if (this.isItemsSorted) {
        this.sortItems();
      }
    } else {
      for (let x = 0; x < currentQuantity - quantity; x++) {
        const idx = this.items.findIndex((e) => e.typeId === typeId);
        this.items.splice(idx, 1);
      }
    }
  }

  private initialilizeItemTypes() {
    this.types = new Array(getRandomNumber(4, 10)).fill(null);

    this.types = this.types.map(
      (e, idx) =>
        new ItemTypeModel({
          id: idx + 1,
          checked: !!getRandomNumber(0, 1),
          title: "Item " + (idx + 1),
          color: getRandomColor(),
        })
    );
  }

  private initializeItems() {
    this.types.forEach((type) => {
      this.changeQuantityOfItemsByType(type.id, getRandomNumber(0, 25));
    });
  }

  get itemsByType(): Array<ItemTypeInterface & { quantity: number }> {
    return this.types.map((type) => ({
      ...type,
      quantity: this.items.filter((e) => e.typeId === type.id).length,
    }));
  }

  deleteItem(id: number) {
    this.items = this.items.filter((e) => e.id !== id);
  }

  get itemsWithCheckedType() {
    const checkedTypesIds: number[] = this.types
      .filter((e) => e.checked)
      .map((e) => e.id);

    return this.items.filter((e) => checkedTypesIds.includes(e.typeId));
  }

  get isChecked() {
    const typesLenght = this.types.length;

    const checkedTypesLength = this.types.filter((e) => e.checked).length;

    if (!checkedTypesLength) return TristateCheckboxState.FALSE;

    return checkedTypesLength === typesLenght
      ? TristateCheckboxState.TRUE
      : TristateCheckboxState.INDETERMINATE;
  }

  toggleIsChecked() {
    const value = this.isChecked !== TristateCheckboxState.TRUE;

    this.setAllTypesChecked(value);
  }

  private setAllTypesChecked(value: boolean) {
    this.types.forEach((e, idx) => {
      this.types[idx].checked = value;
    });
  }
}
