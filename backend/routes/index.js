const dependensee = require("../lib/dependensee");
const request = require('request-promise')
const express = require("express");
const router = express.Router();
/* GET home page. */
router.get("/", async (req, res, next) => {
  let tree;
  const pkg = req.query.packageName;
  const version = req.query.version;
  console.log(pkg, version);
  try {
    tree = await dependensee(pkg, version);
  } catch (err) {
    console.log(err);
  }
  res.json(tree);
});

router.get("/versions", async (req, res, next) => {
  let tree;
  const pkg = req.query.packageName;
  const uri = `https://registry.npmjs.org/${pkg}`
  let versions
  try {
    const pkgDetails = await request({uri, json: true});
    versions = Object.keys(pkgDetails.versions).reverse()
  } catch (err) {
    console.log(err);
  }
  console.log(versions)
  res.json(versions);
});

module.exports = router;
