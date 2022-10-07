'use strict';
export default class ArrayUtil {
  /**
   * Checks wether if the given array is empty
   *
   * @param {object[]} array
   *
   * @returns {boolean}
   */
  checkEmpty = (array) => {
    return Array.isArray(array) && array.length <= 0;
  };
}
