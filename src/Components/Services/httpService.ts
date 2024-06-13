import apiClient from "./apiClient";

interface Entity {
    id: number
}
//create a class and a method
class httpService {

    //type string endpoint
    endpoint: string;
    //need a constructor any time you call the class it will create instance of that class
    //whatever  is in our constructor it will create an instance 
    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

  getAll<T>() {
    const request = apiClient.get<T[]>(this.endpoint);
    return { request };
  }

  //delete user method
  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }
  //add user method
  create<T>(entity: T) {
    return apiClient.post(this.endpoint + "/", entity);
  }
  //UPDATE
  update<T extends Entity>(entity: T) {
    return apiClient.put(this.endpoint + "/" + entity.id, entity);
  }
}
const create = (endpoint: string) => new httpService(endpoint)

export default create;