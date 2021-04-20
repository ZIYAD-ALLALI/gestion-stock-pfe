import axios from "axios";

class PartenaireDataService {
    getAll() {
        return axios.get("http://localhost:8080/api/v1/partenaire");
    }

    get(id) {
        return axios.get(`/partenaire/${id}`);
    }

    create(data) {
        return axios.post("http://localhost:8080/api/v1/partenaire", data);
    }

    update(id, data) {
        return axios.put(`http://localhost:8080/api/v1/partenaire/${id}`, data);
    }

    delete(id) {
        return axios.delete(`http://localhost:8080/api/v1/partenaire/${id}`);
    }

    deleteAll() {
        return axios.delete(`/partenaire`);
    }

}

export default new PartenaireDataService();