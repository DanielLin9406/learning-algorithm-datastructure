// If current value is bigger than next one, the bigger one bubble up.

function bubbleSort(array = []) {
  let swaps;
  do {
    swaps = false;
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        let smallOne = array[i + 1];
        // Bubble up
        array[i + 1] = array[i];
        // Restore small one
        array[i] = smallOne;
        swaps = true;
      }
    }
  } while (swaps);

  return array;
}

function bubbleSortRecursive(array, currentIndex = array.length - 1) {
  if (currentIndex === 0) {
    return array;
  }
  for (let i = 0; i < currentIndex; i++) {
    if (array[i] > array[i + 1]) {
      let smallOne = array[i + 1];
      // Bubble up
      array[i + 1] = array[i];
      // Restore small one
      array[i] = smallOne;
    }
  }

  return bubbleSortRecursive(array, currentIndex - 1);
}

bubbleSort([1, 3, 9, 2]);
bubbleSortRecursive([1, 3, 9, 2]);

// 只跑一次的話，若大數字沒有相鄰，Bubble up failed
// [4, 9, 8, 2] => [4,8,2,9]
// 需要再跑一次，直到相鄰的下一個數比上一個樹大為止。
