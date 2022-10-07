'use strict';
export default class AnimalsRepository {
  /**
   * @type {object[]}
   */
  #animals;

  /**
   * @param {string} animals
   */
  constructor(animals) {
    this.#animals = animals;
  }

  /**
   * Getter for animals
   *
   * @returns {object[]}
   */
  get animals() {
    return this.#animals;
  }

  /**
   * Setter for animals
   *
   * @param {object[]} animals
   *
   * @returns {void}
   */
  set animals(animals) {
    this.#animals = animals;
  }

  /**
   * Filters animal's list by animal's keyword, it keeps only the animals with names containing the animal keyword
   *
   * @param {string} animalKeyword
   *
   * @returns {AnimalsRepository}
   */
  filterByAnimalKeyword = (animalKeyword) => {
    this.#animals = this.#animals.filter((animal) => {
      return animal?.name.toLowerCase().includes(animalKeyword.toLowerCase());
    });
    return this;
  };
}
