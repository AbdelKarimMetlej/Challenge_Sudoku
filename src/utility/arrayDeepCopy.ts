const arrayDeepCopy = <T>(arr: T[]): T[] => {
  // Create a deep copy of the array using JSON methods
  let newArray = JSON.parse(JSON.stringify(arr));
  return newArray;
};

export default arrayDeepCopy;
