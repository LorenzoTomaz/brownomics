import dynamic from "next/dynamic";

const Plot = dynamic(import("react-plotly.js"), {
  ssr: false,
});

export default function Dashboard() {
  return (
    <div className="container mx-auto px-12 py-24">
      <h3 className="text-gray-700 text-3xl font-bold">Demo BROWNOMICS</h3>
      <div className="flex flex-col mt-8">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex flex-col gap-6 min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200 text-gray-700 p-4 ">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>

            <div className="flex flex-wrap md:flex-row gap-6 justify-around w-full">
              <Plot
                data={[
                  {
                    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    y: [1, 2, 3, 6, 5, 7, 12, 15, 17, 25, 50],
                    type: "scatter",
                    mode: "lines",
                    marker: { color: "red" },
                  },
                  {
                    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    y: [1, 1, 1.5, 2, 3, 2.5, 4, 4, 5, 3],
                    type: "scatter",
                    mode: "lines",
                    marker: { color: "blue" },
                  },
                ]}
                layout={{ width: 520, height: 440, title: `My Cool Graph` }}
              />

              <Plot
                data={[
                  {
                    x: [1, 2, 3, 4],
                    y: [0, 2, 3, 5],
                    fill: "tozeroy",
                    type: "scatter",
                  },
                  {
                    x: [1, 2, 3, 4],
                    y: [3, 5, 1, 7],
                    fill: "tonexty",
                    type: "scatter",
                  },
                ]}
                layout={{
                  width: 520,
                  height: 440,
                  title: `My Cool Graph`,
                  xaxis: { fixedrange: true },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
