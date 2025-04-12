import { Category } from "../models/index.js";

export const categoryController = {
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: "ID is required" });

      const category = await Category.findById(id);

      if (!category)
        return res.status(404).json({ message: "Category not found" });

      res.json(category);
    } catch (err) {
      next(err);
    }
  },
  findAll: async (req, res, next) => {
    try {
      const allCategory = await Category.find();

      if (allCategory.length === 0)
        return res.status(404).json({ message: "Categories not found" });

      res.json(allCategory);
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const { name, slug, description, isActive } = req.body;

      if (!name || !slug || !description || !isActive)
        return res.status(400).json({ message: "All data is required" });

      const newCategory = new Category({
        name,
        slug,
        description,
        isActive,
      });

      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: "ID is required" });

      const { name, slug, description, isActive } = req.body;

      if (!name && !slug && !description && !isActive)
        return res
          .status(400)
          .json({ message: "At least one data is required" });

      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        {
          name,
          slug,
          description,
          isActive,
        },
        { new: true }
      );

      if (!updatedCategory)
        return res.status(404).json({ message: "Updated category not found" });

      res.json({ message: "Category successfully updated" });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: "ID is required" });

      const category = await Category.findByIdAndDelete(id);

      if (!category)
        return res.status(404).json({ message: "Category not found" });

      res.json({ message: "Category successfully deleted" });
    } catch (err) {
      next(err);
    }
  },
};
