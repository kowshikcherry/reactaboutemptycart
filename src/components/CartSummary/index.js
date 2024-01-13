import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let totalprice = 0

      for (const i in cartList) {
        totalprice = totalprice + cartList[i].quantity * cartList[i].price
      }
      return (
        <>
          <h1>Order Total</h1>
          <h1>{totalprice}/-</h1>
          <p>{cartList.length} Items in cart</p>
          <button>Checkout</button>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
