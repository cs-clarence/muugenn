import React, {
  ReactNode,
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { v4 as uuid } from "uuid";
import ImageCard from "../partials/ImageCard";
import ImageViewer from "../partials/ImageViewer";
import SettingsContext, { SettingsState } from "../contexts/settings-context";
import { cloneDeep } from "lodash";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const resolutions = [1080, 720, 360, 480, 1440, 2160];
function getRandomResolution() {
  return resolutions[Math.floor(Math.random() * resolutions.length)];
}

type Props = {};

function ImageFeed(props: Props) {
  const tempState: SettingsState = useContext(SettingsContext).state;
  const state = useMemo(
    () => cloneDeep(tempState),
    // eslint-disable-next-line
    []
  );
  const [images, setImages] = useState<ReactNode[]>([]);
  const [viewedImage, setViewedImage] = useState<{ src: string; alt?: string }>(
    {
      src: "https://miro.medium.com/max/500/0*-ouKIOsDCzVCTjK-.png",
      alt: "viewed image",
    }
  );
  const [openViewer, setOpenViewer] = useState(false);

  const getImageUrl = useCallback(() => {
    let dimension = "";
    const randomSearchTerm = state.useSearchTerms
      ? state.getSearchTerms()[getRandomInt(state.getSearchTerms().length)]
      : state.searchTermsFallBack[
          getRandomInt(state.searchTermsFallBack.length)
        ];

    if (state.useImageDimension) {
      dimension = `${state.idWidth}x${state.idHeight}`;
    } else {
      let w = 1;
      let h = 1;

      if (state.arWidth > state.arHeight) {
        w = getRandomResolution();
        h = w * (state.arHeight / state.arWidth);
      } else {
        h = getRandomResolution();
        w = h * (state.arHeight / state.arWidth);
      }
      dimension = `${w}x${h}`;
    }

    return encodeURI(
      `https://source.unsplash.com/${dimension}/?${randomSearchTerm}/${Math.floor(
        Math.random() * 1000
      )}`
    );
    // eslint-disable-next-line
  }, []);

  const fetchImages = useCallback(
    (n: number = 15) => {
      for (let i = 0; i < n; ++i) {
        setImages((prev) => {
          prev.push(
            Array(n),
            <ImageCard
              src={getImageUrl()}
              alt="unsplash"
              key={uuid()}
              onOpen={(ev) => {
                setViewedImage(ev);
                setOpenViewer(true);
              }}
            />
          );
          return [...prev];
        });
      }
    },
    [getImageUrl]
  );

  useEffect(() => {
    setImages((prev) => {
      prev.length = 0;
      return [...prev];
    });
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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {images}
      </div>
      <ImageViewer
        src={viewedImage.src}
        open={openViewer && !!viewedImage.src}
        onClose={() => setOpenViewer(false)}
      />
    </>
  );
}

export { ImageFeed as default };
