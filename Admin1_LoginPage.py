from flask import Flask, request
import sqlite3

Admin1_LoginPageApp = Flask(__name__)

@Admin1_LoginPageApp.route('/adminlogin', methods=['POST'])
def admin_login():
    username = request.form['uname']
    password = request.form['pword']
   
    conn = sqlite3.connect('train_booking.sql') 
    cursor = conn.cursor()

    
    cursor.execute("SELECT * FROM admin" )

    rows = cursor.fetchall()

    conn.close()
    data_2d_array = [list(row) for row in rows]

    for row in data_2d_array:

        if row[0] == username and row[2] == password :
        
            return redirect(url_for('admin_dashboard'))
            break
        else:
        
            return render_template('Admin1_LoginPage.html', error='Invalid credentials. Please try again.')
    # Add your login logic here
    #return f'Username: {username}, Password: {password}'
@Admin1_LoginPageApp.route('/admindashboard')
def admin_dashboard():
    # This is a placeholder for the admin dashboard; you can replace it with the actual content.
    return render_template ('Admin2_HomePage.html')

if __name__ == '__main__':
    Admin1_LoginPageApp.run(debug=True)
