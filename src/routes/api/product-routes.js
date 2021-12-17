const { Router } = require("express");
const { logError } = require("../../helpers/utils");

const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

const router = Router();

// get all products
router.get("/", async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data

  try {
    const data = await Product.findAll({
      include: [
        {
          model: Category,
          model: Tag,
        },
      ],
    });

    return res.json({ success: true, data });
  } catch (error) {
    logError("GET Category", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

// get one product
router.get("/:id", async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const data = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Tag,
          through: { model: ProductTag, attributes: [] },
        },
        {
          model: Category,
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

// create new product
router.post("/", async (req, res) => {
  //  create product in code (product.create)
  const product = await Product.create(req.body);

  // check if request has tag ids
  if (req.body.tagIds && req.body.tagIds.length) {
    // if true, create product tag objects & insert to product tag table
    const productTags = req.body.tagIds.map((tag_id) => {
      return {
        product_id: product.id,
        tag_id,
      };
    });
    await ProductTag.bulkCreate(productTags);
  }
  // send response
  const data = await Product.findByPk(product.id, {
    include: [
      {
        model: Tag,
        through: { model: ProductTag, attributes: [] },
      },
      {
        model: Category,
      },
    ],
  });

  return res.json({ success: true, data });
});

// update product
router.put("/:id", async (req, res) => {
  // update product data

  console.log(req.params.id);
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  // delete one product by its `id` value
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json({ success: true, data: "Product deleted" });
  } catch (error) {
    logError("Product location", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send response" });
  }
});

module.exports = router;
