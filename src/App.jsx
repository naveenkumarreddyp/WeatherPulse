// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiDust, WiStrongWind, WiHumidity, WiBarometer } from "react-icons/wi";
// import { IoCloseCircle } from "react-icons/io5";

// const API_KEY = ""; // Replace with your OpenWeatherMap API key

// const WeatherIcon = ({ weatherMain }) => {
//   const iconProps = { className: "w-16 h-16 md:w-24 md:h-24 text-white" };
//   switch (weatherMain.toLowerCase()) {
//     case "clear":
//       return <WiDaySunny {...iconProps} />;
//     case "clouds":
//       return <WiCloudy {...iconProps} />;
//     case "rain":
//       return <WiRain {...iconProps} />;
//     case "snow":
//       return <WiSnow {...iconProps} />;
//     default:
//       return <WiDust {...iconProps} />;
//   }
// };

// const BackgroundAnimation = () => {
//   return (
//     <div className="fixed inset-0 z-0">
//       {[...Array(50)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute bg-white rounded-full opacity-20"
//           initial={{
//             x: Math.random() * window.innerWidth,
//             y: Math.random() * window.innerHeight,
//             scale: Math.random() * 0.5 + 0.5,
//           }}
//           animate={{
//             x: Math.random() * window.innerWidth,
//             y: Math.random() * window.innerHeight,
//             transition: {
//               duration: Math.random() * 20 + 10,
//               repeat: Infinity,
//               repeatType: "reverse",
//             },
//           }}
//           style={{
//             width: Math.random() * 20 + 10,
//             height: Math.random() * 20 + 10,
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// const WeatherApp = () => {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     getCurrentLocationWeather();
//   }, []);

//   const getCurrentLocationWeather = () => {
//     setLoading(true);
//     if ("geolocation" in navigator) {
//       navigator.permissions.query({ name: "geolocation" }).then((result) => {
//         if (result.state === "granted") {
//           navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
//         } else if (result.state === "prompt") {
//           navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
//         } else {
//           fetchWeatherByCity(null, "Delhi,IN");
//         }
//       });
//     } else {
//       fetchWeatherByCity(null, "Delhi,IN");
//     }
//   };

//   const successCallback = (position) => {
//     const { latitude, longitude } = position.coords;
//     fetchWeatherByCoords(latitude, longitude);
//   };

//   const errorCallback = (error) => {
//     console.error("Error getting location:", error);
//     fetchWeatherByCity(null, "Delhi,IN");
//   };

//   const fetchWeatherByCoords = async (lat, lon) => {
//     try {
//       const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
//       setWeather(response.data);
//       setCity(response.data.name);
//     } catch (err) {
//       setError("Unable to fetch weather data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchWeatherByCity = async (e, defaultCity = null) => {
//     if (e) e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const cityToFetch = defaultCity || city;
//       const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityToFetch}&appid=${API_KEY}&units=metric`);
//       setWeather(response.data);
//       setCity(response.data.name);
//     } catch (err) {
//       setError("City not found. Please try again.");
//       setWeather(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getBackgroundClass = (weatherMain) => {
//     if (!weatherMain) return "from-indigo-500 to-purple-600";
//     switch (weatherMain.toLowerCase()) {
//       case "clear":
//         return "from-yellow-400 to-orange-500";
//       case "clouds":
//         return "from-blue-400 to-gray-500";
//       case "rain":
//         return "from-blue-600 to-indigo-800";
//       case "snow":
//         return "from-blue-100 to-indigo-300";
//       default:
//         return "from-indigo-500 to-purple-600";
//     }
//   };

//   const clearSearch = () => {
//     setCity("");
//   };

//   return (
//     <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getBackgroundClass(weather?.weather[0]?.main)} p-4 overflow-hidden relative`}>
//       <BackgroundAnimation />
//       <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md relative z-10">
//         <div className="backdrop-blur-lg bg-white bg-opacity-10 rounded-3xl shadow-2xl overflow-hidden border border-white border-opacity-20">
//           <div className="p-6 md:p-8">
//             <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 md:mb-8 text-white">
//               Weather<span className="text-yellow-300">Pulse</span>
//             </h1>
//             <form onSubmit={fetchWeatherByCity} className="space-y-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Enter city name"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   className="w-full px-4 py-3 rounded-full border border-white border-opacity-30 bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-70 text-lg pr-10"
//                 />
//                 {city && (
//                   <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white opacity-70 hover:opacity-100">
//                     <IoCloseCircle size={24} />
//                   </button>
//                 )}
//               </div>
//               <motion.button
//                 type="submit"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-full hover:from-yellow-500 hover:to-orange-600 transition duration-300 ease-in-out font-semibold text-lg shadow-lg"
//               >
//                 Get Weather
//               </motion.button>
//             </form>
//             <motion.button
//               onClick={getCurrentLocationWeather}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full mt-4 bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-3 rounded-full hover:from-blue-500 hover:to-indigo-600 transition duration-300 ease-in-out font-semibold text-lg shadow-lg"
//             >
//               Use Current Location
//             </motion.button>
//             <AnimatePresence>
//               {loading && (
//                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center mt-6">
//                   <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
//                 </motion.div>
//               )}
//               {error && (
//                 <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center mt-6 text-red-300">
//                   {error}
//                 </motion.p>
//               )}
//               {weather && (
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: 0.2 }} className="mt-6 text-center text-white">
//                   <h2 className="text-2xl md:text-3xl font-semibold mb-3">
//                     {weather.name}, {weather.sys.country}
//                   </h2>
//                   <div className="flex justify-center items-center mb-4">
//                     <WeatherIcon weatherMain={weather.weather[0].main} />
//                   </div>
//                   <p className="text-5xl md:text-7xl font-bold mb-3">{Math.round(weather.main.temp)}°C</p>
//                   <p className="text-xl md:text-2xl capitalize mb-4">{weather.weather[0].description}</p>
//                   <div className="grid grid-cols-2 gap-3 text-sm">
//                     <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-3 flex items-center justify-center flex-col">
//                       <WiHumidity className="text-2xl md:text-3xl mb-1" />
//                       <p className="text-yellow-300">Humidity</p>
//                       <p className="font-semibold text-base md:text-lg">{weather.main.humidity}%</p>
//                     </motion.div>
//                     <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-3 flex items-center justify-center flex-col">
//                       <WiStrongWind className="text-2xl md:text-3xl mb-1" />
//                       <p className="text-yellow-300">Wind Speed</p>
//                       <p className="font-semibold text-base md:text-lg">{weather.wind.speed} m/s</p>
//                     </motion.div>
//                     <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-3 flex items-center justify-center flex-col">
//                       <WiDust className="text-2xl md:text-3xl mb-1" />
//                       <p className="text-yellow-300">Feels Like</p>
//                       <p className="font-semibold text-base md:text-lg">{Math.round(weather.main.feels_like)}°C</p>
//                     </motion.div>
//                     <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-3 flex items-center justify-center flex-col">
//                       <WiBarometer className="text-2xl md:text-3xl mb-1" />
//                       <p className="text-yellow-300">Pressure</p>
//                       <p className="font-semibold text-base md:text-lg">{weather.main.pressure} hPa</p>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default WeatherApp;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiDust, WiStrongWind, WiHumidity, WiBarometer } from "react-icons/wi";
import { IoCloseCircle } from "react-icons/io5";

// Replace with your OpenWeatherMap API key
const APIKEY = import.meta.env.API_KEY;

console.log("----APIKEY-----------", APIKEY);

const WeatherIcon = ({ weatherMain }) => {
  const iconProps = { className: "w-16 h-16 md:w-24 md:h-24 text-white" };
  switch (weatherMain.toLowerCase()) {
    case "clear":
      return <WiDaySunny {...iconProps} />;
    case "clouds":
      return <WiCloudy {...iconProps} />;
    case "rain":
      return <WiRain {...iconProps} />;
    case "snow":
      return <WiSnow {...iconProps} />;
    default:
      return <WiDust {...iconProps} />;
  }
};

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 z-0">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            transition: {
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          style={{
            width: Math.random() * 20 + 10,
            height: Math.random() * 20 + 10,
          }}
        />
      ))}
    </div>
  );
};

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else {
          fetchWeatherByCity(null, "Delhi,IN");
        }
      });
    } else {
      fetchWeatherByCity(null, "Delhi,IN");
    }
  };

  const successCallback = (position) => {
    const { latitude, longitude } = position.coords;
    fetchWeatherByCoords(latitude, longitude);
  };

  const errorCallback = (error) => {
    console.error("Error getting location:", error);
    fetchWeatherByCity(null, "Delhi,IN");
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
      setCity(response.data.name);
    } catch (err) {
      setError("Unable to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (e, defaultCity = null) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const cityToFetch = defaultCity || city;
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityToFetch}&appid=${APIKEY}&units=metric`);
      setWeather(response.data);
      setCity(response.data.name);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundClass = (weatherMain) => {
    if (!weatherMain) return "from-indigo-500 to-purple-600";
    switch (weatherMain.toLowerCase()) {
      case "clear":
        return "from-yellow-400 to-orange-500";
      case "clouds":
        return "from-blue-400 to-gray-500";
      case "rain":
        return "from-blue-600 to-indigo-800";
      case "snow":
        return "from-blue-100 to-indigo-300";
      default:
        return "from-indigo-500 to-purple-600";
    }
  };

  const clearSearch = () => {
    setCity("");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getBackgroundClass(weather?.weather[0]?.main)} p-4 overflow-hidden relative`}>
      <BackgroundAnimation />
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md lg:max-w-4xl relative z-10">
        <div className="backdrop-blur-lg bg-white bg-opacity-10 rounded-3xl shadow-2xl overflow-hidden border border-white border-opacity-20">
          <div className="p-6 md:p-8 lg:flex lg:items-start lg:justify-between lg:space-x-8">
            <div className="lg:flex-1 my-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-center lg:text-left mb-6 md:mb-8 text-white lg:pl-10">
                Weather<span className="text-yellow-300">Pulse</span>
              </h1>
              <form onSubmit={fetchWeatherByCity} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border border-white border-opacity-30 bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-70 text-lg pr-10"
                  />
                  {city && (
                    <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white opacity-70 hover:opacity-100">
                      <IoCloseCircle size={24} />
                    </button>
                  )}
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-full hover:from-yellow-500 hover:to-orange-600 transition duration-300 ease-in-out font-semibold text-lg shadow-lg"
                >
                  Get Weather
                </motion.button>
              </form>
              <motion.button
                onClick={getCurrentLocationWeather}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-3 rounded-full hover:from-blue-500 hover:to-indigo-600 transition duration-300 ease-in-out font-semibold text-lg shadow-lg"
              >
                Use Current Location
              </motion.button>
            </div>
            <div className="lg:flex-1 mt-6 lg:mt-0">
              <AnimatePresence>
                {loading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center mt-6 lg:mt-0">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                  </motion.div>
                )}
                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center mt-6 lg:mt-0 text-red-300">
                    {error}
                  </motion.p>
                )}
                {weather && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: 0.2 }} className="text-center lg:text-left text-white">
                    <div className="lg:flex lg:flex-col lg:items-center">
                      <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                        {weather.name}, {weather.sys.country}
                      </h2>
                      <div className="flex justify-center lg:justify-start items-center mb-4">
                        <WeatherIcon weatherMain={weather.weather[0].main} />
                      </div>
                      <p className="text-5xl md:text-7xl font-bold mb-3">{Math.round(weather.main.temp)}°C</p>
                      <p className="text-xl md:text-2xl capitalize mb-4">{weather.weather[0].description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-3 flex items-center justify-center flex-col">
                        <WiHumidity className="text-2xl md:text-3xl mb-1" />
                        <p className="text-yellow-300">Humidity</p>
                        <p className="font-semibold text-base md:text-lg">{weather.main.humidity}%</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-3 flex items-center justify-center flex-col">
                        <WiStrongWind className="text-2xl md:text-3xl mb-1" />
                        <p className="text-yellow-300">Wind Speed</p>
                        <p className="font-semibold text-base md:text-lg">{weather.wind.speed} m/s</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-3 flex items-center justify-center flex-col">
                        <WiDust className="text-2xl md:text-3xl mb-1" />
                        <p className="text-yellow-300">Feels Like</p>
                        <p className="font-semibold text-base md:text-lg">{Math.round(weather.main.feels_like)}°C</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-3 flex items-center justify-center flex-col">
                        <WiBarometer className="text-2xl md:text-3xl mb-1" />
                        <p className="text-yellow-300">Pressure</p>
                        <p className="font-semibold text-base md:text-lg">{weather.main.pressure} hPa</p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherApp;
