/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const arrCopy = [...arr].sort( (a, b) => new Intl.Collator(["ru", "en-GB", "en-US"], {caseFirst: "upper"}).compare(a, b));
  return param === "desc" ? arrCopy.reverse() : arrCopy;
}
