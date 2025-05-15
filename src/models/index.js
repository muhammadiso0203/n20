import { Sequelize, DataTypes } from "sequelize";
import config from "../config/index.js";

const sequelize = new Sequelize(config.PG_DB, config.PG_USER, config.PG_PASS, {
  host: config.PG_HOST,
  dialect: config.DB_DIALECT,
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Category = (await import("./category.model.js")).default(
  sequelize,
  DataTypes
);
db.Product = (await import("./product.model.js")).default(sequelize, DataTypes);

db.Category.hasMany(db.Product, { foreignKey: "categoryId" });
db.Product.belongsTo(db.Category, { foreignKey: "categoryId" });

export default db;
