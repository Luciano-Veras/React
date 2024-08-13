import { MenuItem, OrderItem } from "../types"
import { formatCurrency } from '../helpers/index';

type OrderContentsProps = {
    order: OrderItem[]
    removeItem: (id: MenuItem['id']) => void
}

export default function OrderContents({ order, removeItem }: OrderContentsProps) {
    return (
        <div>
            <h2 className="font-black text-3xl text-center">Consumo</h2>

            <div className="space-y-3 mt-5">
                {order.length === 0
                    ? <p className="text-center"> No hay consumos</p>
                    : (
                        order.map(item => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center border-t last-of-type:border-b border-gray-600 py-5"
                            >
                                <div>
                                    <p>{item.name} - {formatCurrency(item.price)}</p>
                                    <p className="font-black">Cantidad: {item.quantity} - {formatCurrency(item.quantity * item.price)}</p>
                                </div>
                                <button
                                    className="bg-red-500 hover:bg-red-600 w-8 h-8 rounded-full text-white font-black"
                                    onClick={() => removeItem(item.id)}
                                >x</button>
                            </div>
                        ))
                    )}

            </div>
        </div>
    )
}
