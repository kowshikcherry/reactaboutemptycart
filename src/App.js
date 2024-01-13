import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state

    const existingProduct = cartList.find(item => item.id === product.id)

    if (existingProduct) {
      existingProduct.quantity += product.quantity
    } else {
      cartList.push({...product})
    }

    this.setState({cartList: [...cartList]})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const removeupdatecartlist = cartList.filter(each => each.id !== id)
    
    this.setState({cartList: removeupdatecartlist})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const filteronincreasebutton = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    this.setState({cartList: filteronincreasebutton})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    // console.log(cartList)
    const fillteronminus = []
    for (const i in cartList) {
      if (cartList[i].id === id) {
        if (cartList[i].quantity > 1) {
          fillteronminus.push({
            ...cartList[i],
            quantity: cartList[i].quantity - 1,
          })
        } else {
          null
        }
      } else {
        fillteronminus.push({...cartList[i]})
      }
    }
    // console.log(fillteronminus)
    this.setState({cartList: fillteronminus})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
/*

const filterondecresebutton = cartList.map(each => {
      if (each.id === id) {
        if (each.quantity === 1) {
          return {...each, quantity: 0}
        } else {
          return {...each, quantity: each.quantity - 1}
        }
      } else {
        return each
      }
    })
    this.setState({cartList: filterondecresebutton})

 */
