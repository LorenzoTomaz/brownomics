from potassium import Potassium, Request, Response
from pydantic import ValidationError

from models.model import (
    ErrorResponseModel,
    ResponseModel,
    SimulationBrownSchema,
    SimulationControlSchema,
)
from pybrownomics import run_brown_simulation, run_optimal_control_simulation

app = Potassium("simulation-model-api")


@app.handler("/simulation/control")
def handler(context, request: Request) -> Response:
    try:
        payload = SimulationControlSchema(**request.json)
        simulations = run_optimal_control_simulation(**payload.model_dump())
        return Response(
            json=ResponseModel(data=simulations, message="Model executed with success"),
            status=200,
        )
    except ValidationError as e:
        return Response(
            json=ErrorResponseModel(
                data=e.errors(), message=f"Error validating model: {e}"
            ),
            status=400,
        )
    except Exception as e:
        return Response(
            json=ErrorResponseModel(data=None, message=f"Error executing model: {e}"),
            status=500,
        )


@app.handler("/simulation/brown")
def handler(context, request: Request) -> Response:
    try:
        payload = SimulationBrownSchema(**request.json)
        simulations = run_brown_simulation(**payload.model_dump())
        return Response(
            json=ResponseModel(data=simulations, message="Model executed with success"),
            status=200,
        )
    except ValidationError as e:
        return Response(
            json=ErrorResponseModel(
                data=e.errors(), message=f"Error validating model: {e}"
            ),
            status=400,
        )
    except Exception as e:
        return Response(
            json=ErrorResponseModel(data=None, message=f"Error executing model: {e}"),
            status=500,
        )


if __name__ == "__main__":
    app.serve()
