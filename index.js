const fs = require("fs")
const { parse } = require("csv-parse")
const json2csv = require("json2csv")

let arrOfRows = []
let results = []
const start = Date.now();
class CleanLine {
    constructor(id, name, testId, testName, suspectedFailureType, status) {
        this.ID = id
        this.Name = name
        this["Test ID"] = testId
        this["Test Name"] = testName
        this["Suspected Failure Type"] = suspectedFailureType
        this.Status = status
    }
}
// Open csv file, parse on ',' and use the first row as headers when creating objects.  
fs.createReadStream("./file.csv")
.pipe(parse({delimiter: ",", columns: true, ltrim: true}))
.on("data", function(row) {
    arrOfRows.push(row)
})
.on("error", function(err) {
    console.error(err.message)
})
.on("end", function() {    
    for(let line of arrOfRows) {
        if(line.Status === 'Awaiting User Confirmation') {
            // Clean each object before pushing it to results array
            // Previous Idea
            // delete line["26"]
            // delete line["67"]
            // delete line["272"]
            // delete line["Completion time"]
            // delete line.Email
            // delete line.Comments
            // delete line["File Uploads"]
            // delete line["Assigned To"]
            // delete line["Monday ID"]
            // delete line.Comments2
            // delete line[""]
            // delete line['Not tracked/New']
            // delete line['Open:']
            // delete line["Awaiting User Confirmation"]
            // delete line["Total Issues (minus Invalid)"]

            const aucLine = new CleanLine(line.ID, line.Name, line["Test ID"], line["Test Name"], line["Suspected Failure Type"], line.Status)
            results.push(aucLine)
        }
    }
    // before converting to CSV sort the array alphabetically
    results.sort((a, b) => a.Name.localeCompare(b.Name))
    const csvData = json2csv.parse(results)
    // Write CSV file to desktop folder 
    fs.writeFile('/mnt/c/Users/Justin/Desktop/tableoutput/output.csv', csvData, function(err) {
        if(err) {
            return console.error(err)
        }
        const end = Date.now()
        console.log(`The file was saved in: ${end - start}ms!`)
    })
})