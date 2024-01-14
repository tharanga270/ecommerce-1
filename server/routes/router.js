const express = require('express');
const router = new express.Router();
const Products = require('../models/productsSchema');
const USER = require('../models/userSchema');

//get productsdata api
router.get('/getproducts', async (req, res) => {
  try {
    const productsdata = await Products.find();
    res.status(201).json(productsdata);
  } catch (error) {
    console.log('error' + error.message);
  }
});

//get individual data
router.get('/getproductsone/:id', async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const individualdata = await Products.findOne({ id: id });
    //console.log(individualdata);

    res.status(201).json(individualdata);
  } catch (error) {
    res.status(400).json(individualdata);
    console.log('error' + error.message);
  }
});

//register data
router.post('/register', async (req, res) => {
  //console.log(req.body);
  const { fname, email, mobile, password, cpassword } = req.body;
  if (!fname || !email || !mobile || !password || !cpassword) {
    req.status(422).json({ error: 'fill the all data' });
    console.log('no data available');
  }

  try {
    const preuser = await USER.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: 'this user is already present' });
    } else if (password !== cpassword) {
      res.status(422).json({ error: 'password and cpassword not match' });
    } else {
      const finalUser = new USER({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      //hash password

      const storedata = await finalUser.save();
      console.log(storedata);
      res.status(201).json(storedata);
    }
  } catch (error) {}
});

module.exports = router;
