export class Product {
  constructor(
    public readonly id: string,
    public readonly sku: string,
    public readonly name: string,
    public readonly description: string,
    public readonly stock: number,
    public readonly minStock: number | null,
    public readonly maxStock: number | null,
    public readonly categories: string[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
