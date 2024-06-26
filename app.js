const express = require('express');

const app = express();
const userAPI=require('./modules/User/routes/user.routes')
const categoriesAPI=require('./modules/Categories/routes/categories.routes')
const productsAPI=require('./modules/Products/routes/products.routes')
const cartAPI=require('./modules/Cart/routes/cart.routes')
const ordersAPI=require('./modules/Orders/routes/orders.routes')
var cors=require('cors');
const Logger = require('./modules/User/midddlewar/logger');



app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(Logger)

app.use('/',userAPI)
app.use('/',categoriesAPI)
app.use('/',productsAPI)
app.use('/',cartAPI)
app.use('/uploads', express.static('uploads'));
app.use('/',ordersAPI)






app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

















