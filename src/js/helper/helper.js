/**
 * Creates a promise that rejects after a specified number of seconds.
 * @param {number} seconds - The number of seconds before the promise is rejected.
 * @returns {Promise} - A promise that rejects with an error message after the specified number of seconds.
 */
export async function timeOutRejection(seconds) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(
        new Error(
          `Request took too long. Timout after ${seconds} second${
            seconds == 1 ? '' : 's'
          }.`
        )
      );
    }, 1000 * seconds);
  });
}

export function toCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(v => toCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelCaseKey = key.replace(/([-_][a-z])/gi, $1 => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
      });
      result[camelCaseKey] = toCamelCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
}
