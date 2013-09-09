import pika

class Hyper:

  def __init__(self, rabbithost='localhost', queue='opf'):
    self._queue = queue
    self._rabbithost = rabbithost

  def _acmp_connect(self):
    self._connection = pika.BlockingConnection(pika.ConnectionParameters(self._rabbithost))
    self._channel = self._connection.channel()
    self._channel.queue_declare(self._queue)


  def push(self, opf_result):
    payload = self._encode_result(opf_result)
    self._channel.basic_publish(exchange='',
                          routing_key=self._queue,
                          body=json.dumps(payload))

  def _encode_result(self, opf_result):

    dataencodings = []
    for arr in opf_result.sensorInput.dataEncodings:
       dataencodings.append( arr.tolist() )

    result = { 'predictionNumber' : opf_result.predictionNumber,
               'rawInput' : opf_result.rawInput,
               'dataEncodings' : dataencodings,
               'inferences' : opf_result.inferences,
               'predictedFieldIdx' : opf_result.predictedFieldIdx,
               'predictedFieldName' : opf_result. predictedFieldName }

    return result
