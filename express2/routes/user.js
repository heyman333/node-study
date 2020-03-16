const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`your id is ${id}`);
});

router.post("/", (req, res) => {
  res.json({ success: true, name: req.body.name, age: req.body.age });
});

router.put("/", (req, res) => {
  res.status(400).json({ message: "BAD REQUEST" });
});

module.exports = router;
