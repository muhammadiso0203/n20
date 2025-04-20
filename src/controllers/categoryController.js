import { Category } from "../models/index.js";

export const categoryController = {
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: "ID is required" });

      const category = await Category.findById(id);

      if (!category)
        return res.status(404).json({ message: "Category not found" });

      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  },
  findAll: async (req, res, next) => {
    try {
      const { page, limit } = req.query;

      const allCategory = await Category.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);

      res.status(200).json(allCategory);
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const { name, slug, description, isActive } = req.body;

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

      res.status(200).json({ message: "Category successfully updated" });
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

      res.status(200).json({ message: "Category successfully deleted" });
    } catch (err) {
      next(err);
    }
  },
};
