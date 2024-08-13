import { useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalProps = {
    order: OrderItem[]
    tip: number
    placeOrder: () => void
}


export default function OrderTotals({ order, tip, placeOrder }: OrderTotalProps) {

    const subtotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

    const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order])

    const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tip, order])

    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black text-2xl">Totales y Propinas:</h2>
                <p>Subtotal a pagar:{' '}
                    <span className="font-bold">{formatCurrency(subtotalAmount)}</span>
                </p>
                <p>Propina:{' '}
                    <span className="font-bold">{formatCurrency(tipAmount)}</span>
                </p>
                <p>Total a pagar:{' '}
                    <span className="font-bold">{formatCurrency(totalAmount)}</span>
                </p>

                <button
                    className="font-bold bg-teal-600 text-white w-full p-5 mt-10 rounded-lg disabled:opacity-10 uppercase hover:bg-teal-700"
                    disabled={order.length === 0}
                    onClick={placeOrder}
                >
                    Guardar Orden
                </button>

            </div>
        </>
    )
}
