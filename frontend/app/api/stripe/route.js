

import { NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
  apiVersion: "2022-11-15",
});

export async function POST(request) {
  const body = await request.json();
  // console.log(body);
  try {
    if (body.length > 0) {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1NW0d0SEn8zjLuFNEUQhrFZu" },
          { shipping_rate: "shr_1NW0btSEn8zjLuFNKIAu1AWA" },
        ],
        invoice_creation: {
          enabled: true,
        },
        line_items: body.map((item) => {
          const img = item.image[0].asset._ref;
          
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/bwr4gdib/production/"
            )
            .replace("-webp", ".webp");
            console.log(newImage);
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 10,
            },
          };
        }),
        phone_number_collection: {
          enabled: true,
        },
        success_url: `${request.headers.get("origin")}/success`,
        cancel_url: `${request.headers.get("origin")}/?canceled=true`,
      });
      return NextResponse.json({ session });
    } else {
      return NextResponse.json({ message: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(err.message);
  }
}
