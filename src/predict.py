from nupic.frameworks.opf.modelfactory import ModelFactory

import model_params
import hyper.Hyper

# Just make up a simple sequence, 1-7 for
# the training purposes
#
def datagen():
    i = 0
    sequence = 0
    while True:
        yield i
        i = i + 1
        if i > 7:
            i = 0
            sequence = sequence + 1
            if( sequence > 30 ):
                raise StopIteration


def run():
  model = ModelFactory.create(model_params.MODEL_PARAMS)
  model.enableInference({'predictedField': 'fval'})

  hypr = Hyper()

  for val in datagen():
    modelInput = {'fval':val}
    result = model.run(modelInput)
    hypr.push(result)

if __name__ == "__main__":
  run()
