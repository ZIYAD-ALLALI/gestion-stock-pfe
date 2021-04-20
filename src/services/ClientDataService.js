import axios from "axios";

class ClientDataService {
    getAll() {
        return axios.get("http://localhost:8080/api/v1/Clients");
    }

    get(id) {
        return axios.get(`/client/${id}`);
    }

    create(data) {
        return axios.post("http://localhost:8080/api/v1/Clients", data);
    }

    update(id, data) {
        return axios.put(`http://localhost:8080/api/v1/Clients/${id}`, data);
    }

    delete(id) {
        return axios.delete(`http://localhost:8080/api/v1/Clients/${id}`);
    }

    deleteAll() {
        return axios.delete(`/Clients`);
    }

}
export default new ClientDataService();