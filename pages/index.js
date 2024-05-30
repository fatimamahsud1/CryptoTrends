// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   TimeScale,
// } from "chart.js";
// import "chartjs-adapter-date-fns";

// // Register the components Chart.js needs
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   TimeScale
// );

// const Home = () => {
//   const [historicalData, setHistoricalData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios("http://localhost:3001/api/historical");
//       setHistoricalData(result.data);
//     };

//     fetchData();
//   }, []);

//   // Transform data for chart
//   const data = {
//     labels: historicalData.map((data) => data.timestamp.split("T")[0]),
//     datasets: [
//       {
//         label: "Bitcoin Price",
//         data: historicalData.map((data) => data.close),
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     scales: {
//       x: {
//         type: "time",
//         time: {
//           parser: "yyyy-MM-dd", // Change this to the format of your dates
//           unit: "day",
//           tooltipFormat: "yyyy-MM-dd",
//         },
//         title: {
//           display: true,
//           text: "Date",
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Price",
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//   };

//   return (
//     <div>
//       <Line data={data} options={options} />
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Autocomplete, TextField, Container, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { getAuth } from "firebase/auth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const Home = () => {
  const [symbols, setSymbols] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("XBTUSD");
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/symbols")
      .then((response) => {
        setSymbols(response.data);
      })
      .catch((error) => console.error("Error fetching symbols:", error));
  }, []);

  useEffect(() => {
    if (selectedSymbol) {
      axios.get(`http://localhost:3001/api/historical?symbol=${selectedSymbol}`)
        .then((response) => setHistoricalData(response.data))
        .catch((error) => console.error("Error fetching historical data:", error));
    }
  }, [selectedSymbol]);

  const data = {
    labels: historicalData.map(data => data.timestamp.split("T")[0]),
    datasets: [{
      label: "Bitcoin Price",
      data: historicalData.map(data => data.close),
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    }],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          parser: "yyyy-MM-dd",
          unit: "day",
          tooltipFormat: "yyyy-MM-dd",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Price",
        },
      },
    },
  };

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      console.log("User signed out");
    }).catch((error) => {
      console.error("Logout failed", error);
    });
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Cryptocurrency Prices
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Autocomplete
        options={symbols}
        getOptionLabel={(option) => option}
        style={{ marginBottom: 20 }}
        renderInput={(params) => <TextField {...params} label="Select Symbol" variant="outlined" />}
        value={selectedSymbol}
        onChange={(event, newValue) => setSelectedSymbol(newValue)}
      />
      <Line data={data} options={options} />
    </Container>
  );
};

export default Home;
