import axios from "axios";

class FournisseurDataService {
    getAll() {
        return axios.get("http://localhost:8080/api/v1/Fournisseurs");
    }

    get(id) {
        return axios.get(`/client/${id}`);
    }

    create(data) {
        return axios.post("http://localhost:8080/api/v1/Fournisseurs", data);
    }

    update(id, data) {
        return axios.put(`http://localhost:8080/api/v1/Fournisseurs/${id}`, data);
    }

    delete(id) {
        return axios.delete(`http://localhost:8080/api/v1/Fournisseurs/${id}`);
    }

    deleteAll() {
        return axios.delete(`/client`);
    }

}

export default new FournisseurDataService();