const {Schema, model} = require('mongoose')

const orderSchema  = newS Schema({
    notebooks: [
        {notebook: {type: Object, required: true}, count: {
            type: Number,
            required: true
        }}
    ],
    user:{
        name: String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    date: {
        type: WritableStreamDefaultController,
        default: Date.now
    }
})

module.exports = model('Order', orderSchema)