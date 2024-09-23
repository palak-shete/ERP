from flask import Flask, request, jsonify, render_template
import psycopg2

app = Flask(__name__)

# Database connection setup
def get_db_connection():
    conn = psycopg2.connect(
        host="postgres",
        database="postgres",
        user="postgres",
        password="root"
    )
    return conn

@app.route('/')
def index():
    return render_template('index.html')

# API to fetch students based on course and division
@app.route('/students', methods=['GET'])
def get_students():
    course = request.args.get('course')
    division = request.args.get('division')
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT student_id, roll_no, name FROM students WHERE division = %s", (division,))
    students = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify([{'student_id': s[0], 'roll_no': s[1], 'name': s[2]} for s in students])

# API to fetch results based on student ID and year
@app.route('/results', methods=['GET'])
def get_results():
    student_id = request.args.get('student_id')
    year = request.args.get('year')
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        """
        SELECT s.name, s.roll_no, s.division, r.year, r.marks
        FROM results r
        JOIN students s ON r.student_id = s.student_id
        WHERE r.student_id = %s AND r.year = %s
        """, (student_id, year)
    )
    result = cur.fetchone()
    cur.close()
    conn.close()
    if result:
        return jsonify({
            'name': result[0],
            'roll_no': result[1],
            'division': result[2],
            'year': result[3],
            'marks': result[4]
        })
    else:
        return jsonify({'error': 'Result not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
