import React from "react";
import Navigation from "./Navigation";

const RecipientPairing = ({data}) => {
  console.log(data);
  const restaruantLatLong = {
      lat: data.orders[0].restaurant_address.lat,
      lng: data.orders[0].restaurant_address.lon,
  };
  const recipientLatLong = {};

  return (
      <div>
          <div>
              <div>Deliverer:{data.deliverer_name}</div>
              <div>Calculating Route</div>
              <Navigation
                  origin={restaruantLatLong}
                  destination={restaruantLatLong}
              />
          </div>
      </div>
  );
};

export default RecipientPairing;
