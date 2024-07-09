import { useEffect, useState, useMemo } from "react"
import { db } from './../data/db';

export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const maxItem = 5
    const minItem = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExists >= 0) {
            if (cart[itemExists].quantity >= maxItem) return
            const updateCart = [...cart]
            updateCart[itemExists].quantity++
            setCart(updateCart)
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    function removeFromCart(id) {
        //const updateCart = cart.filter(item => item.id !== id)
        //setCart(updateCart)
        setCart(prevCart => prevCart.filter(item => item.id !== id))
    }

    function increaseItem(id) {
        const updateCart = cart.map((item) => {
            if (item.id === id && item.quantity < maxItem) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            } else {
                return item
            }
        })
        setCart(updateCart)
    }

    function decreaseItem(id) {
        const updateCart = cart.map((item) => {
            if (item.id === id && item.quantity > minItem) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            } else {
                return item
            }
        })
        setCart(updateCart)
    }

    function cleanCart() {
        setCart([])
    }

    //Podemos usar funciones
    //const isEmpty = () => cart.length === 0
    //const cartTotal = () => cart.reduce((total, item) => total + (item.quantity * item.price), 0)
    //Podemos usar tambien UseMemo
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])


    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseItem,
        decreaseItem,
        cleanCart,
        isEmpty,
        cartTotal
    }

}