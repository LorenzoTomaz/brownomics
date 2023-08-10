from typing import Union
from motor import motor_asyncio

from fastapi import FastAPI
from server.routes.simulation import router as SimulationRouter

app = FastAPI()


app.include_router(SimulationRouter, tags=["Simulation"], prefix="/simulation")


@app.get("/")
def read_root():
    return {"message": "Up and running"}
