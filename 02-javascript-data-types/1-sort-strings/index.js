/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
<<<<<<< HEAD
  const arrCopy = [...arr].sort( (a, b) => new Intl.Collator(["ru", "en-GB", "en-US"], { caseFirst: "upper" }).compare(a, b));
=======
  // const arrCopy = [...arr];
  // if (param === "desc") {
  //     return arrCopy.sort( (a, b) => new Intl.Collator(["ru", "en-GB", "en-US"], {caseFirst: "upper"}).compare(a, b)).reverse();
  // }
  // return arrCopy.sort( (a, b) => new Intl.Collator(["ru", "en-GB", "en-US"], {caseFirst: "upper"}).compare(a, b));
  const arrCopy = [...arr].sort( (a, b) => new Intl.Collator(["ru", "en-GB", "en-US"], {caseFirst: "upper"}).compare(a, b));
>>>>>>> 3d3af561a64de592cc3249991debdad041306dc1
  return param === "desc" ? arrCopy.reverse() : arrCopy;
}
