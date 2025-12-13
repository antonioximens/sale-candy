import { z } from "zod";
import { validateCreateOrderItem } from "./validateCreateOrderItem";

export const validateUpdateOrderItem = validateCreateOrderItem.partial();
