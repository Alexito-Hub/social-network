const { Router } = require('express')
const router = new Router()

router.get('/', (req, res) => {
  res.render('private/login')
})

module.exports = router;