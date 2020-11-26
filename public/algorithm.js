function linearSearch(crimeData, query) {
    //Yields a list with only the elements of crimeData with descriptions that start with query
    return crimeData.filter(({ description }) => description.startsWith(query));
}
//Comparators, used by quicksort()
const lessThan = pivot => val => val.description < pivot.description;
const greaterThan = pivot => val => val.description > pivot.description;
const equalTo = pivot => val => val.description === pivot.description;
function quicksort(crimeData) {
    if (crimeData.length <= 1)
        return crimeData;
    let pivot = crimeData[Math.floor(Math.random() * crimeData.length)];
    let leftPartition = crimeData.filter(lessThan(pivot));
    let rightPartition = crimeData.filter(greaterThan(pivot));
    let middle = crimeData.filter(equalTo(pivot));
    return [...quicksort(leftPartition), ...middle.slice(1), ...quicksort(rightPartition)];
}
function searchSides(crimeData, query, start, mid, end) {
    //Used by binarySearchArray to get all elements with equal descriptions
    const output = [];
    //Get all elements on the left
    let i = mid - 1;
    while (i >= start && crimeData[i].description.startsWith(query)) {
        output.push(crimeData[i]);
        i--;
    }
    //Get all elements on the right
    i = mid;
    while (i < end && crimeData[i].description.startsWith(query)) {
        output.push(crimeData[i]);
        i++;
    }
    return output;
}
function arrayBinarySearch(crimeData, query, start, end, savedSort) {
    if (!savedSort)
        savedSort = quicksort(crimeData);
    if (query === "")
        return [crimeData, savedSort];
    if (end - start === 0)
        return [[], savedSort];
    let mid = Math.floor((end - start) / 2) + start;
    if (savedSort[mid].description.startsWith(query))
        return [searchSides(savedSort, query, start, mid, end), savedSort];
    else if (query < savedSort[mid].description)
        return arrayBinarySearch(crimeData, query, start, mid, savedSort);
    else
        return arrayBinarySearch(crimeData, query, mid, end, savedSort);
}
function insertBST(root, node) {
    //Inserts the data into its proper place in the given binary search tree
    let flag;
    if (node.description === root.value.description)
        flag = Math.random() < 0.5;
    if (flag === true || node.description < root.value.description) {
        if (!root.left)
            root.left = { left: undefined, right: undefined, value: node };
        else
            insertBST(root.left, node);
    }
    else {
        if (!root.right)
            root.right = { left: undefined, right: undefined, value: node };
        else
            insertBST(root.right, node);
    }
}
function makeBST(crimeData) {
    //Repeatedly inserts the data into a binary search tree
    const [head, ...tail] = crimeData;
    let root = { left: undefined, right: undefined, value: head };
    for (const { lat, lng, description } of tail)
        insertBST(root, { lat, lng, description: description.toLowerCase() });
    return root;
}
function treeBinarySearch(crimeData, query, savedBST) {
    //Search through the BST until a node with a description that starts with query is found
    if (!savedBST)
        savedBST = makeBST(crimeData);
    const traverse = (root, query) => {
        //Binary search, collecting all values that match the query
        if (!root)
            return [];
        else if (root.value.description.startsWith(query))
            return [...traverse(root.left, query), root.value, ...traverse(root.right, query)];
        else if (query < root.value.description)
            return traverse(root.left, query);
        else
            return traverse(root.right, query);
    };
    return [traverse(savedBST, query), savedBST];
}
