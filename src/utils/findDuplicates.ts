export default function findDuplicates(arr: number[]) {
  const ans = [];

  // traverse each element in the array
  for (let i = 0; i < arr.length; i++) {
    let cnt = 0;

    // check if element is already added to result
    for (let it of ans) {
      if (arr[i] === it) {
        cnt++;
        break;
      }
    }

    // if already added, skip checking again
    if (cnt > 0) continue;

    // check if current element appears again
    // in the rest of the array
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        cnt++;
        break;
      }
    }

    // if duplicate found, add to result
    if (cnt > 0) ans.push(arr[i]);
  }

  return ans;
}
