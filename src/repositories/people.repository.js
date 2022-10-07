'use strict';
import ArrayUtil from '../utils/array.util.js';
import AnimalsRepository from './animals.repository.js';

export default class PeopleRepository {
  /**
   * @type {object[]}
   */
  #people = [];

  /**
   * @type {AnimalsRepository}
   */
  #animalsRepository;

  /**
   * @type {ArrayUtil}
   */
  #arrayUtil;

  /**
   * Constructor
   *
   * @param {AnimalsRepository} animalsRepository
   * @param {ArrayUtil} arrayUtil
   */
  constructor(animalsRepository, arrayUtil) {
    this.#animalsRepository = animalsRepository;
    this.#arrayUtil = arrayUtil;
  }

  /**
   * Getter for people
   *
   * @returns {object[]}
   */
  get people() {
    return this.#people;
  }

  /**
   * Setter for people
   *
   * @param {object[]} people
   *
   * @returns {void}
   */
  set people(people) {
    this.#people = people;
  }

  /**
   * Filters people by animal's keyword, it keeps only the people that have animals with names containing the animal keyword
   *
   * @param {string} animalKeyword
   *
   * @returns {PeopleRepository}
   */
  filterByAnimalKeyword = (animalKeyword) => {
    this.#people = this.#people.filter((person) => {
      this.#animalsRepository.animals = person.animals;
      person.animals =
        this.#animalsRepository.filterByAnimalKeyword(animalKeyword).animals;
      return !this.#arrayUtil.checkEmpty(person.animals);
    });
    return this;
  };

  /**
   * Counts the number animals of each person and adds that number as a suffix to their names
   *
   * @returns {PeopleRepository}
   */
  countAnimals = () => {
    this.#people = this.#people.map((person) => {
      person.name = `${person.name} [${person.animals.length}]`;
      return person;
    });
    return this;
  };
}
