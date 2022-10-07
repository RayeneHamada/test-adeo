'use strict';
import CountriesRepository from '../repositories/countries.repository.js';

export default class CountFilterStrategy {
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
   * Applies count and filter strategy
   *
   * @returns {void}
   */
  apply() {
    this.#countriesRepository.filterByAnimalKeyword(this.#command[1]);
    this.#countriesRepository.countPeople();
  }

  /**
   * Returns whether to support count and filter
   *
   * @param {string[]} args
   *
   * @returns {boolean}
   */
  supports(args) {
    if (args.length < 4) {
      return false;
    }

    this.#command = args[2].includes('=')
      ? args[2].split('=')
      : args[3].split('=');
    if (this.#command.length < 1) {
      return false;
    }
    return (
      (['--filter', '-f'].includes(this.#command[0]) &&
        ['--count', '-c'].includes(args[3])) ||
      (['--filter', '-f'].includes(this.#command[0]) &&
        ['--count', '-c'].includes(args[2]))
    );
  }
}
