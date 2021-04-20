import axios from "axios";

class TissuDataService {
    getAll() {
        return axios.get("http://localhost:8080/api/v1/tissuType");
    }

    getFournisseur(id) {
        return axios.get(`http://localhost:8080/api/v1/tissuType/${id}/fournisseur`, id);
    }

    get(id) {
        return axios.get(`/tissuType/${id}`);
    }

    create(data) {
        return axios.post("http://localhost:8080/api/v1/tissuType", data);
    }

    update(id, data) {
        return axios.put(`http://localhost:8080/api/v1/tissuType/${id}`, data);
    }

    delete(id) {
        return axios.delete(`http://localhost:8080/api/v1/tissuType/${id}`);
    }

    deleteAll() {
        return axios.delete(`/tissuType`);
    }

}

export default new TissuDataService();