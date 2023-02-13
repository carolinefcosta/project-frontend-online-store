// Requisito desenvolvido por Caroline, Gregório e Patrick
export async function getCategories() {
  const urlApi = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const urlApiCategoryQuery = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(urlApiCategoryQuery);
  const data = await response.json();
  return data;
}

export async function getProductById(PRODUCT_ID) {
  const urlApi = `https://api.mercadolibre.com/items/${PRODUCT_ID}`;
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
}
