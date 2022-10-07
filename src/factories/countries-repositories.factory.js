'use strict';
import CountriesRepository from '../repositories/countries.repository.js';
import PeopleRepository from '../repositories/people.repository.js';
import AnimalsRepository from '../repositories/animals.repository.js';
import ArrayUtil from '../utils/array.util.js';

export default class CountriesRepositoryFactory {
  /**
   * Returns an instance of CountriesRepository
   *
   * @returns {CountriesRepository}
   */
  create() {
    const arrayUtil = new ArrayUtil();
    const animalsRepository = new AnimalsRepository();
    const peopleRepository = new PeopleRepository(animalsRepository, arrayUtil);
    return new CountriesRepository(peopleRepository, arrayUtil);
  }
}
