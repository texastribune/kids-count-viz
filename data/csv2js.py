import csv

f = open('data.csv')
reader = csv.reader(f)

tracked_counties = []
child = []
unemployment = []

reader.next()

for row in reader:
    if row[1] not in tracked_counties:
        tracked_counties.append(row[1])

        child_data = {}
        child_data['name'] = row[1]
        child_data['color'] = '#8321FF'
        child_data['data'] = [(float(row[4]))]
        child.append(child_data)

        unemployment_data = {}
        unemployment_data['name'] = row[1]
        unemployment_data['color'] = '#B27700'
        unemployment_data['data'] = [(float(row[6]))]
        unemployment.append(unemployment_data)
    else:
        for d in child:
            if d['name'] == row[1]:
                d['data'].append(float(row[4]))

        for d in unemployment:
            if d['name'] == row[1]:
                d['data'].append(float(row[6]))

for d in unemployment:
    child.append(d)

print child
