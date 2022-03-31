const router = require("express").Router();
const shoe = require("../models/shoe");

// ***** CRUD operations ***** //

// Create shoe - post
router.post("/", (req, res) => {
  data = req.body;
  shoe
    .insertMany(data)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read ALL shoe - get
router.get("/", (req, res) => {
  shoe
    .find()
    .then((data) => {
      res.send(mapProdArray(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all shoe colors - get
router.get("/color/:color", (req, res) => {
  shoe
    .find({ color: req.params.color })
    .then((data) => {
      res.send(mapProdArray(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all shoe styles - get
router.get("/style/:style", (req, res) => {
  shoe
    .find({ style: req.params.style })
    .then((data) => {
      res.send(mapProdArray(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read specific shoe - get
router.get("/:id", (req, res) => {
  shoe
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Update specific shoe - put
router.put("/:id", (req, res) => {
  const id = req.params.id;
  shoe
    .findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot update shoe with id=" + id + ". Maybe shoe was not found?",
        });
      } else {
        res.send({ message: "shoe was succesfully updated!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating shoe with id=" + id });
    });
});

// Delete specific shoe - delete

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  shoe
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot delete shoe with id=" + id + ". Maybe shoe was not found?",
        });
      } else {
        res.send({ message: "shoe was succesfully deleted!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting shoe with id=" + id });
    });
});

function mapProdArray(obj) {
  let outputArr = obj.map((element) => ({
    id: element._id,
    color: element.color,
    style: element.style,
    assetLocation: element.assetLocation,
    uri: `/api/shoe/${element._id}`,
  }));
  return outputArr;
}

module.exports = router;
