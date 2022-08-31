import axiosClient from "./axiosClient";

const getProductApi = {
    getAllProduct: (params) => {
        const url = '/product';
        return axiosClient.get(url, { params });
    }
}
export default getProductApi;