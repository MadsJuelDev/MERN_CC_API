const router = require("express").Router();
const hair = require("../models/hair");

// ***** CRUD operations ***** //

// Create hair - post
router.post("/", (req, res) => {
  data = req.body;
  hair
    .insertMany(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read ALL hair types - get
router.get("/", (req, res) => {
  hair
    .find()
    .then((data) => {
      res.send(mapProdArray(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all Hair colors - get
router.get("/color/:color", (req, res) => {
  hair
    .find({ color: req.params.color })
    .then((data) => {
      res.send(mapProdArray(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all Hair styles - get
router.get("/style/:style", (req, res) => {
  hair
    .find({ style: req.params.style })
    .then((data) => {
      res.send(mapProdArray(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read specific hair - get
router.get("/:id", (req, res) => {
  hair
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Update specific hair - put
router.put("/:id", (req, res) => {
  const id = req.params.id;
  hair
    .findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot update hair with id=" + id + ". Maybe hair was not found?",
        });
      } else {
        res.send({ message: "hair was succesfully updated!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating hair with id=" + id });
    });
});

// Delete specific hair - delete

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  hair
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot delete hair with id=" + id + ". Maybe hair was not found?",
        });
      } else {
        res.send({ message: "hair was succesfully deleted!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting hair with id=" + id });
    });
});

function mapProdArray(obj) {
  let outputArr = obj.map((element) => ({
    id: element._id,
    color: element.color,
    style: element.style,
    assetLocation: element.assetLocation,
    uri: `/api/hair/${element._id}`,
  }));
  return outputArr;
}

module.exports = router;
