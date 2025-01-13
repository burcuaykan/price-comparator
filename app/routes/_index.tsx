// app/routes/_index.tsx
import { LoaderFunction } from "@remix-run/node";
import ProductList from "~/components/ProductList/ProductList";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const nextUrl =
    url.searchParams.get("nextUrl") || "https://mock.akakce.dev/page.json";
  const response = await fetch(nextUrl);
  if (!response.ok) {
    throw new Response("Failed to fetch products", { status: response.status });
  }

  const data = await response.json();

  return {
    productList: data.productList || [],
    horizontalProductList: data.horizontalProductList || [],
    nextUrl: data.nextUrl || "",
  };
};

export default function Index() {
  return <ProductList />;
}
