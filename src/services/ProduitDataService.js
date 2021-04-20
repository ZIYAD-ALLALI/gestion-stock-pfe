import axios from "axios";

class ProduitDataService {
    getAll() {
        return axios.get("http://localhost:8080/api/v1/Produits");
    }

    get(id) {
        return axios.get(`/Produits/${id}`);
    }

    create(data) {
        return axios.post("http://localhost:8080/api/v1/Produits", data);
    }

    update(id, data) {
        return axios.put(`http://localhost:8080/api/v1/Produits/${id}`, data);
    }

    delete(id) {
        return axios.delete(`http://localhost:8080/api/v1/Produits/${id}`);
    }

    deleteAll() {
        return axios.delete(`/Produits`);
    }

}

export default new ProduitDataService();