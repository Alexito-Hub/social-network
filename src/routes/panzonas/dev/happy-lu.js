const { Router } = require('express')
const router = new Router()

router.get('/', (req, res) => {
  res.render('panzonas/dev/happy-lu')
})

module.exports = router;