import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import computeKpis from "../math/index.ts";
import { useSimulations } from "../hooks/provider.jsx";
const Plot = dynamic(import("react-plotly.js"), {
  ssr: false,
});

export default function Dashboard() {
  const { simulations } = useSimulations();
  const [kpis, setKpis] = useState({});
  const getSeries = () => {
    const series = simulations?.simulations?.data?.series;
    const serie = series[0].series;
    return {
      x: new Array(serie.length).fill(0).map((_, i) => i + 1),
      y: serie,
    };
  };
  useEffect(() => {
    if (simulations?.simulations) {
      const series = simulations.simulations?.data?.series;
      const serie = series[0].series;
      const kpis = computeKpis(serie);
      setKpis(kpis);
      console.log(kpis);
    }
  }, [simulations]);
  return (
    <div className="container mx-auto px-12 py-24">
      <h3 className="text-gray-700 text-3xl font-bold">
        Utility Token Simulation model
      </h3>
      <div className="flex flex-col mt-8">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex flex-col gap-6 min-w-full overflow-hidden sm:rounded-lg text-gray-700 p-4 ">
            {/* <p>
              Understanding Token Price Fluctuations: In the world of web
              applications, token prices can change due to various factors,
              similar to how stocks fluctuate in the financial markets. The
              chart you see on this page visualizes these changes over time.
              This information is crucial for grasping our tokenomics strategy,
              which involves how we manage the supply and demand of the tokens.
              By studying the chart, you can gain insights into how external
              factors and user interactions impact token prices. Keep in mind
              that analyzing these patterns can help you make informed decisions
              while using our platform.
            </p> */}
            <p>
              Our platform&apos;s simulation of token price variations is a
              powerful tool for understanding the dynamics of our token&apos;s
              value. We achieved this by integrating historical data and
              mathematical models into our system. As users interact with the
              platform, their actions influence the token&apos;s supply and
              demand, causing price shifts. The simulation takes into account
              factors such as buying, selling, and external events, then
              projects how these actions might impact the token&apos;s value
              over time. This enables us to anticipate potential trends and
              ensure our tokenomics strategy aligns with user behavior. By
              observing the simulated price changes, users gain valuable
              insights into the token&apos;s journey within our ecosystem.
            </p>

            {simulations?.simulations?.data && kpis?.movingInflation && (
              <div className="flex flex-wrap md:flex-row gap-6 justify-around w-full">
                <div className="grid lg:grid-cols-2 grid-cols-1 w-full bg-white">
                  <Plot
                    data={[
                      {
                        type: "indicator",
                        mode: "number+delta",
                        value: kpis?.volatility || 0.0,
                        domain: { row: 0, column: 0 },
                      },
                    ]}
                    layout={{
                      title: `Price Volatility`,
                    }}
                  />
                  <Plot
                    data={[
                      {
                        type: "indicator",
                        mode: "number+delta",
                        value: kpis?.averageTokenPrice || 0.0,
                        domain: { row: 0, column: 1 },
                      },
                    ]}
                    layout={{
                      title: `Average Token Price`,
                    }}
                  />
                  <Plot
                    data={[
                      {
                        type: "indicator",
                        mode: "number+delta",
                        value: kpis?.peakToTrough || 0.0,
                        domain: { row: 0, column: 2 },
                      },
                    ]}
                    layout={{
                      title: `Peak to Trough`,
                    }}
                  />
                  <Plot
                    data={[
                      {
                        type: "indicator",
                        mode: "number+delta",
                        value: kpis?.priceMomentum || 0.0,
                        domain: { row: 0, column: 3 },
                      },
                    ]}
                    layout={{
                      title: `Price Momentum`,
                    }}
                  />
                  <Plot
                    data={[
                      {
                        type: "indicator",
                        mode: "number+delta",
                        value: kpis?.inflationRate || 0.0,
                        domain: { row: 0, column: 4 },
                      },
                    ]}
                    layout={{
                      title: `Inflation Rate`,
                    }}
                  />
                </div>

                <Plot
                  data={[
                    {
                      x: getSeries()["x"],
                      y: getSeries()["y"],
                      type: "scatter",
                      mode: "lines",
                      marker: { color: "red" },
                    },
                  ]}
                  layout={{
                    title: `Token price (USD)`,
                  }}
                />
                <Plot
                  data={[
                    {
                      x: kpis.movingInflation.x,
                      y: kpis.movingInflation.y,
                      type: "scatter",
                      mode: "lines",
                      marker: { color: "blue" },
                    },
                  ]}
                  layout={{
                    title: `Montlhy Price Variation`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
