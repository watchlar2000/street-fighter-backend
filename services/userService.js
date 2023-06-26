import { userRepository } from "../repositories/userRepository.js";

function responseHandler(reponse) {
  if (!reponse) {
    return null;
  }
  return reponse;
}

class UserService {
  createUser(user) {
    return userRepository.create(user);
  }

  search(search) {
    const item = userRepository.getOne(search);
    return responseHandler(item);
  }

  getUsersList() {
    const usersList = userRepository.getAll();
    return responseHandler(usersList);
  }

  getUserById(id) {
    const user = userRepository.getOne({ id });
    return responseHandler(user);
  }

  updateUserById(id, payload) {
    const updatedUser = userRepository.update(id, payload);
    return responseHandler(updatedUser);
  }

  deleteUserById(id) {
    const deletedUser = userRepository.delete(id);
    return responseHandler(deletedUser);
  }
}

const userService = new UserService();

export { userService };
