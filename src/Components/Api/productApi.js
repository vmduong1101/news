import axiosClient from "./axiosClient";

export const getProductApi = {
    getAllProduct: () => {
        const url = '/product';
        return axiosClient.get(url);
    }
}

export const addProductApi = {
    addProduct: (params) => {
        const data = { ...params }
        const url = '/product';
        return axiosClient.postForm(url,
            data
        )
    }
}

export const deleteProductApi = {
    deleteProduct: (id) => {
        const url = `/product/${id}`;
        return axiosClient.delete(url);
    }
}

