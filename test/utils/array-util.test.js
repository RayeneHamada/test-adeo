import ArrayUtil from '../../src/utils/array.util';

describe('ArrayUtil test suite', () => {
  const arrayUtil = new ArrayUtil();

  it('Should return true if empty array', () => {
    expect(arrayUtil.checkEmpty([])).toBeTruthy();
  });

  it('Should return false if not empty array', () => {
    expect(arrayUtil.checkEmpty([{ test: 'rayene' }])).toBeFalsy();
  });

  it('Should return false if not array given', () => {
    expect(arrayUtil.checkEmpty()).toBeFalsy();
  });
});
