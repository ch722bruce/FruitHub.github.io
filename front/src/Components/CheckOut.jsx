import Title from "./Title"
import {Link} from 'react-router-dom'
import QuantityBtn from "./QuantityBtn"
import { CartContext } from "../Layouts/CartContext"
import { useContext } from "react"

export default function Checkout() {

    let {cartItems} = useContext(CartContext)
    let cartEmpty = cartItems.length<=0 ? true : false

    let grandTotal = cartItems.reduce((total, product)=>{
        return total += product.price*product.quantity
    },0)
    const freeShippingPrice = 99

    return (
        <>
            <Title mainTitle="Your Carts" />

            {
                cartEmpty && 
                <div>
                    <div className="nothingInCart">Nothing in Your Carts<br/><br/>
                    <Link to="/">Go Check Product</Link></div> :
                </div>
            }

            {
                !cartEmpty &&
                <div className="container">
                    <div className="cartSection">
                        <table className="checkoutTable">
                            <tbody>
                                {
                                    cartItems.map(product=>(
                                        <tr key={product.id}>
                                            <td>
                                                <Link to={'/product/'+product.id}>
                                                <img src={process.env.PUBLIC_URL+'/img/'+product.image} alt={product.name}/>
                                                </Link>
                                            </td>
                                            <td>
                                                <p>Name : {product.name}</p>
                                                <p>Price : ${product.price}</p>
                                                <p>Description : {product.description}</p>
                                            </td>
                                            <td width="200">
                                                <QuantityBtn productInfo={product} />
                                            </td>
                                            <td>
                                                <div className="productSubTotal">
                                                    ${product.price*product.quantity}
                                                </div>
                                            </td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="checkoutSection">
                        <div>Total</div>
                        <div className="grandTotal">${grandTotal}</div>
                        {
                            grandTotal >= freeShippingPrice ? 
                            <div className="freeShipping">✔️Free Delivery</div> :
                            <div className="noShipping">Over${freeShippingPrice}Get Free Shipping<br/>Still Need${freeShippingPrice-grandTotal}</div>
                        }
                        
                        <button>Check Out</button>
                    </div>
                </div> 
            }

        </>
    )
}