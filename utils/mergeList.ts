interface Product {
  product: string;
  model: string;
  VPROPER3: string;
  size: string;
  SORT_ID: string;
  unit: string;
  KOL: number;
  price: number;
  total: number;
  property1: string;
  property2: number;
  property3: string;
  planNumber: number;
  knitter: string;
  plaster: string;
  custom_amount: number;
}

function mergeList(products: Product[]): {
  mergedProducts: Product[];
  allObj: Record<string, Product[]>;
} {
  const mergedProducts: Product[] = [];
  const list: Record<string, Product[]> = {};

  products.forEach((product) => {
    // Create a unique key for merging based on VPROPER3 and SORT_ID
    const key = product.VPROPER3 + product.SORT_ID;

    if (list[key]) {
      // If the product already exists in the list, update the existing product
      const existingProduct = mergedProducts.find(
        (p) => p.VPROPER3 === product.VPROPER3 && p.SORT_ID === product.SORT_ID
      );

      if (existingProduct) {
        existingProduct.KOL += Number(product.KOL);
        existingProduct.total += product.total;
        existingProduct.custom_amount += 1;
      }

      // Push the product into the existing list for this key
      list[key].push(product);
    } else {
      // If the product does not exist, add it to mergedProducts and create a new list entry
      mergedProducts.push({
        ...product,
        custom_amount: 1, // Initialize custom_amount for new product
        KOL: Number(product.KOL),
      });
      list[key] = [product];
    }
  });

  return { mergedProducts, allObj: list };
}

export default mergeList;
