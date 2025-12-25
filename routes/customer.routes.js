const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');

// apply auth middleware from here
router.use(auth);

// CREATE
router.post('/add', async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.json({ success: true, data: customer });
});

// READ
router.get('/', async (req, res) => {
  const customers = await Customer.find().select('name mobile city');
  res.json(customers);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;




/*

MIDDLEWARE KAB & KAISE USE HOTA HAI
Case 1: Route-level protection
router.use(auth); 

//Iske baad ke saare routes protected ho jaate hain.


Case 2: Single route protection
router.get('/', auth, (req, res) => {
  res.json(req.user);
});
//Sirf ek route secure.

🔹 Case 3: App-level protection
app.use('/api/customers', auth, customerRoutes); 
Poora module secure, using code on server.js

*/