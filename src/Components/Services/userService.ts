import create from "./httpService";

export interface User {
    id: number
    name: string
}

export default create("/users");


// import apiClient from "./apiClient";

// interface User {
//   id: number;
//   name: string;
// }

// //create a class and a method
// class userService {
//   getAllUsers() {
//     const request = apiClient.get("/users");
//     return { request };
//   }

//   //delete user method
//   deleteUser(id: number) {
//     return apiClient.delete("/users/" + id);
//   }
//   //add user method
//   createUser(user: User) {
//     return apiClient.post("/users", user);
//   }
//   //UPDATE
//   updateUser(user: User) {
//     return apiClient.put("/users/" + user.id, user);
//   }
// }
// export default new userService();