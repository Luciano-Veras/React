import { useEffect, useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"



function App() {

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

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseItem={increaseItem}
        decreaseItem={decreaseItem}
        cleanCart={cleanCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          ))}
        </div>

      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
