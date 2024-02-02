const { Router } = require('express')
const router = new Router()

router.get('/', (req, res) => {
  res.render('inicio')
})

module.exports = router;