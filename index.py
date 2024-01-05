import csv
import json
import time

arrOfRows = []
results = []

class CleanLine:
    def __init__(self, id, name, testId, testName, suspectedFailureType, status):
        self.ID = id
        self.Name = name
        self["Test ID"] = testId
        self["Test Name"] = testName
        self["Suspected Failure Type"] = suspectedFailureType
        self.Status = status

# Open csv file, parse on ',' and use the first row as headers when creating objects.
with open("./file.csv", "r") as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        arrOfRows.append(row)

for line in arrOfRows:
    if line["Status"] == 'Awaiting User Confirmation':
        # Clean each object before pushing it to results array
        # Previous Idea
        # del line["26"]
        # del line["67"]
        # del line["272"]
        # del line["Completion time"]
        # del line.Email
        # del line.Comments
        # del line["File Uploads"]
        # del line["Assigned To"]
        # del line["Monday ID"]
        # del line.Comments2
        # del line[""]
        # del line['Not tracked/New']
        # del line['Open:']
        # del line["Awaiting User Confirmation"]
        # del line["Total Issues (minus Invalid)"]
        aucLine = CleanLine(line["ID"], line["Name"], line["Test ID"], line["Test Name"], line["Suspected Failure Type"], line["Status"])
        results.append(aucLine)

# before converting to CSV sort the array alphabetically
results.sort(key=lambda x: x.Name)

csvData = json.dumps([obj.__dict__ for obj in results])
# Write CSV file to desktop folder
with open('/mnt/c/Users/Justin/Desktop/tableoutput/output.csv', 'w') as file:
    file.write(csvData)

end = time.time()
print(f"The file was saved in: {end - start}ms!")


