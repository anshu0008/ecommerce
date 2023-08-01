import { createClient, groq } from "next-sanity";
import clientConfig from "./config/sanityConfig";

export async function getAllProduct() {
  return createClient(clientConfig).fetch(
    groq`*[_type == "product"]{
            _id,
            "slug":slug.current,
            "image":image[0].asset->url,
            name,
            price,
            details,
            name
        }`
  );
}

export async function getBanner() {
  return createClient(clientConfig).fetch(
    groq`*[_type == "banner"]{
            discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, "image":image.asset->url,_id
                }`
  );
}

export async function getProduct(slug) {
  return createClient(clientConfig).fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
        _id,
        "slug":slug.current,
        image,
        name,
        price,
        details,
        name
    }`,{slug}
  );
}
