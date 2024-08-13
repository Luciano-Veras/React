import type { MenuItem } from "../types"

type MenuItemProp = {
    item: MenuItem
    addItem: (item: MenuItem) => void
}


export default function MenuItem({ item, addItem }: MenuItemProp) {
    return (
        <button
            className="border-2 border-teal-400 hover:bg-teal-500 w-full rounded-lg flex justify-between p-3"
            onClick={() => addItem(item)}
        >
            <p>{item.name}</p>
            <p className="font-black">${item.price}</p>
        </button>
    )
}
