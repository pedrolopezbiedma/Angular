export class Ingredient {
  public ingredientId: number;
  public name: string;
  public amount: number

  constructor(ingredientId: number,  name: string, amount: number) {
    this.ingredientId = ingredientId;
    this.name = name;
    this.amount = amount;
  }

}
