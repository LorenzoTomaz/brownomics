from fastapi import APIRouter, Body
from pybrownomics import run_optimal_control_simulation, run_brown_simulation

from server.models.simulation import (
    ResponseModel,
    SimulationControlSchema,
    SimulationBrownSchema
)

router = APIRouter()

@router.post("/control", response_description="Simulation data added into the database")
async def run_simulation_control(simulation: SimulationControlSchema = Body(...)):
    data = run_optimal_control_simulation(simulation.initial_state, simulation.time_horizon, simulation.p_tok_t, simulation.s_t, simulation.gamma, simulation.expected_future_price, simulation.initial_population, simulation.adoption_rate)

    return ResponseModel(data, "simulation added successfully.")

@router.post("/brown", response_description="Simulation data added into the database")
async def run_simulation_brown(simulation: SimulationBrownSchema = Body(...)):
    data = run_brown_simulation(simulation.period, simulation.agents, simulation.times, simulation.beta, simulation.chi, simulation.interest_rate, simulation.token_supply, simulation.price_mu, simulation.productivity_initial_value, simulation.productivity_mu, simulation.productivity_sigma, simulation.utility_mu, simulation.utility_sigma)
    return ResponseModel(data, "simulation added successfully.")
