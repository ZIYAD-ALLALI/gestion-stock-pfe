import axios from "axios";


class CommandeClientDataService {
    getAll() {
        return axios.get("http://localhost:8080/api/v1/Commandes");
    }

    get(id) {
        return axios.get(`/client/${id}`);
    }

    create(data) {
        return axios.post("http://localhost:8080/api/v1/Commandes", data);
    }

    update(id, data) {
        return axios.put(`http://localhost:8080/api/v1/Commandes/${id}`, data);
    }

    delete(id) {
        return axios.delete(`http://localhost:8080/api/v1/Commandes/${id}`);
    }

    deleteAll() {
        return axios.delete(`/client`);
    }

}

export default new CommandeClientDataService();