from flask import Flask, render_template
import csv

app = Flask(__name__)

def read_csv_file(file_path):
    data = []
    try:
        with open(file_path, 'r') as file:
            reader = csv.reader(file)
            next(reader)  # Skip header row
            for row in reader:
                data.append(row)
    except FileNotFoundError:
        print(f"File '{file_path}' not found.")
    return data

@app.route('/')
def index():
    data = read_csv_file('birthday.csv')
    return render_template('index.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)
