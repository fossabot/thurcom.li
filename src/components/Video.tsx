import { h, Component } from "preact";
import * as HLS from "hls.js";

interface IProps {
  url: string;
}
type TLoadView = (video: HTMLVideoElement) => void;
type TVideo = (props: IProps) => JSX.Element;

const Video: TVideo = ({ url }) => {
  const loadVideo: TLoadView = video => {
    if (!HLS.isSupported()) {
      return;
    }

    const hls: HLS = new HLS();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(HLS.Events.MANIFEST_PARSED, () => video.play());
  };

  return <video ref={loadVideo} controls />;
};

export default Video;
