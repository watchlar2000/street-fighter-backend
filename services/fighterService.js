import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  createFighter(fighter) {
    return fighterRepository.create(fighter);
  }

  search(search) {
    const fighter = fighterRepository.getOne(search);

    if (!fighter) {
      return null;
    }

    return fighter;
  }

  getFightersList() {
    return fighterRepository.getAll();
  }

  getFighterById(id) {
    const fighter = fighterRepository.getOne({ id });

    if (!fighter) {
      throw new Error("No fighter with such ID found in the database");
    }

    return fighter;
  }

  updateFighterById(id, payload) {
    const updatedFighter = fighterRepository.update(id, payload);

    if (!updatedFighter) {
      throw new Error("Something went wrong updating the fighter");
    }

    return updatedFighter;
  }

  deleteFighterById(id) {
    const deletedFighter = fighterRepository.delete(id);

    if (!deletedFighter) {
      throw new Error("Something went wrong deleting the fighter");
    }

    return deletedFighter;
  }
}

const fighterService = new FighterService();

export { fighterService };
