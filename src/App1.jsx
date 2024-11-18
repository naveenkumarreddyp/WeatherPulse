// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiDust } from "react-icons/wi";

// const API_KEY = "d885aa1d783fd13a55050afeef620fcb"; // Replace with your OpenWeatherMap API key

// const WeatherIcon = ({ weatherMain }) => {
//   const iconProps = { className: "w-24 h-24 text-white" };
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

// const WeatherApp = () => {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchWeather = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
//       setWeather(response.data);
//     } catch (err) {
//       setError("City not found. Please try again.");
//       setWeather(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getBackgroundClass = (weatherMain) => {
//     if (!weatherMain) return "from-blue-500 to-purple-600";
//     switch (weatherMain.toLowerCase()) {
//       case "clear":
//         return "from-yellow-400 to-orange-500";
//       case "clouds":
//         return "from-gray-400 to-gray-600";
//       case "rain":
//         return "from-blue-600 to-blue-800";
//       case "snow":
//         return "from-blue-100 to-blue-300";
//       default:
//         return "from-blue-500 to-purple-600";
//     }
//   };

//   return (
//     <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getBackgroundClass(weather?.weather[0]?.main)} p-4`}>
//       <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
//         <div className="backdrop-blur-md bg-white bg-opacity-10 rounded-3xl shadow-xl overflow-hidden">
//           <div className="p-8">
//             <h1 className="text-4xl font-bold text-center mb-8 text-white">
//               Weather<span className="text-yellow-300">Pulse</span>
//             </h1>
//             <form onSubmit={fetchWeather} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Enter city name"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 className="w-full px-4 py-3 rounded-full border border-white border-opacity-30 bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-70"
//               />
//               <motion.button
//                 type="submit"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-3 rounded-full hover:from-yellow-500 hover:to-yellow-700 transition duration-300 ease-in-out font-semibold text-lg"
//               >
//                 Get Weather
//               </motion.button>
//             </form>
//             {loading && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-8">
//                 <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
//               </motion.div>
//             )}
//             {error && (
//               <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-8 text-red-300">
//                 {error}
//               </motion.p>
//             )}
//             {weather && (
//               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 text-center text-white">
//                 <h2 className="text-3xl font-semibold mb-4">
//                   {weather.name}, {weather.sys.country}
//                 </h2>
//                 <div className="flex justify-center items-center mb-4">
//                   <WeatherIcon weatherMain={weather.weather[0].main} />
//                 </div>
//                 <p className="text-6xl font-bold mb-2">{Math.round(weather.main.temp)}°C</p>
//                 <p className="text-xl capitalize mb-4">{weather.weather[0].description}</p>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-3">
//                     <p className="text-yellow-300">Humidity</p>
//                     <p className="font-semibold text-lg">{weather.main.humidity}%</p>
//                   </motion.div>
//                   <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-3">
//                     <p className="text-yellow-300">Wind Speed</p>
//                     <p className="font-semibold text-lg">{weather.wind.speed} m/s</p>
//                   </motion.div>
//                   <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-3">
//                     <p className="text-yellow-300">Feels Like</p>
//                     <p className="font-semibold text-lg">{Math.round(weather.main.feels_like)}°C</p>
//                   </motion.div>
//                   <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-3">
//                     <p className="text-yellow-300">Pressure</p>
//                     <p className="font-semibold text-lg">{weather.main.pressure} hPa</p>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default WeatherApp;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiDust } from "react-icons/wi";

// const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key

// const WeatherIcon = ({ weatherMain }) => {
//   const iconProps = { className: "w-24 h-24 text-white" };
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
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           fetchWeatherByCoords(latitude, longitude);
//         },
//         (err) => {
//           setError("Unable to retrieve your location. Please search for a city.");
//           setLoading(false);
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by your browser. Please search for a city.");
//       setLoading(false);
//     }
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

//   const fetchWeatherByCity = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
//       setWeather(response.data);
//     } catch (err) {
//       setError("City not found. Please try again.");
//       setWeather(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getBackgroundClass = (weatherMain) => {
//     if (!weatherMain) return "from-blue-500 to-purple-600";
//     switch (weatherMain.toLowerCase()) {
//       case "clear":
//         return "from-yellow-400 to-orange-500";
//       case "clouds":
//         return "from-gray-400 to-gray-600";
//       case "rain":
//         return "from-blue-600 to-blue-800";
//       case "snow":
//         return "from-blue-100 to-blue-300";
//       default:
//         return "from-blue-500 to-purple-600";
//     }
//   };

//   return (
//     <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getBackgroundClass(weather?.weather[0]?.main)} p-4`}>
//       <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
//         <div className="backdrop-blur-md bg-white bg-opacity-10 rounded-3xl shadow-xl overflow-hidden">
//           <div className="p-8">
//             <h1 className="text-4xl font-bold text-center mb-8 text-white">
//               Weather<span className="text-yellow-300">Pulse</span>
//             </h1>
//             <form onSubmit={fetchWeatherByCity} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Enter city name"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 className="w-full px-4 py-3 rounded-full border border-white border-opacity-30 bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-70"
//               />
//               <motion.button
//                 type="submit"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-3 rounded-full hover:from-yellow-500 hover:to-yellow-700 transition duration-300 ease-in-out font-semibold text-lg"
//               >
//                 Get Weather
//               </motion.button>
//             </form>
//             <motion.button
//               onClick={getCurrentLocationWeather}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full mt-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 rounded-full hover:from-blue-500 hover:to-blue-700 transition duration-300 ease-in-out font-semibold text-lg"
//             >
//               Use Current Location
//             </motion.button>
//             {loading && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-8">
//                 <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
//               </motion.div>
//             )}
//             {error && (
//               <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-8 text-red-300">
//                 {error}
//               </motion.p>
//             )}
//             {weather && (
//               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 text-center text-white">
//                 <h2 className="text-3xl font-semibold mb-4">
//                   {weather.name}, {weather.sys.country}
//                 </h2>
//                 <div className="flex justify-center items-center mb-6">
//                   <WeatherIcon weatherMain={weather.weather[0].main} />
//                 </div>
//                 <p className="text-6xl font-bold mb-4">{Math.round(weather.main.temp)}°C</p>
//                 <p className="text-xl capitalize mb-6">{weather.weather[0].description}</p>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-3">
//                     <p className="text-yellow-300">Humidity</p>
//                     <p className="font-semibold text-lg">{weather.main.humidity}%</p>
//                   </motion.div>
//                   <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-3">
//                     <p className="text-yellow-300">Wind Speed</p>
//                     <p className="font-semibold text-lg">{weather.wind.speed} m/s</p>
//                   </motion.div>
//                   <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-3">
//                     <p className="text-yellow-300">Feels Like</p>
//                     <p className="font-semibold text-lg">{Math.round(weather.main.feels_like)}°C</p>
//                   </motion.div>
//                   <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-3">
//                     <p className="text-yellow-300">Pressure</p>
//                     <p className="font-semibold text-lg">{weather.main.pressure} hPa</p>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             )}
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

const API_KEY = "d885aa1d783fd13a55050afeef620fcb"; // Replace with your OpenWeatherMap API key

const WeatherIcon = ({ weatherMain }) => {
  const iconProps = { className: "w-24 h-24 text-white" };
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

const Particle = ({ color }) => {
  const randomPosition = () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  });

  const [position, setPosition] = useState(randomPosition());

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(randomPosition());
    }, Math.random() * 10000 + 5000);

    return () => clearInterval(interval);
  }, []);

  return <motion.div className={`absolute w-2 h-2 rounded-full ${color}`} initial={randomPosition()} animate={position} transition={{ duration: Math.random() * 10 + 5, ease: "linear" }} />;
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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          // Use Delhi as default location if permission denied or error
          fetchWeatherByCity(null, "Delhi,IN");
        }
      );
    } else {
      // Use Delhi as default location if geolocation not supported
      fetchWeatherByCity(null, "Delhi,IN");
    }
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
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityToFetch}&appid=${API_KEY}&units=metric`);
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

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getBackgroundClass(weather?.weather[0]?.main)} p-4 overflow-hidden relative`}>
      {[...Array(20)].map((_, i) => (
        <Particle key={i} color="bg-white bg-opacity-30" />
      ))}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md relative z-10">
        <div className="backdrop-blur-lg bg-white bg-opacity-10 rounded-3xl shadow-2xl overflow-hidden border border-white border-opacity-20">
          <div className="p-8">
            <h1 className="text-5xl font-bold text-center mb-8 text-white">
              Weather<span className="text-yellow-300">Pulse</span>
            </h1>
            <form onSubmit={fetchWeatherByCity} className="space-y-4">
              <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-white border-opacity-30 bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-70 text-lg"
              />
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
            <AnimatePresence>
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center mt-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                </motion.div>
              )}
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center mt-8 text-red-300">
                  {error}
                </motion.p>
              )}
              {weather && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: 0.2 }} className="mt-8 text-center text-white">
                  <h2 className="text-3xl font-semibold mb-4">
                    {weather.name}, {weather.sys.country}
                  </h2>
                  <div className="flex justify-center items-center mb-6">
                    <WeatherIcon weatherMain={weather.weather[0].main} />
                  </div>
                  <p className="text-7xl font-bold mb-4">{Math.round(weather.main.temp)}°C</p>
                  <p className="text-2xl capitalize mb-6">{weather.weather[0].description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-4 flex items-center justify-center flex-col">
                      <WiHumidity className="text-3xl mb-2" />
                      <p className="text-yellow-300">Humidity</p>
                      <p className="font-semibold text-lg">{weather.main.humidity}%</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-4 flex items-center justify-center flex-col">
                      <WiStrongWind className="text-3xl mb-2" />
                      <p className="text-yellow-300">Wind Speed</p>
                      <p className="font-semibold text-lg">{weather.wind.speed} m/s</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-4 flex items-center justify-center flex-col">
                      <WiDust className="text-3xl mb-2" />
                      <p className="text-yellow-300">Feels Like</p>
                      <p className="font-semibold text-lg">{Math.round(weather.main.feels_like)}°C</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 rounded-xl p-4 flex items-center justify-center flex-col">
                      <WiBarometer className="text-3xl mb-2" />
                      <p className="text-yellow-300">Pressure</p>
                      <p className="font-semibold text-lg">{weather.main.pressure} hPa</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherApp;
