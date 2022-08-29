import React from "react";

const RecipientPairing = ({data}) => {
  return (
      <div>
          <div>
              <div>Deliverer:{data.deliverer_name}</div>
              <div>Calculating Route</div>
          </div>
      </div>
  );
};

export default RecipientPairing;
