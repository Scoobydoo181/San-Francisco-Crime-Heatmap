type CrimeData = {lat: number, lng: number, description: string}[]

let savedBST: CrimeDataTree
let savedSort: CrimeData

function handleSearch(crimeData: CrimeData) {
    const searchQuery: string = (document.querySelector("input[type=search]") as HTMLInputElement).value

    const reuseSort: boolean = (document.querySelector('input[type=checkbox]') as HTMLInputElement).checked

    let searchType: "quicksort" | "bst" | "linear"
    document.getElementsByName("searchType").forEach( (elem: HTMLInputElement) => {
        if(elem.checked) 
            searchType = elem.id as "quicksort" | "bst" | "linear"
    })
    
    let output: CrimeData
    const startTime = Date.now()
    switch(searchType) {
        case "quicksort":
            //In JS, && returns the first operand if it is undefined or false, and the second operand otherwise
            [output, savedSort] = arrayBinarySearch(crimeData, searchQuery, 0, crimeData.length, reuseSort && savedSort)
            break;
        case "bst":
            [output, savedBST] = treeBinarySearch(crimeData, searchQuery, reuseSort && savedBST)  
            break;
        case "linear":
            output = linearSearch(crimeData, searchQuery)
        default:
            break
    }
    const endTime = Date.now()
    
    document.querySelector("#results h4:first-of-type + p").innerHTML = output.length.toString()
    document.querySelector("#results h4:last-of-type + p").innerHTML = (endTime - startTime).toString() + "ms"

    return output
}