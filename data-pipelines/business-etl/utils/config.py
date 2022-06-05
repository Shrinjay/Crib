import json

class Config:
    def __init__(self, config_file):
        config_json = json.load(open(config_file))

        self.source_datasets = config_json['source_datasets']
        self.benchmarks = config_json['benchmarks']