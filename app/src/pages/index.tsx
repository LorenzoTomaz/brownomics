import { Inter } from "next/font/google";
import { ConnectWallet } from "@thirdweb-dev/react";
import Dashboard from "../components/Dashboard";
import NavBar from "../components/NavBar";
import Link from "next/link";
import Script from "next/script";
import Logo from "../../public/logo.svg";
import Image from "next/image";
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
                  <div className="flex items-center justify-center w-full pt-3">
                    <span className="text-black text-2xl mx-2 font-semibold">
                      <Image priority src={Logo} alt="Brownomics" width={350} />
                    </span>
                  </div>
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
                Unlock tokenomics insights with Brownomics.
              </h1>
              <p className="text-lg text-center max-w-lg">
                {" "}
                Explore our comprehensive charts and simulation tools to gain a
                deeper understanding of tokenomics Kpis. With Brownomics,
                you&#39;ll have the power to make informed decisions and stay
                ahead of the curve.
              </p>
              <div className="mt-10">
                <Link
                  href="/dashboard"
                  className="button xl main mt-lg w-button"
                >
                  {" "}
                  Start Testing Now
                </Link>
              </div>
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
                Unlock the power of tokenomics validation with Brownomics.
              </h2>
              <p className="text-lg text-center max-w-md">
                Gain valuable Kpis with our powerful simulation models. With
                Brownomics, you can simulate various scenarios to make informed
                decisions.
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
                of cryptocurrency. With our powerful charts and simulation
                tools, you can unlock valuable insights and make informed
                decisions about your next tokenomics strategies.
              </p>
            </div>
            <div className="column align-center p-2xl">
              <img
                src="/images/marginalia-coming-soon.png"
                alt=""
                className="feature-card"
              />
            </div>
          </div>
          <div className="row reverse items-center v-t">
            <div className="column align-left p-2xl">
              <h6 className="max-w-lg">#2 Feature</h6>
              <h2 className="max-w-lg">
                Scale your project with intelligent simulation tools.
              </h2>
              <p className="text-lg">
                {" "}
                Don&#39;t rely on guesswork when it comes to scaling your
                project. With Brownomics, leverage the power of machine learning
                to stress-test your tokenomics. Stay ahead of market inflation
                and deflation and ensure a healthy growth trajectory for your
                project.
              </p>
            </div>
            <div className="column align-center p-2xl">
              <img
                src="/images/marginalia-online-shopping.png"
                alt=""
                className="feature-card"
              />
            </div>
          </div>
          <div className="row items-center v-t">
            <div className="column align-left p-2xl">
              <h6 className="max-w-lg">#3 Feature</h6>
              <h2 className="max-w-lg">
                Powerfull testing tools for tokenomics validation.
              </h2>
              <p className="text-lg">
                {" "}
                With Brownomics, you can test your tokenomics strategy in a
                simulated environment. Our powerful testing tools allow you to
                stress-test your tokenomics strategy and ensure a healthy growth
                trajectory for your project.
              </p>
            </div>
            <div className="column align-center p-2xl">
              <img
                src="/images/marginalia-order-complete.png"
                alt=""
                className="feature-card"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section" style={{ backgroundColor: "#602020" }}>
        <div className="container mt-lg mb-2xl">
          <div className="row items-center">
            <div className="column align-center">
              <h1 className="text-giga text-center text-white">
                Unlock the power of economic forecasting with Brownomics.
              </h1>
              <Link
                href="/dashboard"
                className="button xl main white mt-lg w-button"
              >
                {" "}
                Start Testing Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="section  bg-white">
        <div className="container mt-xl mb-xl">
          <div className="row">
            <div className="column align-center">
              <div className="muted text-lg">
                Made with love ❤️ by{" "}
                <Link href="https://ae.studio">AE Studio</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script
        src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.4.1.min.220afd743d.js?site=5ea1b995c6b4c10f74406a08"
        type="text/javascript"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossOrigin="anonymous"
      ></Script>
    </div>
  );
}
