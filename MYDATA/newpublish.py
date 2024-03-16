import csv
import requests
import time

# Function to send data to API
def send_data_to_api(data):
    url = "http://127.0.0.1:8000/api/exoplanets/"
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 201:
        print("Data sent successfully.")
    else:
        print("Failed to send data. Status code:", response.status_code)

# Read data from CSV and send it to API
def main():
    csv_file = "cleaned_data.csv"
    with open(csv_file, newline='') as file:
        reader = csv.DictReader(file)
        for row in reader:
            data = {
                "pl_name": row["pl_name"],
                "hostname": row["hostname"],
                "sy_snum": int(row["sy_snum"]),
                "sy_pnum": int(row["sy_pnum"]),
                "discoverymethod": row["discoverymethod"],
                "disc_year": int(row["disc_year"])
            }
            send_data_to_api(data)
            time.sleep(1)

if __name__ == "__main__":
    main()


# import pandas as pd

# # Read data from CSV
# df = pd.read_csv('kepler121.csv')


# df = df.drop_duplicates()
# df.to_csv('cleaned_data.csv', index=False)
# print(df)
