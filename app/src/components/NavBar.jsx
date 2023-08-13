import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import * as Label from "@radix-ui/react-label";
import { Flex, Select, Slider, TextField } from "@radix-ui/themes";
import {
  ConnectWallet,
  useContract,
  useContractRead,
  useAddress,
  useContractWrite,
} from "@thirdweb-dev/react";
import computeKpis, { Kpis } from "../math/index.ts";
import { useSimulations } from "../hooks/provider.jsx";
import abi from "../utils/abi.js";
export default function NavBar() {
  const [show, setShow] = useState(true);
  const [value, setValue] = useState({
    initial_state: 100.0,
    time_horizon: 365,
    n_simulation: 1,
    p_tok_t: 10,
    s_t: 1000000,
    gama: 0.9,
    expected_future_price: 11,
    initial_population: 100,
    adoption_rate: 0.1,
  });

  const onChange = (field, newValue) => {
    setValue({
      ...value,
      [field]: newValue,
    });
  };
  const address = useAddress();
  const { simulations, persistSimulations } = useSimulations();
  const [simulationData, setSimulationData] = useState({});
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_TEMPLATE_MARKETPLACE_CONTRACT_ADDRESS,
    abi
  );
  const [modelProfile, setModelProfile] = useState([]);
  const [kpis, setKpis] = useState({});
  const { data: modelsList } = useContractRead(contract, "getListedModels", []);
  const { mutateAsync: purchaseModel } = useContractWrite(
    contract,
    "purchaseModel"
  );
  const simulateOrBuy = async () => {
    if (!value.hasOwnProperty('model')) {
      toast("Model is required", { type: "error" });
      return;
    }
    try {
      if (shouldBuyModel(value?.model)) {
        await buyModel();
      } else {
        const response = await axios.post("/api/simulation", value);
        setSimulationData(response.data);
        persistSimulations(response.data);
        const series = response?.data?.simulations?.data?.series;
        const serie = series[0].series;
        const kpis = computeKpis(serie);
        setKpis(kpis);
      }
    } catch (err) {
      toast("The simulations api seems to be unavailable at the moment", {
        type: "error",
      });
    }
  };
  const buyModel = async () => {
    const modelId = value?.model;
    if (modelId != null) {
      const model = modelProfile.find((model) => model.id === modelId);
      try {
        const result = await purchaseModel({
          args: [modelId],
          overrides: {
            value: model.price,
          },
        });
        console.log("result: ", result);
        toast("Model purchased successfully", { type: "success" });
      } catch (err) {
        console.log(err);
        toast("Something went wrong", { type: "error" });
      }
    }
  };
  const shouldBuyModel = (id) => {
    return !modelProfile.find((model) => model.id === id)?.hasModel;
  };
  const hasModel = async (id) => {
    if (address) {
      const data = await contract.call("userHasModel", [address, id]);
      console.log(`hasModel #${id}: `, data);
      return data;
    }
    return false;
  };
  useEffect(() => {
    const loader = async () => {
      setModelProfile(
        await Promise.all(
          (modelsList || []).map(async (model, i) => ({
            name: model.name,
            price: model.price,
            id: i,
            hasModel: await hasModel(i),
          }))
        )
      );
    };
    loader();
  }, [modelsList]);
  useEffect(() => {
    console.log("modelProfile");
    console.log(modelProfile);
  }, [modelProfile]);
  return (
    <div
      className={`fixed z-30 inset-y-0 left-0 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 ${
        show ? "w-96" : "w-12"
      }`}
    >
      <div className="relative h-10">
        <button
          type="button"
          className="absolute top-2 right-2 p-2 inline-flex items-center justify-center text-gray-400"
          onClick={() => setShow(!show)}
        >
          {show && (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          {!show && (
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
              />
            </svg>
          )}
        </button>
      </div>
      {show && (
        <nav className="grid grid-rows-2 grid-flow-col gap-4 h-[92%]">
          <div className="flex flex-col items-start justify-center h-fit px-6 gap-6">
            <div className="flex items-center">
              <svg
                className="h-12 w-12"
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
                  fill="#4C51BF"
                  stroke="#4C51BF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
                  fill="white"
                ></path>
              </svg>
              <span className="text-white text-2xl mx-2 font-semibold">
                BROWNOMICS
              </span>
            </div>
            <Flex
              direction="column"
              gap="4"
              width="100%"
              className="text-white text-extrabold"
            >
              <Flex direction="column">
                <Label.Root className="font-semibold">Model</Label.Root>
                <Select.Root
                  value={value.model}
                  onValueChange={(modelValue) => onChange("model", modelValue)}
                >
                  <Select.Trigger placeholder="Select a model" />
                  <Select.Content>
                    <Select.Group>
                      {modelProfile?.map((model, i) => (
                        <Select.Item
                          value={model.id}
                          textValue={model.name}
                          key={i}
                        >
                          {model.name}
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </Flex>
              <Flex direction="column">
                <Label.Root className="font-semibold">Time Horizon</Label.Root>
                <Slider
                  width="100%"
                  defaultValue={[value.time_horizon]}
                  min={0}
                  max={366}
                  variant="classic"
                  className="bg-blue-600"
                  onValueChange={(newValue) =>
                    onChange("time_horizon", newValue)
                  }
                />
                {value.time_horizon}
              </Flex>
              <Flex direction="column">
                <Label.Root className="font-semibold">N Simulation</Label.Root>
                <Slider
                  width="100%"
                  defaultValue={[value.n_simulation]}
                  min={1}
                  max={2}
                  variant="classic"
                  className="bg-blue-600"
                  onValueChange={(newValue) =>
                    onChange("n_simulation", newValue)
                  }
                />
                {value.n_simulation}
              </Flex>
              <Flex direction="column">
                <Label.Root className="font-semibold">p Tok t</Label.Root>
                <TextField.Root>
                  <TextField.Input
                    color="orange"
                    type="number"
                    value={value.p_tok_t}
                    onChange={(e) => onChange("p_tok_t", e.target.value)}
                  />
                </TextField.Root>
              </Flex>
              <Flex direction="column">
                <Label.Root className="font-semibold">s_t</Label.Root>
                <TextField.Root>
                  <TextField.Input
                    type="number"
                    value={value.s_t}
                    onChange={(e) => onChange("s_t", e.target.value)}
                  />
                </TextField.Root>
              </Flex>
              <Flex direction="column">
                <Label.Root className="font-semibold">Gama</Label.Root>
                <TextField.Root>
                  <TextField.Input
                    type="number"
                    value={value.gama}
                    onChange={(e) => onChange("gama", e.target.value)}
                  />
                </TextField.Root>
              </Flex>
              <Flex direction="column">
                <Label.Root className="font-semibold">
                  Expected Future Price
                </Label.Root>
                <TextField.Root>
                  <TextField.Input
                    type="number"
                    value={value.expected_future_price}
                    onChange={(e) =>
                      onChange("expected_future_price", e.target.value)
                    }
                  />
                </TextField.Root>
              </Flex>
              <Flex direction="column">
                <Label.Root className="font-semibold">
                  Initial Population
                </Label.Root>
                <TextField.Root>
                  <TextField.Input
                    type="number"
                    value={value.initial_population}
                    onChange={(e) =>
                      onChange("initial_population", e.target.value)
                    }
                  />
                </TextField.Root>
              </Flex>
              <Flex direction="column">
                <Label.Root className="font-semibold">Adoption Rate</Label.Root>
                <TextField.Root>
                  <TextField.Input
                    type="number"
                    value={value.adoption_rate}
                    onChange={(e) => onChange("adoption_rate", e.target.value)}
                  />
                </TextField.Root>
              </Flex>
              <button
                type="submit"
                className={
                  "py-1.5 rounded w-full" +
                  (shouldBuyModel(value?.model)
                    ? " bg-green-500"
                    : " bg-blue-500")
                }
                onClick={simulateOrBuy}
              >
                {shouldBuyModel(value?.model) && value?.model != undefined
                  ? "Buy Model"
                  : "Simulate"}
              </button>
              <div className="flex my-10 w-full justify-center">
                <ConnectWallet
                  className="my-10 w-full"
                  dropdownPosition={{
                    side: "bottom",
                    align: "center",
                  }}
                />
              </div>
            </Flex>
          </div>
        </nav>
      )}
    </div>
  );
}
