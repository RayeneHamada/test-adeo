import CountriesRepository from '../repositories/countries.repository.js';

export default class FilterStrategy {
  /**
   * @type {CountriesRepository}
   */
  #countriesRepository;

  /**
   * @type {string}
   */
  #command;

  /**
   * Constructor class
   *
   * @param {CountriesRepository} countriesRepository
   */
  constructor(countriesRepository) {
    this.#countriesRepository = countriesRepository;
  }

  /**
   * Applies filter strategy
   *
   * @returns {void}
   */
  apply() {
    this.#countriesRepository.filterByAnimalKeyword(this.#command[1]);
  }

  /**
   * Returns whether to support filter strategy
   *
   * @param {string[]} args
   *
   * @returns {boolean}
   */
  supports(args) {
    if (args.length < 3) {
      return false;
    }
    this.#command = args[2].split('=');
    if (this.#command.length < 2) {
      return false;
    }
    return this.#command[0] === '--filter' || this.#command[0] === '-f';
  }
}
