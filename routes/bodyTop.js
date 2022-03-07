const router = require("express").Router();
const bodyTop = require("../models/bodyTop");

// ***** CRUD operations ***** //

// Create bodyTop - post
router.post("/", (req, res) => {
  data = req.body;
  bodyTop
    .insertMany(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read ALL bodyTop types - get
router.get("/", (req, res) => {
  bodyTop
    .find()
    .then((data) => {
      res.send(mapProdArray(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all Bodytop in specific Color - get
router.get("/color/:color", (req, res) => {
  bodyTop
    .find({ color: req.params.color })
    .then((data) => {
      res.send(mapProdArray(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});
// Read all Bodytop in specific Style - get
router.get("/style/:style", (req, res) => {
  bodyTop
    .find({ style: req.params.style })
    .then((data) => {
      res.send(mapProdArray(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read specific bodyTop - get
router.get("/:id", (req, res) => {
  bodyTop
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Update specific bodyTop - put
router.put("/:id", (req, res) => {
  const id = req.params.id;
  bodyTop
    .findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot update bodyTop with id=" +
            id +
            ". Maybe bodyTop was not found?",
        });
      } else {
        res.send({ message: "bodyTop was succesfully updated!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating bodyTop with id=" + id });
    });
});

// Delete specific bodyTop - delete

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  bodyTop
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot delete bodyTop with id=" +
            id +
            ". Maybe bodyTop was not found?",
        });
      } else {
        res.send({ message: "bodyTop was succesfully deleted!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting bodyTop with id=" + id });
    });
});

function mapProdArray(obj) {
  let outputArr = obj.map((element) => ({
    id: element._id,
    color: element.color,
    style: element.style,
    assetLocation: element.assetLocation,
    uri: `/api/bodyTop/${element._id}`,
  }));
  return outputArr;
}

module.exports = router;
