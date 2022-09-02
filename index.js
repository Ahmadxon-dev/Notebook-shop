const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const homerouter = require('./routes/home');
const notebooksRouter = require('./routes/notebooks');
const addRouter = require('./routes/add');
const cardRoutes = require('./routes/card');
const User  = require('./models/user');
const ordersRoutes = require('./routes/orders')
app.use(express.static('public'));
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(async (req,res, next) => {
    try{
        const user =  await  User.findById('630b5b77a0e86ca01f8c7aa2')
        req.user= user;
        next()
    }catch (e) {
        console.log(e)
    }

})
app.use(express.urlencoded({extended: true})); //formadan nimadur yuvorvotganda bu narsa extended true bo'lishi kerak
app.use('/', homerouter);
app.use('/notebooks', notebooksRouter);
app.use('/add', addRouter);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes)
const password = 'HM7aSEx4MZnpYrKH';

async function start() {
    try {
        const url = 'mongodb+srv://ahmadxon:HM7aSEx4MZnpYrKH@cluster0.ihey0bi.mongodb.net/notebooks'

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`);
        });
        await mongoose.connect(url,  ()=> console.log('mongoose connected'));
        const candidate = await User.findOne();
        if (!candidate) {
            const user = new User({
                email: "ahmadxon2008@gmail.com",
                name: "Ahmadxon",
                cart: { items: [] },
            });
            await user.save();
        }else{
            console.log('fuck')
        }

    } catch (e) {
        console.log(e)
    }
}
start()