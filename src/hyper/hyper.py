import pika
import json

class Hyper:

  def __init__(self, rabbithost='localhost', queue='matplot'):
    self._queue = queue
    self._rabbithost = rabbithost
    self._acmp_connect()

  def _acmp_connect(self):
    self._connection = pika.BlockingConnection(pika.ConnectionParameters(self._rabbithost))
    self._channel = self._connection.channel()
    self._channel.queue_declare(self._queue)


  def push(self):
    payload = {'Hello' : 'World'}
    self._channel.basic_publish(exchange='',
                          routing_key=self._queue,
                          body=json.dumps(payload))

if __name__ == '__main__':
    hyp = Hyper()
    hyp.push()
