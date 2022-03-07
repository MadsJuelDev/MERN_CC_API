const router = require("express").Router();
const bodyBottom = require("../models/bodyBottom");

// ***** CRUD operations ***** //

// Create bodyBottom - post
router.post("/", (req, res) => {
  data = req.body;
  bodyBottom
    .insertMany(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read ALL bodyBottom types - get
router.get("/", (req, res) => {
  bodyBottom
    .find()
    .then((data) => {
      res.send(mapProdArray(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all Body bottom colors - get
router.get("/color/:color", (req, res) => {
  bodyBottom
    .find({ color: req.params.color })
    .then((data) => {
      res.send(mapProdArray(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all Body bottom Styles - get
router.get("/style/:style", (req, res) => {
  bodyBottom
    .find({ style: req.params.style })
    .then((data) => {
      res.send(mapProdArray(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read specific bodyBottom - get
router.get("/:id", (req, res) => {
  bodyBottom
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Update specific bodyBottom - put
router.put("/:id", (req, res) => {
  const id = req.params.id;
  bodyBottom
    .findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot update bodyBottom with id=" +
            id +
            ". Maybe bodyBottom was not found?",
        });
      } else {
        res.send({ message: "bodyBottom was succesfully updated!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error updating bodyBottom with id=" + id });
    });
});

// Delete specific bodyBottom - delete

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  bodyBottom
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot delete bodyBottom with id=" +
            id +
            ". Maybe bodyBottom was not found?",
        });
      } else {
        res.send({ message: "bodyBottom was succesfully deleted!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error deleting bodyBottom with id=" + id });
    });
});

function mapProdArray(obj) {
  let outputArr = obj.map((element) => ({
    id: element._id,
    color: element.color,
    style: element.style,
    assetLocation: element.assetLocation,
    uri: `/api/bodyBottom/${element._id}`,
  }));
  return outputArr;
}

module.exports = router;
