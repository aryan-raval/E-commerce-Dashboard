const express = require('express');
require('./db/Config');
const cors = require('cors');

const User = require('./db/User');
const Product = require('./db/Product');

const jwt = require('jsonwebtoken');
const jwtKey = 'third-ecomm';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/signup', async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    if (result) {
        jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                resp.send({ result: "something went wront ! please tryagain after sometime" });
            } else {
                resp.send({ user, auth: token });
            }
        })
    } else {
        resp.send({ result: "user not save" });
    }

})

app.post('/login', async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body);
        if (user) {
            jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    resp.send({ result: "something went wront ! please tryagain after sometime" });
                } else {
                    resp.send({ user, auth: token });
                }
            })

        } else {
            resp.send({ result: "user not found" });
        }
    } else {
        resp.send({ result: "all field are requied.." })
    }

})

app.post('/addproduct', verifyToken, async (req, resp) => {

    const product = new Product(req.body);
    let result = await product.save();
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "not inserted from backend" })
    }
})

app.get('/getproduct', verifyToken, async (req, resp) => {
    let product = await Product.find();
    resp.send(product);
})

app.delete('/deleteproduct/:id', verifyToken, async (req, resp) => {
    let product = await Product.deleteOne({ _id: req.params.id });
    if (product) {
        resp.send(product);
    } else {
        resp.send({ result: "not deleted from backend" })
    }
})

app.get('/prefill/:id', verifyToken, async (req, resp) => {
    let product = await Product.findOne({ _id: req.params.id });
    if (product) {
        resp.send(product);
    } else {
        resp.send({ result: 'can not find data from backend' })
    }
    // resp.send({result:'can not find data from backend'})
})

app.put('/updateproduct/:id', verifyToken, async (req, resp) => {
    let product = await Product.updateOne({ _id: req.params.id }, {
        $set: req.body
    })
    if (product) {
        resp.send(product)
    } else {
        resp.send({ result: 'not updated from backend' })
    }
})

app.get('/search/:key', verifyToken, async (req, resp) => {
    let product = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    })
    resp.send(product);

})

function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.send({ result: "not valid token" });
            } else {
                next();
            }
        })
    } else {
        resp.send({ result: "please provide token.." })
    }
}




app.listen(5002);