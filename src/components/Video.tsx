import { h, Component } from "preact";
import * as HLS from "hls.js";

interface IProps {
  url: string;
}

interface ILoadView {
  (video: HTMLVideoElement): void;
}

export default ({ url }: IProps) => {
  const loadVideo: ILoadView = video => {
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
