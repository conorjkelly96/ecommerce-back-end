const { Router } = require("express");

const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

const router = Router();

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    console.log("getAllTags");
  } catch (error) {
    logError("GET location", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    console.log("getTagByID");
  } catch (error) {
    logError("GET location", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    console.log("createTag");
  } catch (error) {
    logError("GET location", error.message);
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
