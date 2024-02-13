import pandas as pd
data=pd.read_csv('demo.csv')
newdata=pd.DataFrame(data)

print("Rows=",newdata.shape[0])
print("Cols=",newdata.shape[1])