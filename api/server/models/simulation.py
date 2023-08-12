from pydantic import BaseModel, Field


class SimulationControlSchema(BaseModel):
    initial_state: float = Field(100.0)
    time_horizon: int = Field(365, gt=0, lt=366)
    n_simulations: int = Field(1, gt=0, lt=2)
    p_tok_t: float = Field(10)
    s_t: int = Field(1000000)
    gamma: float = Field(0.9)
    expected_future_price: float = Field(11)
    initial_population: int = Field(100)
    adoption_rate: float = Field(0.1)


def ResponseModel(data, message):
    return {
        "data": data,
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}
