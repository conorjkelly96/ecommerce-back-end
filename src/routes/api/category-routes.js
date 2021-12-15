const { Router } = require("express");

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
      .json({ success: false, error: "Category does not exist" });
  } catch (error) {
    logError("GET location", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    console.log("getCategoryByID");
  } catch (error) {
    logError("GET location", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    console.log("createCategory");
  } catch (error) {
    logError("GET location", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    console.log("updateCategoryByID");
  } catch (error) {
    logError("GET location", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    console.log("deleteCategoryByID");
  } catch (error) {
    logError("GET location", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

module.exports = router;
