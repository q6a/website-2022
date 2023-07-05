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
  TwitterIcon,
  EmailIcon,
  WhatsappIcon,
} from "react-share";

const Sharer = ({ url }: { url: string }) => {
  const iconSize = 32;
  const iconRound = true;

  return (
    <div className="d-flex justify-content-center pt-3 gap-2">
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={iconSize} round={iconRound} />
      </LinkedinShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size={iconSize} round={iconRound} />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={iconSize} round={iconRound} />
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
