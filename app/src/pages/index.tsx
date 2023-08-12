import { Inter } from "next/font/google";
import { ConnectWallet } from "@thirdweb-dev/react";
import Dashboard from "../components/Dashboard";
import NavBar from "../components/NavBar";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    // <div className="flex h-screen bg-gray-200">
    //   <NavBar />
    //   <div className="flex-1 flex flex-col overflow-hidden">
    //     <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
    //       <Dashboard />
    //     </main>
    //   </div>
    // </div>
    <div>
      <header className="nav">
        <div className="container">
          <div className="row items-center mb-lg">
            <div className="column align-left">
              <Link href="#" aria-current="page" className="w-inline-block">
                <div className="logo">
                  <span className="emoji mr-md">🌎</span> Brownomics
                </div>
              </Link>
            </div>
            <div className="column align-right">
              <div className="row items-center">
                <ConnectWallet
                  dropdownPosition={{
                    side: "bottom",
                    align: "center",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex justify-center">
        <div className="container mt-3xl mb-3xl">
          <div className="row">
            <div className="flex justify-center column align-center">
              <h1 className="test-giga text-center">
                Unlock economic insights and forecast market trends with
                Brownomics.
              </h1>
              <p className="text-lg text-center max-w-lg">
                {" "}
                Explore our comprehensive charts and simulation tools to gain a
                deeper understanding of market inflation and deflation. With
                Brownomics, you&#39;ll have the power to make informed decisions
                and stay ahead of the curve.
              </p>
              <Link href="/dashboard" className="button xl main mt-lg w-button">
                {" "}
                Start Predicting Now
              </Link>
            </div>
          </div>
        </div>
        <div className="circle"></div>
      </div>
      <div className="section bg-white">
        <div className="container mt-2xl mb-2xl">
          <div className="row">
            <div className="column align-center">
              <h2 className="max-w-lg text-center">
                Unlock the power of economics forecasting with Brownomics.
              </h2>
              <p className="text-lg text-center max-w-md">
                Gain valuable insights into market inflation and deflation with
                our powerful token price and token price v2 charts. With
                Brownomics, you can simulate various scenarios to make informed
                decisions and predict future trends in the market.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="section bg-white">
        <div className="container">
          <div className="row items-center v-t">
            <div className="column align-left p-2xl">
              <h6 className="max-w-lg">#1 Feature</h6>
              <h2 className="max-w-lg">
                Unlock the power of crypto economics.
              </h2>
              <p className="text-lg">
                {" "}
                Stay ahead of the market with Brownomics. Our 24/7 crypto
                economics service is always ready to help you navigate the world
                of cryptocurrency. With our powerful charts and forecasting
                tools, you can unlock valuable insights and make informed
                decisions in a volatile market.
              </p>
            </div>
            <div className="column align-center p-2xl">
              <img
                src="http://api.writesonic.com/static/images/marginalia-coming-soon.png"
                alt=""
                className="feature-card"
              />
            </div>
          </div>
          <div className="row reverse items-center v-t">
            <div className="column align-left p-2xl">
              <h6 className="max-w-lg">#2 Feature</h6>
              <h2 className="max-w-lg">
                Scale your project with intelligent forecasting.
              </h2>
              <p className="text-lg">
                {" "}
                Don&#39;t rely on guesswork when it comes to scaling your
                project. With Brownomics, leverage the power of machine learning
                to make accurate simulations and forecasts. Stay ahead of market
                inflation and deflation and ensure a healthy growth trajectory
                for your project.
              </p>
            </div>
            <div className="column align-center p-2xl">
              <img
                src="http://api.writesonic.com/static/images/marginalia-online-shopping.png"
                alt=""
                className="feature-card"
              />
            </div>
          </div>
          <div className="row items-center v-t">
            <div className="column align-left p-2xl">
              <h6 className="max-w-lg">#3 Feature</h6>
              <h2 className="max-w-lg">
                Take control of your financial future with Brownomics.
              </h2>
              <p className="text-lg">
                {" "}
                Don&#39;t miss out on the opportunity to forecast and simulate
                market trends. With Brownomics, you can take control of your
                financial future and make informed decisions. Start now and
                enjoy our limited-time promotion.
              </p>
            </div>
            <div className="column align-center p-2xl">
              <img
                src="http://api.writesonic.com/static/images/marginalia-order-complete.png"
                alt=""
                className="feature-card"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section" style={{ backgroundColor: "#4263eb" }}>
        <div className="container mt-2xl mb-2xl">
          <div className="row items-center">
            <div className="column align-center">
              <h1 className="max-w-lg text-giga text-center text-white">
                Unlock the power of economic forecasting with Brownomics.
              </h1>
              <Link
                href="/dashboard"
                className="button xl main white mt-lg w-button"
              >
                {" "}
                Start Predicting Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="section pb-2xl-m bg-white">
        <div className="container mt-2xl mb-2xl">
          <div className="row v-l">
            <div className="column align-left">
              <div className="emoji lg">🌎</div>
              <a href="#" className="u mt-lg">
                info@email.com
              </a>
              <div className="row mt-lg ml-md-n">
                <a href="#" target="_blank" className="p-md w-inline-block">
                  <img
                    src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                    data-feather="twitter"
                    alt=""
                    className="icon"
                  />
                </a>
                <a href="#" target="_blank" className="p-md w-inline-block">
                  <img
                    src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                    data-feather="instagram"
                    alt=""
                    className="icon"
                  />
                </a>
                <a href="#" target="_blank" className="p-md w-inline-block">
                  <img
                    src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                    data-feather="linkedin"
                    alt=""
                    className="icon"
                  />
                </a>
              </div>
            </div>
            <div className="column align-left">
              <h6 className="max-w-lg mb-xl footer-header">Company</h6>
              <div>About</div>
              <div className="mt-md">Customers</div>
              <div className="mt-md">Jobs</div>
              <div className="mt-md">Blog</div>
            </div>
            <div className="column align-left">
              <h6 className="max-w-lg mb-xl footer-header">Contact</h6>
              <div>Support</div>
              <div className="mt-md">Sales</div>
            </div>
            <div className="column align-left">
              <h6 className="max-w-lg mb-xl footer-header">Resources</h6>
              <div>Podcast</div>
              <div className="mt-md">Help Center</div>
            </div>
          </div>
          <div className="border-t mt-xl">
            <div className="row mt-xl v-l">
              <div className="column align-left">
                <div className="muted text-sm">
                  © No copyright I guess? Do whatever you want with the site
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script
        src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.4.1.min.220afd743d.js?site=5ea1b995c6b4c10f74406a08"
        type="text/javascript"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossOrigin="anonymous"
      ></script>
      <script
        src="http://api.writesonic.com/static/js/webflow.js"
        type="text/javascript"
      ></script>
    </div>
  );
}
