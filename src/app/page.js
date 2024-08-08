'use client'

import { AdvancedMarker, APIProvider, Map, Pin, useMap } from "@vis.gl/react-google-maps";
import { useState, useCallback } from "react";
import { twMerge } from "tailwind-merge";

export default function Home() {
  const [info, setInfo] = useState()

  const handleMarkerClick = (index) => {
    setInfo({ names: nameList[index] })
  };

  const handleClear = () => {
    setInfo()
  }

  return (
    <main className="absolute inset-0">
      <div className="relative h-full w-full flex">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <Map
            mapId="test-tc-map"
            style={{ width: '100%', height: '100%' }}
            defaultCenter={{ lat: 23.7809757, lng: 90.384298 }}
            defaultZoom={13}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          >
            <PoiMarkers pois={locations} onMarkerClick={handleMarkerClick} />
          </Map>
        </APIProvider>
        <div className={twMerge("fixed transition-all duration-200 w-screen lg:w-72 -right-[100vw] sm:-right-72 top-0 bottom-0 py-3 px-5 bg-white flex flex-col gap-1", info && "right-0 sm:right-0")}>
          <div className="flex justify-between items-start gap-2">
            <p className="text-2xl font-medium mb-3">List Of People</p>
            <button className="rounded-full h-8 w-8 flex justify-center items-center hover:bg-neutral-500/30" onClick={handleClear}>&times;</button>
          </div>
          {info?.names.map((name, index) => (<span key={index + name}>{index + 1}: {name}</span>))}
        </div>
      </div>
    </main>
  );
}

const PoiMarkers = (props) => {
  const map = useMap();

  const handleClick = useCallback(index => (ev) => {
    if (!map) return;
    if (!ev.latLng) return;
    console.log('marker clicked:', ev.latLng);
    props.onMarkerClick(index);
  }, [map, props]);

  return (
    <>
      {props.pois.map((poi, index) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          clickable={true}
          onClick={handleClick(index)}>
          <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      ))}
    </>
  );
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const locations = [
  { key: 'Banani', location: { lat: 23.7925726, lng: 90.4022629 } },
  { key: 'Mirpur', location: { lat: 23.8028736, lng: 90.3553505 } },
  { key: 'Sat Rasta', location: { lat: 23.7573749, lng: 90.3962951 } },
  { key: 'Dhanmondi', location: { lat: 23.7470499, lng: 90.3655623 } },
];

const nameList = [[
  "Keith Young",
  "Alma Roth",
  "Shania Walton",
  "Luis Zamora",
  "Zarah Steele",
  "Kobi Stanley",
  "Gary Barry",
  "Zoya Holmes",
  "Princess Mahoney",
  "Isabel Hubbard",
  "Ernest O'Neill",
  "Denis Chaney",
  "Alissa Key",
  "Shivam Williamson",
  "Lennon Boyle",
], [
  "Ezekiel O'Doherty",
  "Velma Kirk",
  "Teresa Wilkins",
  "Dewi Nielsen",
  "Anne Reid",
  "Zachariah Sparks",
  "Cole Norris",
  "Edmund Heath",
  "Ida Freeman",
  "Yuvraj Chapman",
  "Tomos Gordon",
  "Eesa Mcbride",
  "Nia Barker",
  "Mason Ferrell",
  "Halima Hobbs",
], [
  "Astrid Holland",
  "Darcy Mejia",
  "Abu Drake",
  "Kendra Macdonald",
  "Sally Daniel",
  "Roisin Sharpe",
  "Arman Meadows",
  "Casey Bell",
  "Dawn Downs",
  "Liliana Shaffer",
  "Herbie Juarez",
  "Cain Whitaker",
  "Rodney Obrien",
  "Asad Shepard",
  "Colin Cross",
], [
  "Christine Anthony",
  "Keanu Navarro",
  "Alicia York",
  "Taha Sutherland",
  "Lena Oneill",
  "Hiba Bowers",
  "Ruth Daniels",
  "Faye Mcclure",
  "Ronan Swanson",
  "Lexi Reed",
  "Anthony Green",
  "Izaak Alvarado",
  "Tomos Barker",
  "Joanne Morse",
  "Tess Cisneros",
]]