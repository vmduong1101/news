import axiosClient from "./axiosClient";

export const getCartApi = {
    getCart: () => {
        const url = '/cart';
        return axiosClient.get(url);
    }
}

export const addCartApi = {
    addCart: (params) => {
        const data = { ...params }
        const url = '/cart';
        return axiosClient.postForm(url,
            data
        )
    }
}

// export const getItemProductApi = {
//     getItemProduct: (id) => {
//         const url = `/product/${id}`;
//         return axiosClient.get(url);
//     }
// }

export const editCartApi = {
    editCart: (params) => {
        console.log(params)
        const data = { ...params.data }
        const url = `/cart/${params.id}`;
        return axiosClient.putForm(url, data);
    }
}

export const deleteCartApi = {
    deleteCart: (id) => {
        const url = `/cart/${id}`;
        return axiosClient.delete(url);
    }
}

