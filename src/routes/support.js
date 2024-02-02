const { Router } = require('express')
const router = new Router()

router.get('/', (req, res) => {
  res.render('support')
})

module.exports = router;