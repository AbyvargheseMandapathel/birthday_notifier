import csv
from datetime import datetime, timedelta
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

load_dotenv()

def read_csv_file(file_path, column_index, delimiter=','):
    try:
        today = datetime.now().strftime("%d/%m")  
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%d/%m")
        with open(file_path, 'r') as file:
            reader = csv.reader(file, delimiter=delimiter)
            next(reader)  
            birthday_found = False
            for row in reader:
                if check_birthday(row[column_index], row[0], today, tomorrow):  
                    birthday_found = True
            if not birthday_found:
                print("No birthdays today or tomorrow.")
                log_event("No birthdays today or tomorrow.")
    except FileNotFoundError:
        print(f"File '{file_path}' not found.")
        log_event(f"File '{file_path}' not found.")
    except Exception as e:
        print(f"Error reading CSV file: {e}")
        log_event(f"Error reading CSV file: {e}")

def check_birthday(birthday, column1_data, today, tomorrow):
    try:
        if '/' in birthday:
            parts = birthday.split('/')
        elif '-' in birthday:
            parts = birthday.split('-')
        else:
            raise ValueError("Invalid date format")
            
        if len(parts) == 3: 
            day, month, year = map(int, parts)
            if day == datetime.now().day and month == datetime.now().month:
                send_email(column1_data, "today")
                log_event(f"Birthday alert for {column1_data}: today.")
                return True
            elif day == (datetime.now() + timedelta(days=1)).day and month == (datetime.now() + timedelta(days=1)).month:
                send_email(column1_data, "tomorrow")
                log_event(f"Birthday alert for {column1_data}: tomorrow.")
                return True
        else:
            raise ValueError("Invalid date format")
    except (ValueError, IndexError) as e:
        print(f"Error parsing date '{birthday}': {e}")
        log_event(f"Error parsing date '{birthday}': {e}")
    return False

def send_email(username, event):
    smtp_server = os.getenv('SMTP_SERVER')
    smtp_port = int(os.getenv('SMTP_PORT'))
    sender_email = os.getenv('SENDER_EMAIL')
    receiver_emails = os.getenv('RECEIVER_EMAILS').split(',')  
    password = os.getenv('PASSWORD')
    
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = ', '.join(receiver_emails)  
    if event == "today":
        message['Subject'] = f'Birthday Reminder: {username} has a birthday today!'
        body = f'Hello,\n\nJust a reminder that today is {username}\'s birthday. Don\'t forget to wish them!'
    elif event == "tomorrow":
        message['Subject'] = f'Birthday Reminder: {username} has a birthday tomorrow!'
        body = f'Hello,\n\nJust a heads-up that tomorrow is {username}\'s birthday. Remember to plan something special!'
    else:
        return
    
    message.attach(MIMEText(body, 'plain'))
    
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_emails, message.as_string())
        print(f"Email sent for {event}: {username}")
        log_event(f"Email sent for {event}: {username}")

def log_event(message):
    with open('log.txt', 'a') as log_file:
        log_file.write(f"{datetime.now()} - {message}\n")

file_path = 'birthday.csv'
column_index = 1
read_csv_file(file_path, column_index)

#test
