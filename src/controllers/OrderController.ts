import { Request, Response } from "express";

import { userRepository } from "../repositories/userRepository";
import { productRepository } from "../repositories/productRepository";
import { orderRepository } from "../repositories/orderRepository";

export class OrderController {
  async create(req: Request, res: Response) {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const user = await userRepository.findOneBy({ id: Number(userId) });
      const product = await productRepository.findOneBy({
        id: Number(productId),
      });

      if (!user || !product) {
        return res.status(404).json({ message: "User or Product not found" });
      }

      const newOrder = orderRepository.create({
        user,
        product,
        quantity: 0,
        total: 0,
        status: "open",
      });

      await orderRepository.save(newOrder);

      return res.status(201).json(newOrder);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    const { orderId, quantity } = req.params;

    if (!orderId || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const order = await orderRepository.findOneBy({ id: Number(orderId) });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      order.quantity = Number(quantity);
      order.total = order.product.price * order.quantity;

      await orderRepository.save(order);

      return res.status(200).json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async listOrders(req: Request, res: Response) {
    try {
      const orders = await orderRepository.find();

      return res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
