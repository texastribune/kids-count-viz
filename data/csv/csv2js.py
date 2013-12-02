import csv

f = open("poverty-unemployment.csv")
reader = csv.reader(f)

tracked_counties = []
child = []
unemployment = []

reader.next()

for row in reader:
    if row[3] == "Percent":
        if row[1] not in tracked_counties:
            tracked_counties.append(row[1])

            child_data = {}
            child_data["county"] = row[1]
            child_data["pct_poverty_child"] = [(float(row[4]))]
            child.append(child_data)

            unemployment_data = {}
            unemployment_data["county"] = row[1]
            unemployment_data["pct_unemployment"] = [(float(row[5]))]
            unemployment.append(unemployment_data)
        else:
            for d in child:
                if d["county"] == row[1]:
                    d["pct_poverty_child"].append(float(row[4]))

            for d in unemployment:
                if d["county"] == row[1]:
                    d["pct_unemployment"].append(float(row[5]))

for d in unemployment:
    child.append(d)

pop = open("total-pop.csv")
pop_reader = csv.reader(pop)
pop_reader.next()

for row in pop_reader:
    for d in child:
        if d["county"] == row[1]:
            d["poverty_raw_children"] = int(row[4])
            d["unemployment_raw"] = int(row[5])
            d["child_pop"] = int(row[6])
            d["pop"] = int(row[7])
print child
