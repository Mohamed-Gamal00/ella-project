<template>
  <div class="product-details mt-16">
    <h1>product details</h1>
    <v-container>
      <v-row>
        <v-col cols="7">
          <img
            :src="tab ? tab : singleProduct.thumbnail"
            class="w-100"
            style="width: 100%; height: 500px"
            alt="thumbnail"
            v-if="!loading"
          />
          <v-skeleton-loader
            v-if="loading"
            type="image,image,image"
          ></v-skeleton-loader>
          <v-tabs center-active height="200" v-model="tab" class="mt-10">
            <v-tab
              v-for="(img, i) in singleProduct.images"
              :key="i"
              :value="img"
              class="mx-10"
            >
              <img
                style="object-fit: contain"
                width="100"
                height="200"
                contain
                :src="img"
                alt="img"
              />
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="5" class="pt-0 pl-6">
          <v-skeleton-loader
            v-if="loading"
            type="article,article,article"
          ></v-skeleton-loader>
          <v-card elevation="0" v-if="!loading">
            <v-card-title
              class="px-0"
              style="font-size: 15px; font-weight: bold"
            >
              {{ singleProduct.title }} Sample -
              {{ singleProduct.category }} For Sale
            </v-card-title>
            <div class="rating-parent d-flex aling-center" style="gap: 10px">
              <v-rating
                v-model="singleProduct.rating"
                half-increments
                readonly
                color="yellow-darken-2"
                size="x-small"
                density="compact"
              ></v-rating>
              <span class="mt-1" style="color: rgb(97, 97, 97); font-size: 13px"
                >Stock: {{ singleProduct.stock }}</span
              >
            </div>
            <v-card-text
              style="color: rgb(97, 97, 97); font-size: 13px"
              class="px-0"
            >
              {{ singleProduct.description }}
            </v-card-text>
            <v-card-text
              style="color: rgb(97, 97, 97); font-size: 13px"
              class="px-0 pt-0"
            >
              Brand: {{ singleProduct.brand }}
            </v-card-text>
            <v-card-text
              style="color: rgb(97, 97, 97); font-size: 13px"
              class="px-0 pt-0"
            >
              Availabilty:
              {{ singleProduct.stock > 0 ? "In Stock" : "Out Of stock" }}
            </v-card-text>

            <v-card-text class="pl-0 pt-0">
              <del>${{ singleProduct.price }}</del>

              from
              <span style="font-weight: 900; font-size: 16px">
                ${{
                  Math.ceil(
                    singleProduct.price -
                      singleProduct.price *
                        (singleProduct.discountPercentage / 100)
                  )
                }}
              </span>
            </v-card-text>
            <v-card-text class="pl-0 pt-0">Quantity</v-card-text>
            <div
              class="counter px-1"
              style="
                border: 1px solid rgb(187, 187, 187);
                border-radius: 30px;
                width: fit-content;
              "
            >
              <v-icon size="20" @click="quantity > 1 ? quantity-- : false"
                >mdi-minus</v-icon
              >
              <input
                type="number"
                style="
                  border: none;
                  outline: none;
                  width: 60px;
                  font-size: 13px;
                "
                class="text-center py-2"
                min="1"
                v-model="quantity"
              />
              <VIcon size="20" @click="quantity++">mdi-plus</VIcon>
            </div>
            <v-card-text class="pl-0 pt-0 my-4">
              Subtotal:${{
                Math.ceil(
                  singleProduct.price -
                    singleProduct.price *
                      (singleProduct.discountPercentage / 100)
                ) * quantity
              }}
            </v-card-text>
            <v-card-actions class="mt-7 w-100 px-0">
              <v-btn
                variant="elevated"
                style="
                  text-transform: none;
                  border-radius: 30px;
                  background-color: rgb(32, 32, 32);
                "
                class="w-75 text-white"
                density="compact"
                height="45"
                @click="addToCart(singleProduct)"
                :loading="btnLoading"
                >Add To Cart</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
import { productModules } from "@/stores/products";
import { mapActions, mapState } from "pinia";
import { createStore } from "@/stores/cart.js";

export default {
  inject: ["Emitter"],
  computed: {
    ...mapState(productModules, ["singleProduct"]),
  },
  methods: {
    ...mapActions(productModules, ["getSingleProduct"]),
    ...mapActions(createStore, ["addItem"]),
    addToCart(item) {
      item.quantity = this.quantity;
      this.btnLoading = true;
      setTimeout(() => {
        this.btnLoading = false;
      }, 1000);
      this.addItem(item);
      this.Emitter.emit("openCart");
      this.Emitter.emit("showMsg", item.title);
    },
  },
  components: {
    VSkeletonLoader,
  },
  data() {
    return {
      loading: false,
      tab: "",
      quantity: 1,
      btnLoading: false,
    };
  },
  async mounted() {
    this.loading = true;
    this.tab = ""; // Reset the tab value
    await this.getSingleProduct(this.$route.params.productId);
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped></style>
