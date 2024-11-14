import { Link } from "react-router-dom";
import Button from "../stories/Button";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-white text-4xl font-semibold tracking-tight sm:text-5xl">
            Welcome to the Starships App
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
            Explore the galaxy&apos;s most famous starships!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/starships">
              <Button
                label="Access Starships"
                iconComponent={RocketLaunchIcon}
                backgroundColor="#fff"
              />
            </Link>
          </div>
        </div>
      </div>
      <svg
        viewBox="0 0 1024 1024"
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
      >
        <circle
          r={512}
          cx={512}
          cy={512}
          fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
            <stop stopColor="#1c1c1c" />
            <stop offset={1} stopColor="#3550e8" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
