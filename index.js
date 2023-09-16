const express = require('express')
const app = express()
const port = 80
const path = require('path')

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.redirect("/watch")
})

app.get('/watch', (req, res) => {
    if (req.query["v"] != undefined) {
        res.sendFile(path.join(__dirname, "/pages/watch.html"))
    }else {
        res.redirect("/watch?v=bHQqvYy5KYo")
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})