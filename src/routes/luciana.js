const { Router } = require('express')
const router = new Router()

router.get('/', (req, res) => {
  res.render('luciana')
})

module.exports = router;