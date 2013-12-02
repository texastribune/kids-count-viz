raw_child = read.csv("Poverty (0-17).csv")
raw_un = read.csv("Unemployment.csv")

un_yr = subset(subset(raw_un, TimeFrame >= 2001), TimeFrame < 2012)
un_child = subset(subset(raw_child, TimeFrame >= 2001), TimeFrame < 2012)

full_data = merge(un_child, un_yr, by=c("Location", "TimeFrame", "DataFormat"))

names(full_data)[4] = "Child"
names(full_data)[5] = "Unemployment"

write.csv(full_data, "full_data.csv")
