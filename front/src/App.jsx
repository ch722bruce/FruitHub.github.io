import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Checkout from './Components/CheckOut';
import ProductDetail from './Components/ProductDetail';
import ProductList from './Components/ProductList';
import {CartContext} from './Layouts/CartContext'
import { useState } from 'react';

function App() {

	const [cartItems, setCartItems] = useState([])

  return (
    <BrowserRouter>

		<CartContext.Provider value={{cartItems,setCartItems}}>

			<nav>
				<Link to="/">FruitHub</Link> 
				<Link to="/checkout">Carts</Link>
			</nav>

			<Routes>
				<Route path="/" element={<ProductList/>} />
				<Route path="/checkout" element={<Checkout/>} />

				<Route path="/product" element={<ProductDetail/>}>
					<Route path=":id" element={<ProductDetail/>} />
				</Route>

				<Route path="*" element={<p>Page Not Found</p>}/>
			</Routes>

		</CartContext.Provider>

	</BrowserRouter>
  );
}

export default App;