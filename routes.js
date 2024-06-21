const express = require('express');
const router = express.Router();

router.get('/chatId', (req, res) => {
  res.send({ chatId: 'Not applicable' });
});

module.exports = router;
