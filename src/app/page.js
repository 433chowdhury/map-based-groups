'use client'

import { AdvancedMarker, APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { produce } from "immer";
import { useCallback, useState } from "react";
import { FaCheck, FaCircle, FaToriiGate, FaTrashAlt } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { TbBulbFilled } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import { ColorPickerWithButton } from "./colorPickerWithButton";

export default function Home() {
  const [pois, setPois] = useState([
    {
      key: 'Banani', location: { lat: 23.7925726, lng: 90.4022629 }, Icon:
        FaToriiGate, color: "white"
    },
    { key: 'Mirpur', location: { lat: 23.8028736, lng: 90.3553505 }, Icon: FaCheck, color: "lightgreen" },
    { key: 'Saat Rasta', location: { lat: 23.7573749, lng: 90.3962951 }, Icon: ImCross, color: "red" },
    { key: 'Dhanmondi', location: { lat: 23.7470499, lng: 90.3655623 }, Icon: FaCircle, color: "#ff5f7f" },
    { key: '300 Feet', location: { lat: 23.8431277, lng: 90.4668935 }, Icon: FaTrashAlt, color: "chocolate  " },
    { key: 'Banasri', location: { lat: 23.7621417, lng: 90.4276446 }, Icon: TbBulbFilled, color: "gold" },
  ]);

  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfo] = useState();

  const [tab, setTab] = useState("People");

  const handleTabChange = useCallback((tabName) => () => { setTab(tabName) }, [])

  const handleChangeCircleIconColor = useCallback((newColor) => {
    setPois(produce(draft => {
      if (info?.index) draft[info.index].color = newColor
    }))
  }, [info])

  const handleMarkerClick = (index) => {
    setShowInfo(true);
    setInfo({ index, names: nameList[index] })
  };

  const handleClear = () => {
    setShowInfo(false);
  }

  return (
    <main className="absolute inset-0">
      <div className="relative h-full w-full flex">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <Map
            mapId="test-tc-map"
            style={{ width: '100%', height: '100%' }}
            defaultCenter={{ lat: 23.7909757, lng: 90.404298 }}
            defaultZoom={13}
            gestureHandling={'greedy'}
            disableDefaultUI
          >
            <PoiMarkers pois={pois} onMarkerClick={handleMarkerClick} />
          </Map>
        </APIProvider>
        <div className={twMerge("fixed transition-[right] duration-200 ease-in w-screen lg:w-96 -right-[100vw] sm:-right-9w-96 top-0 bottom-0 py-3 px-5 bg-white flex flex-col gap-1", showInfo && "right-0 sm:right-0")}>
          <div className="flex justify-between items-start gap-2 z-10 mb-3">
            <div className="flex items-center gap-2 mb-3">
              <p className="text-4xl font-medium mr-1 tracking-wide">{pois[info?.index]?.key}</p>
              {pois[info?.index]?.Icon === FaCircle && <ColorPickerWithButton defaultColor={pois[info?.index]?.color} onChange={handleChangeCircleIconColor} />}
            </div>
            <button className="btn btn-circle btn-neutral" onClick={handleClear}><IoClose size={22} /></button>
          </div>

          <div role="tablist" className="tabs tabs-bordered w-fit mb-3">
            <button role="tab" onClick={handleTabChange("People")} className={twMerge("tab text-lg font-semibold", tab === "People" && "tab-active text-stone-900")}>People</button>
            <button role="tab" onClick={handleTabChange("Images")} className={twMerge("tab text-lg font-semibold", tab === "Images" && "tab-active text-stone-900")}>Images</button>
          </div>

          {tab === "People" && <div className="flex-1 relative flex flex-col gap-1">
            {info?.names.map((name, index) => (<span key={index + name}>{index + 1}: {name}</span>))}
            <button className="absolute bottom-4 right-2 btn rounded-full flex-nowrap transition-[width] h-12 w-12 gap-0 p-0 justify-center items-center hover:w-44 hover:gap-2 overflow-hidden [&:nth-child(2)]:*:hover:w-[unset]"><IoMdAdd size={28} /><div className="whitespace-nowrap w-0 overflow-hidden">Add People</div></button>
          </div>}
          {tab === "Images" && <div className="flex flex-wrap gap-x-2 gap-y-2">{Array(5).fill("").map((_, index) => <div key={index} className="rounded-lg h-32 w-32 bg-base-100/30 flex justify-center items-center" ><FaRegImage size={44} color="#0000008f" /></div>)}</div>}
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
      {props.pois.map(({ key, location, Icon, color }, index) => (
        <AdvancedMarker
          key={key}
          position={location}
          clickable={true}
          onClick={handleClick(index)}>
          <Icon size={26} color={color} />
        </AdvancedMarker>
      ))}
    </>
  );
};

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
],]