import 'react-toastify/dist/ReactToastify.css';

import React, { useState } from 'react';

import { toast } from 'react-toastify';

import * as Label from '@radix-ui/react-label';
import {
  Flex,
  Select,
  Slider,
  TextField,
} from '@radix-ui/themes';
import { ConnectWallet } from '@thirdweb-dev/react';

export default function NavBar() {
  const [show, setShow] = useState(true);
  // this.value=this.value.replace(/[^0-9]/g,'')
  const [value, setValue] = useState({
    initialState: 100.0,
    timeHorizon: 365,
    nSimulation: 1,
    pTokT: 10,
    sT: 1000000,
    gama: 0.9,
    expectedFuturePrice: 11,
    initialPopulation: 100,
    adoptionRate: 0.1
  })

  const onChange = (field, newValue) => {
    setValue({
      ...value,
      [field]: newValue
    })
  }


  const simulate = () => {
    console.log(value)
    if(!value.model){
      toast("Model is required", { type: "error"})
      return
    }
  }

  return (
    <div
      className={`fixed z-30 inset-y-0 left-0 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 ${show ? "w-96" : "w-12" }`}
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
            <Flex direction="column" gap="4" width="100%" className='text-white text-extrabold'>
              <Flex direction="column">
                <Label.Root className='font-semibold'>
                  Model
                </Label.Root>
                <Select.Root value={value.model} onValueChange={modelValue => onChange('model', modelValue)}>
                  <Select.Trigger placeholder="Select a model" />
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value="A" onSelect={a => alert(a)}>A</Select.Item>
                      <Select.Item value="B">B</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </Flex>
              <Flex direction="column">
                <Label.Root className='font-semibold'>
                  Interval
                </Label.Root>
                <TextField.Root>
                  <TextField.Input placeholder="Interval" type='number' min={0} max={366} maxLength={3} value={value.initialState} onChange={(e) => onChange('interval', e.target.value)} />
                </TextField.Root>
              </Flex>
              <Flex direction="column">
                <Label.Root className='font-semibold'>
                  Time Horizon
                </Label.Root>
                <Slider width="100%" defaultValue={[value.timeHorizon]} min={0} max={366} variant="classic" className='bg-blue-600' onValueChange={newValue => onChange('timeHorizon', newValue)} />
                {value.timeHorizon}
              </Flex>
              <Flex direction="column">
                <Label.Root className='font-semibold'>
                  N Simulation
                </Label.Root>
                <Slider width="100%" defaultValue={[value.nSimulation]} min={1} max={2} variant="classic" className='bg-blue-600' onValueChange={newValue => onChange('nSimulation', newValue)} />
                {value.nSimulation}
              </Flex>
              <Flex direction="column">
                <Label.Root className='font-semibold'>
                  p Tok t
                </Label.Root>
                <TextField.Root>
                  <TextField.Input type='number' value={value.pTokT} onChange={(e) => onChange('pTokT', e.target.value)} />
                </TextField.Root>
              </Flex>
              <Flex direction="column">
                <Label.Root className='font-semibold'>
                  sT
                </Label.Root>
                <TextField.Root>
                  <TextField.Input type='number' value={value.sT} onChange={(e) => onChange('sT', e.target.value)} />
                </TextField.Root>
              </Flex>
              <Flex direction="column">
                <Label.Root className='font-semibold'>
                  Gama
                </Label.Root>
                <TextField.Root>
                  <TextField.Input type='number' value={value.gama} onChange={(e) => onChange('gama', e.target.value)} />
                </TextField.Root>
              </Flex>
              <Flex direction="column">
                <Label.Root className='font-semibold'>
                  Expected Future Price
                </Label.Root>
                <TextField.Root>
                  <TextField.Input type='number' value={value.expectedFuturePrice} onChange={(e) => onChange('expectedFuturePrice', e.target.value)} />
                </TextField.Root>
              </Flex>
              <Flex direction="column">
                <Label.Root className='font-semibold'>
                  Initial Population
                </Label.Root>
                <TextField.Root>
                  <TextField.Input type='number' value={value.initialPopulation} onChange={(e) => onChange('initialPopulation', e.target.value)} />
                </TextField.Root>
              </Flex>
              <Flex direction="column">
                <Label.Root className='font-semibold'>
                  Adoption Rate
                </Label.Root>
                <TextField.Root>
                  <TextField.Input type='number' value={value.adoptionRate} onChange={(e) => onChange('adoptionRate', e.target.value)} />
                </TextField.Root>
              </Flex>
              <button type='submit' className='bg-blue-600 py-1.5 rounded w-full' onClick={simulate}>Run</button>
              <div className='flex my-10 w-full justify-center'>
                <ConnectWallet className='my-10 w-full'
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
