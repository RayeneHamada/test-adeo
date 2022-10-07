import { jest } from '@jest/globals';
import CountriesRepository from '../../src/repositories/countries.repository';
import PeopleRepository from '../../src/repositories/people.repository';
import ArrayUtil from '../../src/utils/array.util';

describe('CountriesRepository test suite', () => {
  const peopleRepository = new PeopleRepository();
  const arrayUtil = new ArrayUtil();
  const countriesRepository = new CountriesRepository(
    peopleRepository,
    arrayUtil
  );
  beforeEach(() => {
    countriesRepository.countries = [
      {
        name: 'France',
        people: [
          {
            name: 'Rayene',
            animals: [
              {
                name: 'TestRy',
              },
            ],
          },
          {
            name: 'Jean',
            animals: [
              {
                name: 'Test',
              },
            ],
          },
        ],
      },
      {
        name: 'Germany',
        people: [
          {
            name: 'Rayene',
            animals: [
              {
                name: 'Test',
              },
            ],
          },
          {
            name: 'Jean',
            animals: [
              {
                name: 'Test',
              },
            ],
          },
        ],
      },
    ];
  });

  it('Should show the animals matching with the mocked filterByAnimalKeyword on AnimalRepository and test whether animalRepository and checkEmpty are called 2 times', () => {
    jest
      .spyOn(peopleRepository, 'filterByAnimalKeyword')
      .mockImplementation(() => {
        peopleRepository.people = [
          {
            name: 'Rayene',
            animals: [
              {
                name: 'TestRy',
              },
            ],
          },
        ];
        return peopleRepository;
      });
    jest.spyOn(arrayUtil, 'checkEmpty').mockImplementation(() => {
      return false;
    });
    countriesRepository.filterByAnimalKeyword('ry');
    expect(countriesRepository.countries).toEqual([
      {
        name: 'France',
        people: [
          {
            name: 'Rayene',
            animals: [
              {
                name: 'TestRy',
              },
            ],
          },
        ],
      },
      {
        name: 'Germany',
        people: [
          {
            name: 'Rayene',
            animals: [
              {
                name: 'TestRy',
              },
            ],
          },
        ],
      },
    ]);
    expect(peopleRepository.filterByAnimalKeyword).toBeCalledTimes(2);
    expect(arrayUtil.checkEmpty).toBeCalledTimes(2);
  });

  it('Should remove all countries if theres no people that matchnig mochked condition', () => {
    jest
      .spyOn(peopleRepository, 'filterByAnimalKeyword')
      .mockImplementation(() => {
        peopleRepository.people = [];
        return peopleRepository;
      });
  });

  jest.spyOn(arrayUtil, 'checkEmpty').mockImplementation(() => {
    return true;
  });
  countriesRepository.filterByAnimalKeyword('ry');
  expect(countriesRepository.countries).toEqual([]);

  it('Should return the number of people for each country as a suffix to its name', () => {
    expect(countriesRepository.countPeople().countries).toEqual([
      {
        name: 'France [2]',
        people: [
          {
            name: 'Rayene [1]',
            animals: [
              {
                name: 'TestRy',
              },
            ],
          },
          {
            name: 'Jean [1]',
            animals: [
              {
                name: 'Test',
              },
            ],
          },
        ],
      },
      {
        name: 'Germany [2]',
        people: [
          {
            name: 'Rayene [1]',
            animals: [
              {
                name: 'Test',
              },
            ],
          },
          {
            name: 'Jean [1]',
            animals: [
              {
                name: 'Test',
              },
            ],
          },
        ],
      },
    ]);
  });
});
