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
import Logo from "../../public/logo-dash.svg";
import Image from "next/image";
export default function NavBar() {
  const [show, setShow] = useState(true);
  // this.value=this.value.replace(/[^0-9]/g,'')
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
  const [modelProfile, setModelProfile] = useState([]); // [modelProfile, setModelProfile
  const [kpis, setKpis] = useState({});
  const { data: modelsList } = useContractRead(contract, "getListedModels", []);
  const { data: userHasModel } = useContractRead(contract, "userHasModel", []);
  const { mutateAsync: purchaseModel } = useContractWrite(
    contract,
    "purchaseModel"
  );
  const simulateOrBuy = async () => {
    if (value.model == null && value.model == undefined) {
      toast("Model is required", { type: "error" });
      return;
    }
    try {
      if (shouldBuyModel(value?.model)) {
        buyModel();
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
    if (modelId) {
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
            <div className="flex items-center justify-center w-full">
              <span className="text-white text-2xl mx-2 font-semibold">
                <Image priority src={Logo} alt="Brownomics" width={350} />
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
                <Label.Root className="font-semibold">
                  Simulation Duration (days)
                </Label.Root>
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
                <Label.Root className="font-semibold">
                  Number of Simulations
                </Label.Root>
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
                <Label.Root className="font-semibold">
                  Current Token Price
                </Label.Root>
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
                <Label.Root className="font-semibold">
                  Tokens in Circulation
                </Label.Root>
                <TextField.Root>
                  <TextField.Input
                    type="number"
                    value={value.s_t}
                    onChange={(e) => onChange("s_t", e.target.value)}
                  />
                </TextField.Root>
              </Flex>
              <Flex direction="column">
                <Label.Root className="font-semibold">
                  Future Earnings Discount Factor
                </Label.Root>
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
                  Initial User Base
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
                <Label.Root className="font-semibold">
                  Token Adoption Rate (% per step)
                </Label.Root>

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
