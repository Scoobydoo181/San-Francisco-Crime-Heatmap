function linearSearch(crimeData: CrimeData, query: string): CrimeData {
    return crimeData.filter( row => row.description.startsWith( query.toLowerCase() ) )
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function makeData(n: number) {
    const output = []
    for(let i = 0; i < n; i++)
        output.push({description: Math.random().toString(36)})
    shuffle(output)
    return output
}

function lessThan(pivot)    { return val => val.description < pivot.description }
function greaterThan(pivot) { return val => val.description > pivot.description }
function equalTo(pivot)     { return val => val.description === pivot.description }

function quicksort(crimeData: CrimeData,/* start: number, end: number*/): /*void*/CrimeData {
    // console.log(start, end)
    // if(end - start <= 1) 
    //     return;

    // const pivotIndex =  start;

    // let low=start+1, 
    //     high=end -1, 
    //     pivot= crimeData[start]
    // while(low <= high) { 
    //     while(crimeData[low].description < pivot.description) 
    //         ++low
    //     while(crimeData[high].description > pivot.description) 
    //         --high

    //     if(low <= high) {
    //         [crimeData[low], crimeData[high]] = [crimeData[high], crimeData[low]]
    //         ++low
    //         --high
    //     }
    // }

    // if(crimeData[Math.min(low, high)].description < crimeData[pivotIndex].description)
    //     [crimeData[pivotIndex], crimeData[Math.min(low, high)]] = [crimeData[Math.min(low, high)], crimeData[pivotIndex]]
    // if(low !== high)
    //     console.log("\t", low, high)

    // quicksort(crimeData, start, Math.min(low, high))
    // quicksort(crimeData, Math.max(low, high), end)
    if(crimeData.length <= 1) return crimeData

    let pivot = crimeData[Math.floor(Math.random() * crimeData.length)];

    let leftPartition = crimeData.filter( lessThan(pivot) )
    let rightPartition = crimeData.filter( greaterThan(pivot) )
    let middle = crimeData.filter( equalTo(pivot) )

    return [...quicksort(leftPartition), ...middle.slice(1), ...quicksort(rightPartition) ]
}

function searchSides(crimeData: CrimeData, query: string, start: number, mid: number, end: number): CrimeData {
    const output: CrimeData = []

    let i = mid -1
    while(i >= start && crimeData[i].description.startsWith(query) ) {
        output.push(crimeData[i])
        i--
    }

    i = mid 
    while(i < end && crimeData[i].description.startsWith(query) ) {
        output.push(crimeData[i])
        i++
    }
    
    return output
}

function depth(node: CrimeDataTree) {
    if(!node)
        return 0
    return Math.max(1 + depth(node.left), 1 + depth(node.right))
}

function arrayBinarySearch(crimeData: CrimeData, query: string, start: number, end: number, savedSort: CrimeData): [CrimeData, CrimeData] {
    if(!savedSort) 
        savedSort = quicksort(crimeData)    
        
    if(query === "")
        return [crimeData, savedSort]
    
    if(end - start === 0)
        return [[], savedSort]

    let mid = Math.floor((end - start) / 2) + start

    if(savedSort[mid].description.startsWith(query))
        return [searchSides(savedSort, query, start, mid, end), savedSort]
    else if(query < savedSort[mid].description)
        return arrayBinarySearch(crimeData, query, start, mid, savedSort)
    else 
        return arrayBinarySearch(crimeData, query, mid, end, savedSort)
}

type CrimeDataTree = undefined | {
    left: CrimeDataTree, 
    right: CrimeDataTree, 
    value: {lat: number, lng: number, description: string}
}

function insertBST(root: CrimeDataTree, node: {lat: number, lng: number, description: string}) {
    let flag: boolean
    if(node.description === root.value.description)
        flag = Math.random() < 0.5

    if(flag === true || node.description < root.value.description)
    {
        if(!root.left)
            root.left = {left: undefined, right: undefined, value: node}
        else
            insertBST(root.left, node)
    }
    else
    {
        if(!root.right)
            root.right = {left: undefined, right: undefined, value: node}
        else
            insertBST(root.right, node)
    }
}

function makeBST(crimeData: CrimeData): CrimeDataTree {
    const [head, ...tail] = crimeData
    let root: CrimeDataTree = {left: undefined, right: undefined, value: head}

    for(const row of tail)
        insertBST(root, row)
    return root
}

function treeBinarySearch(crimeData: CrimeData, query: string, savedBST: CrimeDataTree): [CrimeData, CrimeDataTree] {
    if(!savedBST)
        savedBST = makeBST(crimeData)

    const traverse = (root: CrimeDataTree, query: string): CrimeData => {
        if(!root)
            return []
        else if(root.value.description.startsWith(query))
            return [...traverse(root.left, query), root.value, ...traverse(root.right, query)]    
        else if(query < root.value.description)
            return traverse(root.left, query)
        else 
            return traverse(root.right, query)   
    }

    return [traverse(savedBST, query), savedBST]
}