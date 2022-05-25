import abc
import pandas as pd


class TransformUnit:
    @abc.abstractmethod
    def run_step(self, input_df: pd.DataFrame) -> pd.DataFrame:
        raise NotImplementedError
