import { userRepository } from "../repositories/userRepository.js";

class UserService {
  createUser(user) {
    return userRepository.create(user);
  }

  search(search) {
    const user = userRepository.getOne(search);

    if (!user) {
      return null;
    }

    return user;
  }

  getUsersList() {
    return userRepository.getAll();
  }

  getUserById(id) {
    const user = userRepository.getOne({ id });

    if (!user) {
      throw new Error("No user with such ID found in the database");
    }

    return user;
  }

  updateUserById(id, payload) {
    const updatedUser = userRepository.update(id, payload);

    if (!updatedUser) {
      throw new Error("Something went wrong updating the user");
    }

    return updatedUser;
  }

  deleteUserById(id) {
    const deletedUser = userRepository.delete(id);

    if (!deletedUser) {
      throw new Error("Something went wrong deleting the user");
    }

    return deletedUser;
  }
}

const userService = new UserService();

export { userService };
