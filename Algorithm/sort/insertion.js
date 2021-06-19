function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    // Find the correct sopt to insert
    for (let j = i - 1; j >= 0 && arr[j] > current; j--) {
      // search from the last to first
      // moving a[j] forward one by one
      arr[j + 1] = arr[j];
      console.log(arr);
    }
    arr[j + 1] = current;
    // [1,2,9,20 want to be here,76,76] 20
  }
  return arr;
}

insertionSort([2, 1, 9, 76, 4]);

// [1,2,9,76,0] 0
// [1,2,9,76,76] 0
// [1,2,9,9,76] 0
// [1,2,2,9,76] 0
// [1,1,2,9,76] 0
// [0,1,2,9,76] 0
