function merge(left, right) {
  var result = [],
    il = 0,
    ir = 0;
  while (il < left.length && ir < right.length) {
    // 加到result的那一組下一次key往下加一，在跟另一組相比，重複
    // left[0]>right[0]
    // left[0]-> result
    // right[0]->right.slice(ir)
    // 4>5 => result=[4], right.slice(0) = 5

    // left =[2]
    // right = [1,6]
    // 1. 2>1 => result=[1];
    // 2. 2<6 => result=[1,2]; right.slice(0)=6

    if (left[il] < right[ir]) {
      result.push(left[il++]);
    } else {
      result.push(right[ir++]);
    }
  }
  // if left[il] < right[ir] => left[il]進result; right[ir]走right.slice(ir)
  // 小的往前放，大的數字往後丟
  while (il < left.length) {
    result.push(left[il]);
    il++;
  }
  while (ir < right.length) {
    result.push(right[ir]);
    ir++;
  }
  // const a = result.concat(left.slice(il)).concat(right.slice(ir));
  // console.log(a);
  return result;
}

// return [1]
function mergeSort(items) {
  // Terminal case: 0 or 1 item arrays don't need sorting
  if (items.length <= 1) return items;
  var middle = Math.floor(items.length / 2),
    left = items.slice(0, middle),
    right = items.slice(middle);
  console.log(left);
  console.log(right);
  const templeft = mergeSort(left);
  const tempright = mergeSort(right);
  // 最終會只剩下一個element
  console.log(templeft);
  console.log(tempright);
  // 接著會按照element的個數升冪重排給入merge
  const a = merge(templeft, tempright);
  console.log(a);
  return a;
}

const a = mergeSort([4, 5, 2, 1, 6]);
