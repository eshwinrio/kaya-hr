import { Applications } from "@prisma/client";
import { Router } from "express";
import httpErrors from "http-errors";
import httpStatus from "http-status";
import prisma from "../lib/prisma.js";
import requireAccessToken from "../middlewares/require-access-token.js";
import requireBody from "../middlewares/require-body.js";
import requireParams from "../middlewares/require-params.js";

const applicationRouter = Router();

type CreateApplicationBody = Omit<Applications, 'id' | 'secret'>;
applicationRouter.post(
  "/applications",
  requireAccessToken(),
  requireBody<CreateApplicationBody, "name">("name"),
  async (req, res, next) => {
    try {
      const { name, disabled, isValid, validity } = req.body;
      const application = await prisma.applications.create({
        data: { name, disabled, isValid, validity }
      });
      res.status(httpStatus.CREATED).send(application);
    } catch (error) {
      next(error);
    }
  }
);

applicationRouter.get(
  "/applications",
  requireAccessToken(),
  async (_req, res, next) => {
    try {
      const applications = await prisma.applications.findMany();
      res.send(applications);
    } catch (error) {
      next(error);
    }
  }
);

applicationRouter.get(
  "/applications/:id",
  requireAccessToken(),
  requireParams("id"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      
      // Validate id
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        throw httpErrors.BadRequest("Invalid id");
      }

      // Check if application exists
      const applicationExists = await prisma.applications.count({
        where: { id: parsedId }
      });
      if (!applicationExists) {
        throw httpErrors.NotFound("Application not found");
      }

      // Get application
      const application = await prisma.applications.findUnique({
        where: { id: parsedId }
      });

      res.send(application);
    } catch (error) {
      next(error);
    }
  }
);

applicationRouter.put(
  "/applications/:id",
  requireAccessToken(),
  requireParams("id"),
  requireBody<CreateApplicationBody, "name">("name"),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      // Validate id
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        throw httpErrors.BadRequest("Invalid id");
      }
      const { name, disabled, isValid, validity } = req.body;
      
      // Check if application exists
      const applicationExists = await prisma.applications.count({
        where: { id: parsedId }
      });
      if (!applicationExists) {
        throw httpErrors.NotFound("Application not found");
      }

      // Update application
      const application = await prisma.applications.update({
        where: { id: parsedId },
        data: { name, disabled, isValid, validity }
      });

      res.send(application);
    } catch (error) {
      next(error);
    }
  }
);

applicationRouter.delete(
  "/applications/:id",
  requireAccessToken(),
  requireParams("id"),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      // Validate id
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        throw httpErrors.BadRequest("Invalid id");
      }

      // Check if application exists
      const applicationExists = await prisma.applications.count({
        where: { id: parsedId }
      });
      if (!applicationExists) {
        throw httpErrors.NotFound("Application not found");
      }

      // Delete application
      const application = await prisma.applications.delete({
        where: { id: parsedId }
      });

      res.send(application);
    } catch (error) {
      next(error);
    }
  }
);

export default applicationRouter;
