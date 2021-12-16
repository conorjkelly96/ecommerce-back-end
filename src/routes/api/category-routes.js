const { Router } = require("express");
const { logError } = require("../../helpers/utils");

const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

const router = Router();

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const data = await Category.findAll({
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
      .json({ success: false, error: "Product does not exist" });
  } catch (error) {
    logError("GET Category", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const data = await Category.findByPk(req.params.id, {
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
      .json({ success: false, error: "Category does not exist" });
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
    const { category_name } = req.body;

    if (category_name) {
      await Category.create({ category_name });
      return res.json({ success: true, data: "Created Category" });
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
  // update a category by its `id` value
  try {
    const { category_name } = req.body;

    const { id } = req.params;
    console.log(req.params);
    console.log(req.body);

    if (id && category_name) {
      await Category.update(
        { category_name: category_name },
        { where: { id: id } }
      );
      return res.json({ success: true, data: "Updated Category" });
    }
  } catch (error) {
    logError("GET Category", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json({ success: true, data: "Deleted Category" });
  } catch (error) {
    logError("DELETE Category", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

module.exports = router;
