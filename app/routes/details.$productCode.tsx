import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import ProductDetails from "~/components/ProductDetails/ProductDetails";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const productCode = params.productCode;

  if (!productCode) {
    throw new Response(`Product code is required`, { status: 400 });
  }

  const productUrl = `https://mock.akakce.dev/product${productCode}.json`;

  try {
    const response = await fetch(productUrl);
    if (!response.ok) {
      throw new Response("Failed to fetch product details", {
        status: response.status,
      });
    }

    const productDetails = await response.json();
    return { productDetails };
  } catch (error) {
    throw new Response("An error occurred while fetching product details", {
      status: 500,
    });
  }
};

export default function Index() {
  return <ProductDetails />;
}
