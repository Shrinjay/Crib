from transformer_unit import TransformUnit
from crime_types import Crime
import pandas as pd
import numpy as np


class CrimeTypeTransformer(TransformUnit):
    def transform_code_to_std_crime(self, code):
        return self.CRIME_TYPE_MAPPING[code]

    def clean_types(self, type):
        return type if type in self.CRIME_TYPE_MAPPING else np.nan

    def run_step(self, input_df: pd.DataFrame) -> pd.DataFrame:
        input_df['CrimeType'] = input_df['CrimeType'].map(self.clean_types)
        input_df.dropna(subset=['CrimeType'], inplace=True)
        input_df['CrimeType'] = input_df['CrimeType'].map(self.transform_code_to_std_crime)
        return input_df

    CRIME_TYPE_MAPPING = {
        "9000": Crime.BOMB_THREAT.value,
        "9010": Crime.HOMICIDE.value,
        "9040": Crime.SEX_OFFENCE.value,
        "9050": Crime.INDECENT_ACT.value,
        "9060": Crime.THREATENING.value,
        "9070": Crime.ASSAULT.value,
        "9080": Crime.ABDUCTION.value,
        "9090": Crime.ROBBERY.value,
        "9100": Crime.EXTORTION.value,
        "9110": Crime.BREAK_ENTER.value,
        "9120": Crime.THEFT.value,
        "9130": Crime.VEHICLE_THEFT.value,
        "9170": Crime.WEAPON.value,
        "9180": Crime.PROPERTY_DAMAGE.value,
        "9190": Crime.PROSTITUTION.value,
        "9200": Crime.GAMBLING.value,
        "9210": Crime.DRUGS.value,
        "9220": Crime.MISSING_PERSON.value,
        "9300": Crime.DISTURBANCE.value,
        "9310": Crime.DISPUTE.value,
        "9330": Crime.DOMESTIC_DISPUTE.value,
        "9350": Crime.INTOXICATED.value,
        "9380": Crime.MISCHIEF.value,
        "9460": Crime.SUSPICIOUS.value,
        "9470": Crime.SUSPICIOUS.value,
        "9480": Crime.SUSPICIOUS.value,
        "9500": Crime.VEHICLE_COLLISION.value,
        "9510": Crime.VEHICLE_COLLISION.value,
        "9520": Crime.HIT_RUN.value,
        "9530": Crime.VEHICLE_COLLISION.value,
        "9570": Crime.IMPAIRED_DRIVER.value,
        "9610": Crime.LIQUOR_OFFENCE.value,
        "9620": Crime.ANIMAL_COMPLAINT.value,
        "9730": Crime.BYLAW.value,
        "9790": Crime.THEFT.value,
        "9850": Crime.HUMAN_TRAFFICKING.value,
        "9900": Crime.HARASSMENT.value,
        "9910": Crime.INTERNET_CRIME.value,
        "9920": Crime.GRAFFITI.value,
        "9930": Crime.DOMESTIC_DISPUTE.value
    }
