// Requisito desenvolvido por Caroline, Gregório e Patrick
export async function getCategories() {
  const urlApi = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(urlApi);
  const data = await response.json()
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const urlApiQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const urlApiCategory = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const response = await fetch(urlApiCategory, urlApiQuery);
  const data = await response.json();
  return data;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
