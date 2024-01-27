import { toast } from "react-toastify";
import request from "../request";
import toastOptions from "../../toastOpt";
import { productActions } from "../slices/productsSlice";

// Get All Products
export function getAllProducts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/v1/products`);
      dispatch(productActions.setProducts(data));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", toastOptions);
    }
  };
}

// Create Product
export function createProduct(newProduct, token) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`/api/v1/products`, newProduct, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(productActions.createProduct(data));
      toast.success("Product created", toastOptions);
    } catch (error) {
      toast.error(error.response.data.msg, toastOptions);
    }
  };
}

// Delete Product
export function deleteProduct(productsId, token) {
  return async (dispatch) => {
    try {
      await request.delete(`/api/v1/products/${productsId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(productActions.deleteProduct(productsId));
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
      console.log(error);
    }
  };
}
