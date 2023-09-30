// @ts-nocheck
import React from "react";
import {
  LinkedinShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappShareButton,
  LinkedinIcon,
  FacebookIcon,
  EmailIcon,
  WhatsappIcon,
} from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Sharer = ({ url }: { url: string }) => {
  const iconSize = 32;
  const iconRound = true;

  return (
    <div className="d-flex justify-content-center gap-2">
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={iconSize} round={iconRound} />
      </LinkedinShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size={iconSize} round={iconRound} />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <div
          className="rounded-circle p-1"
          style={{ backgroundColor: "#14171A", width: "32px", height: "32px" }}
        >
          <FontAwesomeIcon icon={faXTwitter} color="white" fontSize={14} />
        </div>
      </TwitterShareButton>
      <EmailShareButton url={url}>
        <EmailIcon size={iconSize} round={iconRound} />
      </EmailShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={iconSize} round={iconRound} />
      </WhatsappShareButton>
    </div>
  );
};

export default Sharer;
