function quickSort(arr, depth = 0) {
    const indent = '  '.repeat(depth);
    console.log(`${indent}quickSort called with array: [${arr}]\n`);
    
    if (arr.length <= 1) {
        console.log(`${indent}Array length <= 1, returning: [${arr}]\n`);
        return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    console.log(`${indent}Pivot selected: ${pivot} (at index ${Math.floor(arr.length / 2)})`);
    const left = [];
    const middle = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            console.log(`${indent}${arr[i]} <= ${pivot}, adding to left array`);
            left.push(arr[i]);
        } else if (arr[i] > pivot) {
            console.log(`${indent}${arr[i]} > ${pivot}, adding to right array`);
            right.push(arr[i]);
        } else {
            console.log(`${indent}${arr[i]} == ${pivot}, adding to middle array`);
            middle.push(arr[i]);
        }
    }

    console.log(`${indent}Left array: [${left}], Right array: [${right}]\n`);
    console.log(`${indent}Recursively sorting left and right arrays...`);
    
    const result = [...quickSort(left, depth + 1), ...middle, ...quickSort(right, depth + 1)];
    console.log(`${indent}Returning sorted array: [${result}]`);
    return result;
}

const arr = [3, 6, 8, 10, 1, 2, 1];
console.log("Original array:", arr);
console.log("Sorted array:", quickSort(arr));
