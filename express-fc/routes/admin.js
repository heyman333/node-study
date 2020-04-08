const express = require("express")
const router = express.Router()

const foods = ["bread", "fruit", "lamen", "fish", "fork", "beef", "shrimp", "robster", "cake", "icecream"]

router.get("/", (req, res) => { 
  res.send("admin 이후 url")
})

router.get("/products", (req, res) => {
  res.send("admin products");
});

router.post("/products", (req, res) => {
  console.log("req", req.body)
  const { count, food } = req.body
  let selected = foods.slice(0, count)

  if (selected.includes(food)) {
    selected = [food]
  }

  res.json({ success: true, products: selected })
});

module.exports = router;