import axios from "axios";

const form = document.querySelector("form")!;
const adressInput = document.getElementById("adress")! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyC7IH_kmn684C-RMt03nHVqIieLLmqd8SM";
const url =
  "https://maps.googleapis.com/maps/api/geocode/json?address=,+CA&key=";

type GoogleGeocodingReponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

const searchAdressHandler = (e: Event) => {
  e.preventDefault();
  const enteredAdress = adressInput.value;

  axios
    .get<GoogleGeocodingReponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAdress
      )},+CA&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      console.log(response);
      if (response.data.status != "OK") {
        throw new Error("Could not find location");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: coordinates,
          zoom: 8,
        }
      );

      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });

  console.log("SUBMITED", enteredAdress);
  //send this to google api
};

form.addEventListener("submit", searchAdressHandler);
