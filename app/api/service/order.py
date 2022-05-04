def get_order(order_nr):
    """
    Get order details (i.e. from DB or other system)
    :param order_nr: order number
    :return:
    """

    if order_nr == '1':
        return {'amount': 10, 'currency': 'EUR'}
    elif order_nr == '2':
        return {'amount': 12, 'currency': 'EUR'}
    elif order_nr == '3':
        return {'amount': 8, 'currency': 'EUR'}
    elif order_nr == '4':
        return {'amount': 16, 'currency': 'EUR'}
    else:
        return None

class ApiException(Exception):

    def __init__(self, message):
        self.message = message