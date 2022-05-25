import json


class Config:
    def __init__(self, config_file):
        config_json = json.load(open(config_file))

        self.source_csv = config_json['source_csv']
        self.category_mapping = config_json['category_mapping']
        self.col_mapping = config_json['col_mapping']
        self.steps = config_json['steps']