import { userService } from "./userService.js";

class AuthService {
  login(userData) {
    const user = userService.search(userData);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}

const authService = new AuthService();

export { authService };
