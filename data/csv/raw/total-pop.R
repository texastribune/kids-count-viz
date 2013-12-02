unemployed = read.csv("Unemployment.csv")
child_poverty = read.csv("Poverty (0-17).csv")
pop = read.csv("Total population.csv")
child = read.csv("Total child population.csv")

unemployed = subset(unemployed, TimeFrame == 2011)
names(unemployed)[4] = "Unemployment"
child_poverty = subset(child_poverty, TimeFrame == 2011)
names(child_poverty)[4] = "Child Poverty"

pop = subset(pop, TimeFrame == 2011)
names(pop)[4] = "Total"
child = subset(child, TimeFrame == 2011)
names(child)[4] = "Child"

child_unem = merge(child_poverty, unemployed, by=c("Location", "TimeFrame", "DataFormat"))
data = subset(data, DataFormat == "Number")
child_pop = merge(child, pop, by=c("Location", "TimeFrame", "DataFormat"))

data = merge(child_unem, child_pop, by=c("Location", "TimeFrame", "DataFormat"))

write(data, "total-pop.csv")
