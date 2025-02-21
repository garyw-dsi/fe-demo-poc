import { components } from "@/libs/api/schema/inventory";

type ProductType = "Goods" | "Service";
export const productTypes: ProductType[] = ["Goods", "Service"];

type Unit = components['schemas']['Unit'];
export const units: Unit[] = [
  "Piece",
  "Kg",
  "Litre",
  "Meter",
  "Square Meter",
  "Cubic Meter",
  "Box",
  "Bag",
  "Bottle",
  "Can",
  "Tube",
  "Roll",
  "Set",
  "Pair",
  "Dozen",
  "Pack",
  "Ream",
  "Bundle",
  "Kit",
  "Unit",
  "Other",
  "Unknown",
  "Custom",
]