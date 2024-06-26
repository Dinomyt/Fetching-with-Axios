import apiClient from "./apiClient";

interface Entity {
    id: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
}

class httpService {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll<T>() {
        const request = apiClient.get<T[]>(this.endpoint);
        return request;
    }

    delete(id: number) {
        return apiClient.delete(`${this.endpoint}/${id}`);
    }

    create<T>(entity: T) {
        return apiClient.post(this.endpoint, entity);
    }

    update<T extends Entity>(entity: T) {
        return apiClient.put(`${this.endpoint}/${entity.id}`, entity);
    }
}

const create = (endpoint: string) => new httpService(endpoint);

export { httpService, create };
