import AnimalsRepository from '../../src/repositories/animals.repository';

describe('AnimalRepository test suite', () => {
  const animalsRepository = new AnimalsRepository();
  beforeEach(() => {
    animalsRepository.animals = [
      {
        name: 'TestRy',
      },
      {
        name: 'Test',
      },
    ];
  });

  it('Should return only animale containing ry', () => {
    expect(animalsRepository.filterByAnimalKeyword('ry').animals).toEqual([
      {
        name: 'TestRy',
      },
    ]);
  });
});
