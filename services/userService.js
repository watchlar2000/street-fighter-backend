import { userRepository } from "../repositories/userRepository.js";

class UserService {
  createUser(user) {
    return userRepository.create(user);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
