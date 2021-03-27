import React, { ReactNode } from "react";
import { v4 as uuid } from "uuid";
import LazyImage from "../partials/LazyImage";

type Props = {};
type State = {};

const searchKeywords = [
  "illustrations",
  "fashion",
  "beauty",
  "nature",
  "drawings",
  "graphics",
  "flowers",
  "ocean",
  "anime",
  "japan",
  "pets",
  "cats",
  "dogs",
  "tattoo",
];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

class ImageFeed extends React.Component<Props, State> {
  // constructor
  constructor(props: Props) {
    super(props);

    // permanently bind 'this' to methods
    this.fetchImages = this.fetchImages.bind(this);

    // fetch initial images
    this.images = [];

    this.fetchImages();

    // handle adding more images for infinite scrolling
    window.addEventListener("scroll", (ev: Event) => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - window.innerHeight / 2
      ) {
        this.fetchImages();
      }
    });
  }

  // render method
  render() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3">
        {this.images}
      </div>
    );
  }

  // private fields
  private images: ReactNode[];

  // methods
  public fetchImages(n = 15) {
    if (this.images) {
      for (let i = 0; i < n; ++i) {
        // console.log(uuid());
        this.images.push(
          Array(n),
          <LazyImage
            src={`https://source.unsplash.com/1280x720/?${
              searchKeywords[getRandomInt(searchKeywords.length)]
            }/${Math.random()}`}
            alt="unsplash"
            key={uuid()}
          />
        );
      }

      this.forceUpdate();
    }
  }
}

export { ImageFeed as default };
