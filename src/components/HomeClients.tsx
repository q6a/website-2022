import React from "react";
import { withPrefix } from "gatsby";

import { H2 } from "./Typography";

const clients = [
  {
    id: "client-1",
    img: "images/logoipsum-1.svg",
    name: "Client 1",
  },
  {
    id: "client-2",
    img: "images/logoipsum-2.svg",
    name: "Client 2",
  },
  {
    id: "client-3",
    img: "images/logoipsum-3.svg",
    name: "Client 3",
  },
  {
    id: "client-4",
    img: "images/logoipsum-4.svg",
    name: "Client 4",
  },
  {
    id: "client-5",
    img: "images/logoipsum-5.svg",
    name: "Client 5",
  },
  {
    id: "client-6",
    img: "images/logoipsum-6.svg",
    name: "Client 6",
  },
  {
    id: "client-7",
    img: "images/logoipsum-7.svg",
    name: "Client 7",
  },
  {
    id: "client-8",
    img: "images/logoipsum-8.svg",
    name: "Client 8",
  },
];

const HomeClients = () => {
  return (
    <div className="section-sm bg-brand-light">
      <div className="container text-center">
        <H2 classes="text-gray" hasSeparator>
          Our Partners and Clients
        </H2>
        <div className="row mt-5">
          {clients.map(({ id, img, name }) => (
            <div key={id} className="col-6 col-md-4 col-lg-3">
              <img
                src={withPrefix(img)}
                alt={name}
                className="p-4 logo-item"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeClients;
