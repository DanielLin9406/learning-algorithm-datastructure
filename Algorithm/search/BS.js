// Goal: Find a value in a sorted array
// Input: sorted array and value
// Two Pointers as lower and upper bound: left pointer comes before right pointers
// One Pointer in the middle return a value
// 1. if you find the value, return the index
// 2. if the value is too small, up left pointer
// 3. if the value is too big, down right pointer
// 4. if you never find the value, return -1

// remember think from bottom-up
console.log(binarySearch([1, 2, 3, 4, 5], 5)); // 1

function binarySearch(sorted, value) {
  let lowerBoundP = 0;
  let upperBoundP = sorted.length - 1;
  let middleP;
  while (sorted[middleP] != value && lowerBoundP <= upperBoundP) {
    if (value < sorted[middleP]) {
      upperBoundP = middleP - 1;
    } else if (value > sorted[middleP]) {
      lowerBoundP = middleP + 1;
    }
    middleP = Math.floor((upperBoundP + lowerBoundP) / 2);
  }
  if (sorted[middleP] == value) {
    return middleP;
  } else {
    return -1;
  }
}
