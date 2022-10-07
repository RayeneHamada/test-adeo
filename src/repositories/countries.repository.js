'use strict';
import PeopleRepository from './people.repository.js';

export default class CountriesRepository {
  /**
   * @type {object[]}
   */
  #countries = [];

  /**
   * @type {PeopleRepository}
   */
  #peopleRepository;

  /**
   * @type {ArrayUtil}
   */
  #arrayUtil;

  /**
   * Constructor
   *
   * @param {PeopleRepository} peopleRepository
   * @param {ArrayUtil} arrayUtil
   */
  constructor(peopleRepository, arrayUtil) {
    this.#peopleRepository = peopleRepository;
    this.#arrayUtil = arrayUtil;
  }

  /**
   * Getter for countries
   *
   * @returns {object[]}
   */
  get countries() {
    return this.#countries;
  }

  /**
   * Setter for countries
   *
   * @param {object[]} countries
   *
   * @returns {void}
   */
  set countries(countries) {
    this.#countries = countries;
  }

  /**
   * Filters countries by animal's keyword, it keeps only the countries that have people that have animals with names containing the animal keyword
   *
   * @param {string} animalKeyword
   *
   * @returns {CountriesRepository}
   */
  filterByAnimalKeyword = (animalKeyword) => {
    this.#countries = this.#countries.filter((country) => {
      this.#peopleRepository.people = country.people;
      country.people =
        this.#peopleRepository.filterByAnimalKeyword(animalKeyword).people;
      return !this.#arrayUtil.checkEmpty(country.people);
    });
    return this;
  };

  /**
   * Counts the number of child elements in each countries and people and adds the number as a suffix to their names
   *
   * @returns {CountriesRepository}
   */
  countPeople = () => {
    this.#countries = this.#countries.map((country) => {
      country.name = `${country.name} [${country.people.length}]`;
      this.#peopleRepository.people = country.people;
      country.people = this.#peopleRepository.countAnimals().people;
      return country;
    });
    return this;
  };
}
