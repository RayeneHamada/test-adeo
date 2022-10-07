import { jest } from '@jest/globals';
import PeopleRepository from '../../src/repositories/people.repository';
import AnimalsRepository from '../../src/repositories/animals.repository';
import ArrayUtil from '../../src/utils/array.util';

describe('PeopleRepository test suite', () => {
  const animalsRepository = new AnimalsRepository();
  const arrayUtil = new ArrayUtil();
  const peopleRepository = new PeopleRepository(animalsRepository, arrayUtil);
  beforeEach(() => {
    peopleRepository.people = [
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
    ];
  });

  it('Should show the animals matching with the mocked filterByAnimalKeyword on AnimalRepository and test whether animalRepository and checkEmpty are called 2 times', () => {
    jest
      .spyOn(animalsRepository, 'filterByAnimalKeyword')
      .mockImplementation(() => {
        animalsRepository.animals = [
          {
            name: 'TestRy',
          },
        ];
        return animalsRepository;
      });
    jest.spyOn(arrayUtil, 'checkEmpty').mockImplementation(() => {
      return false;
    });
    peopleRepository.filterByAnimalKeyword('ry');
    expect(peopleRepository.people).toEqual([
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
            name: 'TestRy',
          },
        ],
      },
    ]);
    expect(animalsRepository.filterByAnimalKeyword).toBeCalledTimes(2);
    expect(arrayUtil.checkEmpty).toBeCalledTimes(2);
  });

  it('Should remove all people if there are no animals that match mocked condition', () => {
    jest
      .spyOn(animalsRepository, 'filterByAnimalKeyword')
      .mockImplementation(() => {
        animalsRepository.animals = [];
        return animalsRepository;
      });
  });

  jest.spyOn(arrayUtil, 'checkEmpty').mockImplementation(() => {
    return true;
  });
  peopleRepository.filterByAnimalKeyword('ry');
  expect(peopleRepository.people).toEqual([]);

  it('Should return the number of animals for each person as a suffix to its name', () => {
    expect(peopleRepository.countAnimals().people).toEqual([
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
    ]);
  });
});
