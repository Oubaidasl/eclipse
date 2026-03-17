from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3, hashlib, jwt, datetime

app = Flask(__name__)
CORS(app, origins='*', supports_credentials=True)

SECRET_KEY = 'supersecretkey123'
DB_PATH = 'ctf.db'
REAL_FLAG = 'abou-ubaida{a9wad-flag-fl3alam}'
FAKE_FLAG = 'Haaa wa7d lflag m3a rjli hhhhhhh, wax 7sablk sahla wla'

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute(
        'CREATE TABLE IF NOT EXISTS users ('
        '  id INTEGER PRIMARY KEY AUTOINCREMENT,'
        '  username TEXT UNIQUE NOT NULL,'
        '  password TEXT NOT NULL,'
        "  role TEXT NOT NULL DEFAULT 'user'"
        ')'
    )
    try:
        conn.execute(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            ('admin', hashlib.md5(b'admin123').hexdigest(), 'admin')
        )
    except sqlite3.IntegrityError:
        pass
    conn.commit()
    conn.close()

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()
    role = data.get('role', 'user').strip()
    if not username or not password:
        return jsonify({'error': 'Missing fields'}), 400
    if role not in ('user', 'admin'):
        role = 'user'
    hashed = hashlib.md5(password.encode()).hexdigest()
    try:
        conn = get_db()
        conn.execute(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            (username, hashed, role)
        )
        conn.commit()
        conn.close()
        return jsonify({'message': 'Registered successfully'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Username already exists'}), 409

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()
    hashed = hashlib.md5(password.encode()).hexdigest()
    conn = get_db()
    user = conn.execute(
        'SELECT * FROM users WHERE username=? AND password=?', (username, hashed)
    ).fetchone()
    conn.close()
    if not user:
        return jsonify({'error': 'Invalid credentials'}), 401
    payload = {
        'sub': user['username'],
        'role': user['role'],
        'flag': REAL_FLAG,
        'iat': datetime.datetime.utcnow(),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2),
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return jsonify({'token': token, 'role': user['role']}), 200

@app.route('/api/flag', methods=['GET'])
def flag():
    auth = request.headers.get('Authorization', '')
    if not auth.startswith('Bearer '):
        return jsonify({'error': 'Unauthorized'}), 401
    token = auth.split(' ')[1]
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        if decoded.get('role') != 'admin':
            return jsonify({'error': 'Admins only'}), 403
        return jsonify({'flag': FAKE_FLAG}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

@app.route('/api/me', methods=['GET'])
def me():
    auth = request.headers.get('Authorization', '')
    if not auth.startswith('Bearer '):
        return jsonify({'error': 'Unauthorized'}), 401
    token = auth.split(' ')[1]
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return jsonify({'username': decoded['sub'], 'role': decoded['role']}), 200
    except Exception:
        return jsonify({'error': 'Invalid token'}), 401

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=False)
