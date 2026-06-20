from flask import Flask, jsonify, request
import redis
import os

app = Flask(__name__)
r = redis.Redis(host=os.getenv('REDIS_HOST', 'redis'), port=6379, decode_responses=True)

@app.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.json
    cart = r.get('cart') or '[]'
    import json
    cart_list = json.loads(cart)
    cart_list.append(data)
    r.set('cart', json.dumps(cart_list))
    return jsonify({"status": "added"})

@app.route('/cart')
def get_cart():
    cart = r.get('cart') or '[]'
    import json
    return jsonify(json.loads(cart))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
