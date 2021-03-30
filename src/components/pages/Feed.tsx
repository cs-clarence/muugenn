import React, {
  ReactNode,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { v4 as uuid } from "uuid";
import LazyImage from "../partials/LazyImage";
import SettingsContext from "../contexts/settings-context";

type Props = {};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function ImageFeed(props: Props) {
  const settings = useContext(SettingsContext);
  const [images, setImages] = useState<ReactNode[]>([]);
  const getImageUrl = useCallback(() => {
    return encodeURI(
      `https://source.unsplash.com/${settings.idWidth}x${settings.idHeight}/?${
        settings.getSearchTerms()[
          getRandomInt(settings.getSearchTerms().length)
        ]
      }/${Math.floor(Math.random() * 1000)}`
    );
  }, [settings]);

  const fetchImages = useCallback(
    (n: number = 15) => {
      for (let i = 0; i < n; ++i) {
        // console.log(uuid());
        setImages((prev) => {
          prev.push(
            Array(n),
            <LazyImage src={getImageUrl()} alt="unsplash" key={uuid()} />
          );
          return [...prev];
        });
      }
    },
    [getImageUrl]
  );

  useEffect(() => {
    window.addEventListener("scroll", (ev: Event) => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - window.innerHeight / 2
      ) {
        fetchImages();
      }
    });
    fetchImages();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3">
      {images}
    </div>
  );
}

export { ImageFeed as default };
