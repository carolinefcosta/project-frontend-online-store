const localStorageProduct = {
  image,
  name,
  price,
};

const readProduct = () => JSON.parse(localStorage
  .getItem(localStorageProduct));

const saveProduct = (image, name, price) => localStorage
  .setItem(localStorageProduct, JSON.stringify(image, name, price));

export const getProduct = () => {
  let product = readProduct();
  if (product === null) {
    product = {};
  }
};

export const createProduct = (product) => {
  const emptyProduct = {
    image: '',
    name: '',
    price: '',
  };
  saveProduct({ ...emptyProduct, ...product });
};
