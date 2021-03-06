MODEL_PARAMS = {
    'model': "CLA",
    'version': 1,
    'predictAheadTime': None,
    'modelParams': {
        'inferenceType': 'TemporalMultiStep',
        'sensorParams': {
            'verbosity' : 0,
            'encoders': {
                'fval': {
                    'fieldname': u'fval',
                    'n': 200,
                    'name': u'fval',
                    'type': 'ScalarEncoder',
                    'minval': 0.00,
                    'maxval': 7.00,
                    'w': 21
                }
            },
            'sensorAutoReset' : None,
        },

        'spEnable': True,
        'spParams': {
            'spVerbosity' : 0,
            'globalInhibition': 1,
            'columnCount': 10,
            'inputWidth': 0,
            'numActivePerInhArea': 40,
            'seed': 1956,
            'coincInputPoolPct': 0.5,
            'synPermConnected': 0.1,
            'synPermActiveInc': 0.1,
            'synPermInactiveDec': 0.01,
        },
        'tpEnable' : True,
        'tpParams': {
            'verbosity': 0,
            'columnCount': 10,
            'cellsPerColumn': 3,
            'inputWidth': 2048,
            'seed': 1960,
            'temporalImp': 'cpp',
            'newSynapseCount': 20,
            'maxSynapsesPerSegment': 32,
            'maxSegmentsPerCell': 128,
            'initialPerm': 0.21,
            'permanenceInc': 0.1,
            'permanenceDec' : 0.1,
            'globalDecay': 0.0,
            'maxAge': 0,
            'minThreshold': 12,
            'activationThreshold': 16,
            'outputType': 'normal',
            'pamLength': 1,
        },
        'clParams': {
            'regionName' : 'CLAClassifierRegion',
            'clVerbosity' : 0,
            'alpha': 0.0001,
            'steps': '5',
        },
        'trainSPNetOnlyIfRequested': False,
    },
}
