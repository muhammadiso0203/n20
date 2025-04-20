import { Order } from "../models/index.js";

export const orderController = {
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: "ID is required" });

      const order = await Order.findById(id);

      if (!order) return res.status(404).json({ message: "Order not found" });

      res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  },
  findAll: async (req, res, next) => {
    try {
      const allOrders = await Order.find();

      res.status(200).json(allOrders);
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const user = req.user;

      if (!user) return res.status(401).json({ message: "User not found" });

      const { status, total, product_id } = req.body;

      const newOrder = new Order({
        status,
        total,
        user_id: user._id,
        product_id,
      });

      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const user = req.user;

      if (!user) return res.status(401).json({ message: "User not found" });

      const { id } = req.params;

      if (!id) return res.status(400).json({ message: "ID is required" });

      const { status, total, product_id } = req.body;

      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        {
          status,
          total,
          user_id: user._id,
          product_id,
        },
        { new: true }
      );

      if (!updatedOrder)
        return res.status(404).json({ message: "Order not found" });

      res.status(200).json({ message: "Order successfully updated" });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: "ID is required" });

      const order = await Order.findByIdAndDelete(id);

      if (!order) return res.status(404).json({ message: "Order not found" });

      res.status(200).json({ message: "Order successfully deleted" });
    } catch (err) {
      next(err);
    }
  },
};
