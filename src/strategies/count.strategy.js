'use strict';
import CountriesRepository from '../repositories/countries.repository.js';

export default class CountStrategy {
  /**
   * @type {CountriesRepository}
   */
  #countriesRepository;

  /**
   * Constructor class
   *
   * @param {CountriesRepository} countriesRepository
   */
  constructor(countriesRepository) {
    this.#countriesRepository = countriesRepository;
  }

  /**
   * Applies count strategy
   *
   * @returns {void}
   */
  apply() {
    this.#countriesRepository.countPeople();
  }

  /**
   * Returns whether to support count
   *
   * @param {string[]} args
   *
   * @returns {boolean}
   */
  supports(args) {
    if (args.length < 3) {
      return false;
    }
    return args[2] === '--count' || args[2] === '-c';
  }
}
