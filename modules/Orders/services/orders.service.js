const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);


const requestOrder = async (address, phone_number, user_id) => {
    try {
        const cart = await db('carts').select('cart_id').where('user_id', user_id);
        
        if (!cart || cart.length === 0) {
            throw new Error('No cart found for the user.');
        }

        const cartItems = await db('cart_items')
            .where('cart_id', cart[0].cart_id) 
            .select('product_id', 'quantity');

        let totalCost = 0;

        for (const item of cartItems) {
            const product = await db('products').select('price').where('product_id', item.product_id).first();
            
            if (!product) {
                console.error(`Product not found for product_id: ${item.product_id}`);
                continue; 
            }

            if (typeof product.price === 'number' && typeof item.quantity === 'number') {
                totalCost += product.price * item.quantity;
            } else {
                console.error('Invalid values');
            }
        }

        const result = await db('orders').insert({
            address: address,
            phone_number: phone_number,
            user_id: user_id,
            cart_id: cart[0].cart_id, 
            cost: totalCost
        });

        return { result: true, message: "Order sent successfully." };
    } catch (err) {
        console.error(err); 
        return { result: false, message: err.message }; 
    }
}

const ordersList=async()=>{
    try{
        const result=await db('orders').join('users','orders.user_id','users.user_id').select('users.user_name','orders.*')
        return result
    }catch(error){
        return 'error'
    }
}


const deleteOrder=async(order_id)=>{
    try {
        const result = await db('orders').where({'order_id':order_id}).del();
        return result;
    } catch (e) {
        console.error('Error in Delete order:', e);
        return 'An error occurred while deleting the order: ' + e.message;
    }
}

const ordersCount=async()=>{
    try{
        const result=await db('orders').count().first();
        return result
    }
    catch(error){
        return 'error'
    }
}


module.exports={requestOrder,ordersList,deleteOrder,ordersCount}