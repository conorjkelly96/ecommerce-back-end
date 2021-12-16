const { Router } = require("express");
const { logError } = require("../../helpers/utils");

const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

const router = Router();

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  try {
    const data = await Tag.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });

    if (data) {
      return res.json({ success: true, data });
    }

    return res
      .status(404)
      .json({ success: false, error: "Tag does not exist" });
  } catch (error) {
    logError("GET Category", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
        },
      ],
    });

    if (data) {
      return res.json({ success: true, data });
    }

    return res
      .status(404)
      .json({ success: false, error: "Tag does not exist" });
  } catch (error) {
    logError("GET Category", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const { tag_name } = req.body;

    if (tag_name) {
      await Category.create({ tag_name });
      return res.json({ success: true, data: "Tag Category" });
    }

    return res
      .status(400)
      .json({ success: false, error: "Please provide the required fields" });
  } catch (error) {
    console.log("POST category", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value

  try {
    console.log("updateTagById");
  } catch (error) {
    logError("GET location", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    console.log("deleteTagById");
  } catch (error) {
    logError("GET location", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

module.exports = router;
