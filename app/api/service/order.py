def get_order(order_nr):
    """
    Get order details (i.e. from DB or other system)
    :param order_nr: order number
    :return:
    """
    return get_orders_dict().get(order_nr)


def get_orders_array():
    """
    Get orders as array
    :return:
    """
    return list(get_orders_dict().values())


def get_orders_dict():
    """
    Get orders as dict
    :return:
    """
    orders = {
        "1": {'id': 1, 'amount': '10.00', 'currency': 'EUR', 'title': 'Plant a Tree in Italy: €10',
                'author': 'Johann Siemens', 'image': 'https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTk0ODB8MHwxfHNlYXJjaHwxfHx0cmVlfGVufDB8fHx8MTYzMzM0NDA1MA&ixlib=rb-1.2.1&q=80&w=400'},
        "2": {'id': 2, 'amount': '12.00', 'currency': 'EUR', 'title': 'Plant a Tree in Canada: €12',
                'author': 'Lukasz Szmigiel','image': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTk0ODB8MHwxfHNlYXJjaHwyOXx8dHJlZXxlbnwwfHx8fDE2MzMzNDQwNTA&ixlib=rb-1.2.1&q=80&w=400'},
        "3": {'id': 3, 'amount': '8.00', 'currency': 'EUR', 'title': 'Plant a Tree in Germany: €8',
              'author': 'Kai Dörner', 'image': 'https://images.unsplash.com/photo-1476712395872-c2971d88beb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTk0ODB8MHwxfHNlYXJjaHwyOHx8dHJlZXxlbnwwfHx8fDE2MzMzNDQwNTA&ixlib=rb-1.2.1&q=80&w=400'},
        "4": {'id': 4, 'amount': '16.00', 'currency': 'EUR', 'title': 'Plant a Tree in Bahamas: €16',
              'author': 'Jared Rice', 'image': 'https://images.unsplash.com/photo-1506126383447-1baf4fb3c267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTk0ODB8MHwxfHNlYXJjaHwzMHx8dHJlZXxlbnwwfHx8fDE2MzMzNDQwNTA&ixlib=rb-1.2.1&q=80&w=400'}
    }

    return orders


class ApiException(Exception):

    def __init__(self, message):
        self.message = message