const express = require('express')
const app = express()
const port = 80
const path = require('path')

app.use('/static', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "pages"));

app.get('/', (req, res) => {
  res.redirect("/watch")
})

app.get('/watch', (req, res) => {
  if (req.query["v"] != undefined) {
    async function testt() {
      let testtt = await fetch(`https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${req.query["v"]}`)
      let result = await testtt.json()
      console.log(result)
      res.render("watch", {
        "title":result.title,
        "thumnail":`https://i.ytimg.com/vi/${req.query["v"]}/maxresdefault.jpg`,
        "original_url":req.protocol + "://" + req.hostname + req.originalUrl
      })
    }
    testt()
  } else {
    res.redirect("/watch?v=bHQqvYy5KYo")
  }
})

app.get("/*", (req,res) => {
  res.redirect("/")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})