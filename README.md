# ecommerce-back-end

E-Commerce Back End application leveraging sequelize ORM for database management.

## Technologies

- JavaScript
  - node.js
  - seuqelize.js
  - express.js
- SQL
  - mySQL2

## Walkthrough

[Click here!](https://drive.google.com/drive/u/0/folders/1OO1VkR3U08GcsNQ6SOCMNEEjKCUQoCOl)

## Getting Started

If you wish to run the application locally, run the following commands once the repository is cloned onto your machine:

- `npm run seed` - Seeds Database with initial datasets
- `npm run start`- Initiates inquirer functions
- `npm run dev` - Development use only

## Sequelize

[Sequelize ORM](https://sequelize.org/master/) is used to create models in order to store Tags, Products, Categories & Product Tags. In first, the model configuration was defined including table, columns and column specific criteria:

```javascript
class Category extends Model {}

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: "category",
  }
);
```

Once the `Category`, `Tag`, `Product Tag` & `Product` models were created, an `index.js` file was created in order to map the relationships between each table:

```javascript
/ Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: "product_id",
  through: {
    model: ProductTag,
    unique: false,
  },
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: "tag_id",
  through: {
    model: ProductTag,
    unique: false,
  },
});
```

## Controller Functions

Controller functions were set up to allow for CRUD operations to take place in the database when invoked through API calls externally. Response handling was used to respond to bad and incomplete requests to ensure errors were handled correctly.

```javascript
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
```

## Sample Responses

Below are some typical responses provided by the API.

GET Category by id: `GET /api/categories/1`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "category_name": "Shirts",
    "products": []
  }
}
```

GET Category by id: `GET /api/categories/1`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "category_name": "Shirts",
    "products": []
  }
}
```

POST Product by id: `POST /api/products/`

Sample POST body request:

```json
{
  "product_name": "Tester Hoodie 2",
  "price": 300.0,
  "stock": 3,
  "category_id": 2
}
```

& Response

```json
{
  "success": true,
  "data": {
    "id": 15,
    "product_name": "Tester Hoodie 2",
    "price": "300.00",
    "stock": 3,
    "category_id": 2,
    "tags": [],
    "category": {
      "id": 2,
      "category_name": "Shorts"
    }
  }
}
```

## Usage

This application will allow users to CREATE, READ, UPDATE and DELETE tags, products & categories.
