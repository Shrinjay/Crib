class Config:
    def __init__(self, config_json):
        self.aggregate = config_json['aggregate']
        self.source_csv = config_json['source_csv']
        self.crime_type_mapping = config_json['crime_type_mapping']
        self.col_mapping = config_json['col_mapping']
        self.steps = config_json['steps']
        self.dest_csv = config_json['dest_csv']
        if self.aggregate:
            self.aggregate_by = config_json['aggregate_by']