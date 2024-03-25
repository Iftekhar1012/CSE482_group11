from flask import Flask, request, render_template
import sqlite3

Cus2_LoginPageApp = Flask(__name__)

@Cus2_LoginPageApp.route('/userlogin', methods=['POST', 'GET'])
def user_login():
    if request.method == 'POST':
        username = request.form['uname']
        password = request.form['pword']
        conn = sqlite3.connect('train_booking.sql') 
    cursor = conn.cursor()

    
    cursor.execute("SELECT * FROM customer" )

    rows = cursor.fetchall()

    conn.close()
    data_2d_array = [list(row) for row in rows]

    for row in data_2d_array:

        if row[0] == username and row[6] == password :
        
            return redirect(url_for('customer_dashboard'))
        else:
        
            return render_template('Cus2_LoginPage.html', error='Invalid credentials. Please try again.')
        # Add your user login logic here
        return f'Username: {username}, Password: {password}'
    return render_template('1Cus2.0_StartingStations.html')


if __name__ == '__main__':
    Cus2_LoginPageApp.run(debug=True)
    
