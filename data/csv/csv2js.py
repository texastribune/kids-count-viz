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
            child_data["pct_unemployment"] = [(float(row[5]))]
            child.append(child_data)

            unemployment_data = {}
            unemployment_data["county"] = row[1]
            unemployment.append(unemployment_data)
        else:
            for d in child:
                if d["county"] == row[1]:
                    d["pct_poverty_child"].append(float(row[4]))
                    d["pct_unemployment"].append(float(row[5]))


def importData(reader, field_name, pos):
    for row in reader:
        for d in child:
            if d["county"] == row[0]:
                key = str(row[2] + '-' + str(row[1]))
                try:
                    d[field_name][key] = int(row[pos])
                except KeyError:
                    d[field_name] = {}
                    d[field_name][key] = int(row[pos])
                except ValueError:
                    d[field_name][key] = float(row[pos])

pop = open("pop.csv")
pop_reader = csv.reader(pop)
pop_reader.next()
importData(pop_reader, "pop", 3)

child_pop = open("child-population.csv")
child_pop_reader = csv.reader(child_pop)
child_pop_reader.next()
importData(child_pop_reader, "child_pop", 3)

poverty = open("poverty-2-years.csv")
poverty_reader = csv.reader(poverty)
poverty_reader.next()
importData(poverty_reader, "poverty_raw_children", 3)

unemp = open("unemp.csv")
unemp_reader = csv.reader(unemp)
unemp_reader.next()
importData(unemp_reader, "unemployment_raw", 3)

print child
