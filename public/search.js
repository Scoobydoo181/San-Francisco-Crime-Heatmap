let savedBST;
let savedSort;
function handleSearch(crimeData) {
    const searchQuery = document.querySelector("input[type=search]").value.toLowerCase();
    const reuseSort = document.querySelector('input[type=checkbox]').checked;
    let searchType;
    document.getElementsByName("searchType").forEach((elem) => {
        if (elem.checked)
            searchType = elem.id;
    });
    let output;
    const startTime = Date.now();
    switch (searchType) {
        case "quicksort":
            //In JS, && returns the first operand if it is undefined or false, and the second operand otherwise
            [output, savedSort] = arrayBinarySearch(crimeData, searchQuery, 0, crimeData.length, reuseSort && savedSort);
            break;
        case "bst":
            [output, savedBST] = treeBinarySearch(crimeData, searchQuery, reuseSort && savedBST);
            break;
        case "linear":
            output = linearSearch(crimeData, searchQuery);
        default:
            break;
    }
    const endTime = Date.now();
    document.querySelector("#results h4:first-of-type + p").innerHTML = output.length.toString();
    document.querySelector("#results h4:last-of-type + p").innerHTML = (endTime - startTime).toString() + "ms";
    return output;
}
