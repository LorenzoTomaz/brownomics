from fastapi import APIRouter, Body
from pybrownomics import run_optimal_control_simulation
from pydantic import ValidationError

from server.models.simulation import (
    ResponseModel,
    SimulationControlSchema,
    ErrorResponseModel,
)

router = APIRouter()


@router.post("/control", response_description="Simulation data added into the database")
async def run_simulation_control(simulation: SimulationControlSchema = Body(...)):
    try:
        simulations = run_optimal_control_simulation(
            simulation.initial_state,
            simulation.time_horizon,
            simulation.p_tok_t,
            simulation.s_t,
            simulation.gamma,
            simulation.expected_future_price,
            simulation.initial_population,
            simulation.adoption_rate,
        )
        return ResponseModel(data=simulations, message="Model executed with success")
    except ValidationError as e:
        return ErrorResponseModel(
            data=e.errors(), message=f"Error validating model: {e}"
        )
    except Exception as e:
        return ErrorResponseModel(data=None, message=f"Error executing model: {e}")
