import jollof from "../assets/jollof.jpg";
import poundo from "../assets/poundo.jpg";
import amala from "../assets/amala.jpg";
import suya from "../assets/suya.jpg";
import suyaSallat from "../assets/suya_sallat.jpg";
import amalaEwedu from "../assets/amala-and-ewedu-2.jpg";

const IMAGE_MAP = {
  "jollof.jpg": jollof,
  "poundo.jpg": poundo,
  "amala.jpg": amala,
  "suya.jpg": suya,
  "suya_sallat.jpg": suyaSallat,
  "amala-and-ewedu-2.jpg": amalaEwedu,
};

const DEFAULT_IMAGE = jollof;

/**
 * Resolves a food imageUrl from the API to a bundled asset URL.
 * Accepts filenames (jollof.jpg) or legacy paths (/src/assets/jollof.jpg).
 */
export function resolveFoodImage(imageUrl) {
  if (!imageUrl) {
    return DEFAULT_IMAGE;
  }

  const filename = imageUrl.includes("/")
    ? imageUrl.split("/").pop()
    : imageUrl;

  return IMAGE_MAP[filename] || IMAGE_MAP[imageUrl] || DEFAULT_IMAGE;
}

/**
 * Maps API food payload to the shape used by Menu, Home, and Cart.
 */
export function mapFoodFromApi(food) {
  return {
    id: food.id,
    name: food.name,
    country: food.countryOfOrigin || "",
    category: food.category || "",
    description: food.description || "",
    price: food.price,
    image: resolveFoodImage(food.imageUrl),
    imageUrl: food.imageUrl,
  };
}
