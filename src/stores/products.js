import { defineStore } from "pinia";
import axios from "axios";
export const productModules = defineStore("productsModule", {
  state: () => ({
    flashDeals: [],
    newProducts: [],
    mobilePhones: [],
    fragrances: [],
    singleProduct: "",
    categoryProducts: [],
    categories: [
      { title: "Smart Phones", route: "smartphones" },
      { title: "Laptops", route: "laptops" },
      { title: "Furniture", route: "furniture" },
      { title: "Men's-Shoes", route: "mens-shoes" },
      { title: "Men's-Watches", route: "mens-watches" },
      { title: "Women's-Bags", route: "womens-bags" },
      { title: "Motorcycle", route: "motorcycle" },
    ],
  }),
  actions: {
    async getProducts() {
      await axios
        .get("https://dummyjson.com/products")
        .then((res) => {
          this.newProducts = res.data.products.filter(
            (el) => el.category === "laptops"
          );
          this.mobilePhones = res.data.products.filter(
            (el) => el.category === "smartphones"
          );
          this.fragrances = res.data.products.filter(
            (el) => el.category === "fragrances"
          );
          // console.log(this.fragrances);
          this.flashDeals = res.data.products.slice(0, 8);
          // console.log(res.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getProductsByCategory(category) {
      await axios
        .get(`https://dummyjson.com/products/category/${category}`)
        .then((res) => {
          this.categoryProducts = res.data;
        });
    },
    async getSingleProduct(productId) {
      await axios
        .get(`https://dummyjson.com/products/${productId}`)
        .then((res) => {
          // console.log(res.data);
          this.singleProduct = res.data;
        });
    },
  },
});
