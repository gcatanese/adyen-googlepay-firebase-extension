from flask import Flask, render_template, request, jsonify
import logging

from api.config import get_port
from api.service.order import get_order, ApiException

app = Flask(__name__, static_url_path='/static', template_folder='frontend/build',
            static_folder='frontend/build/static')


@app.route('/api/order/<order_nr>', methods=['GET'])
def order(order_nr):
    """
    Get order (shopping card)
    :param order_nr: Order (shopping cart) number
    :return:
    """
    logging.info(f'/api/order/{order_nr}')

    order = get_order(order_nr)

    response = jsonify(order)

    return response


@app.route('/')
@app.route('/checkout/<order>')
@app.route('/result/error')
@app.route('/result/success')
@app.route('/result/received')
@app.route('/result/refused')
def main_view(order=None):
    """
    Dispatch to SPA
    :return:
    """
    return render_template('index.html')


@app.errorhandler(ApiException)
def handle_payment_api_error(error):
    logging.error(f'handle_payment_api_error {error}')
    return {'error': error.message}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=get_port())
