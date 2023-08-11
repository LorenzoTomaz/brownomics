from typing import Optional

from pydantic import UUID5, BaseModel, EmailStr, Field, PositiveFloat


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


class SimulationBrownSchema(BaseModel):
    period: int = Field(30, gt=0, lt=31)
    agents: int = Field(1000, gt=0, lt=1001)
    n_simulations: int = Field(1, gt=0, lt=2)
    beta: float = Field(0.3)
    chi: float = Field(1)
    interest_rate: float = Field(0.05)
    token_supply: float = Field(1000000000)
    price_mu: float = Field(0.03)
    productivity_initial_value: float = Field(100)
    productivity_mu: float = Field(0.02)
    productivity_sigma: float = Field(2)
    utility_mu: float = Field(1)
    utility_sigma: float = Field(10)


def ResponseModel(data, message):
    return {
        "data": data,
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}
