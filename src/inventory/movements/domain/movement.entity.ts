export interface Movement {
    id: string;
    date: Date;
    productId: string;
    productName?: string;
    productSku?: string;
    direction: 'entrada' | 'salida';
    type: 'compra' | 'venta' | 'manual' | 'sistema';
    quantity: number;
    reference: string;
    notes: string;
    createdAt: Date;
}
