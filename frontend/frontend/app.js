const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Add a public/ folder with index.html if desired
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <h1>E-Commerce Store</h1>
    <button onclick="addToCart(1)">Add Product 1 to Cart</button>
    <button onclick="addToCart(2)">Add Product 2 to Cart</button>
    <div id="cart"></div>
    <script>
      async function addToCart(id) {
        await fetch('http://backend:5000/cart', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({productId: id})
        });
        loadCart();
      }
      async function loadCart() {
        const res = await fetch('http://backend:5000/cart');
        const data = await res.json();
        document.getElementById('cart').innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
      }
    </script>
  `);
});

app.listen(port, () => console.log(`Frontend on ${port}`));
