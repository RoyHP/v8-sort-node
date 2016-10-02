var heapSort = (function () {
    function heapify(array, index, heapSize) {
        var left = 2 * index + 1,
            right = 2 * index + 2,
            largest = index

        if (left < heapSize && array[left] > array[index])
            largest = left

        if (right < heapSize && array[right] > array[largest])
            largest = right

        if (largest !== index) {
            let temp = array[index]
            array[index] = array[largest]
            array[largest] = temp
            heapify(array, largest, heapSize)
        }
    }

    function buildMaxHeap(array) {
        for (var i = Math.floor(array.length / 2); i >= 0; i -= 1) {
            heapify(array, i, array.length)
        }
        return array
    }

    return array => {
        var size = array.length,
            temp
        buildMaxHeap(array) // O(n)
        for (var i = array.length - 1; i > 0; i -= 1) {
            temp = array[0]
            array[0] = array[i]
            array[i] = temp
            size -= 1
            heapify(array, 0, size)
        }
        return array
    }
}())

var quickSort = (function () {

    function partition(array, left, right) {
        var cmp = array[right - 1],
            minEnd = left,
            maxEnd;
        for (maxEnd = left; maxEnd < right - 1; maxEnd += 1) {
            if (array[maxEnd] <= cmp) {
                swap(array, maxEnd, minEnd);
                minEnd += 1;
            }
        }
        swap(array, minEnd, right - 1);
        return minEnd;
    }

    function swap(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return array;
    }

    function quickSort(array, left, right) {
        if (left < right) {
            var p = partition(array, left, right);
            quickSort(array, left, p);
            quickSort(array, p + 1, right);
        }
        return array;
    }

    return function (array) {
        return quickSort(array, 0, array.length);
    };
}());

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}
console.time("generateArray")
var array = []
for (i = 0; i < 100000; i++) {
	array[i] = getRandomInt(0, 10000000)
}
console.timeEnd("generateArray")
console.time("heapSort")
var heapResult = heapSort(array)
console.timeEnd("heapSort")
console.time("quickSort")
var quickResult = quickSort(array)
console.timeEnd("quickSort")
console.time("nativeSort")
var nativeResult = array.sort((a, b) => {
	return a - b
})
console.timeEnd("nativeSort")
console.dir(heapResult)
console.dir(quickResult)
console.dir(nativeResult)
