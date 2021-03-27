import React, {useState} from 'react';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {

  const [product,setProduct] = useState({
    name: 'React by FB',
    price: 10,
    productBy: "facebook"
  })

  const makePayment = (token) => {
    const body = {
      token,
      product,
    }
    const headers = {
      "Content-Type": "application/json"
    }
    return fetch(`http://localhost:5000/payment` , {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE ", response)
      const {status} = response
      console.log("STATUS ",status)
    }).catch(err => console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <StripeCheckout 
        stripeKey="pk_test_51IR0W4CtjUChAj913Z7FBXM4GtCGibj6naMdD4Gjefi8tVqckF8fLl9qRDK9jODmUclyBytpOQDlg0JHEXn8udI300AK3DjBBB"
        token={makePayment}
        name="Buy React"
        amount={product.price * 100}
        // shippingAddress
        // billingAddress
        >
        <button className="btn-large pink">Buy React in just {product.price}$</button>  
        </StripeCheckout>       
      </header>
    </div>
  );
}

export default App;
