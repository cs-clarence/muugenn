import axios from "axios";
import React, { useEffect, useState } from "react";
import cn from "classnames";
import LazyImage from "../LazyImage";

type Props = {
  src: string;
  alt?: string;
  onOpen?: (img: { src: string; alt?: string }) => void;
};

const urlRegex = /https:\/\/images\.unsplash\.com\/photo-\w{13}-\w{12}/;

function ImageCard({ src, alt, onOpen }: Props) {
  const [blobURL, setBlobURL] = useState("");
  const [imgURL, setImgUrl] = useState("");
  const [loadImage, setLoadImage] = useState(false);
  useEffect(() => {
    axios({ method: "GET", url: src, responseType: "blob" })
      .then((response) => {
        setBlobURL(URL.createObjectURL(response.data));
        setImgUrl(
          urlRegex[Symbol.match](response.request?.responseURL)?.[0] ?? ""
        );
        setLoadImage(true);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={cn(
        `relative overflow-hidden h-full w-full rounded-lg 
      transform transition-transform duration-150 cursor-pointer`,
        { "hover:shadow-xl hover:scale-105": loadImage }
      )}
      onClick={() => onOpen?.({ src: blobURL, alt })}
    >
      <div
        className={cn(
          `absolute bottom-0 bg-white dark:bg-gray-700
        w-full h-9 z-30 flex flex-row justify-end items-center px-2 opacity-50
        transition-opacity`,
          { "hover:opacity-75": loadImage }
        )}
      >
        <span
          className={cn(
            `fas fa-expand-arrows-alt fa-lg mx-1 cursor-pointer 
          transform ease-in-out transition-transform`,
            { "hover:-translate-y-1": loadImage }
          )}
          title="view this image"
          onClick={(ev) => {
            onOpen?.({ src: blobURL, alt });
          }}
        ></span>
        <a
          href={imgURL}
          target="_blank"
          rel="noreferrer"
          onClick={(ev) => ev.stopPropagation()}
        >
          <span
            className={`fas fa-external-link-alt fa-lg mx-1 cursor-pointer 
            transform ease-in-out transition-transform hover:-translate-y-1`}
            title="view original image"
          ></span>
        </a>

        <a href={blobURL} download onClick={(ev) => ev.stopPropagation()}>
          <span
            className={`fas fa-download fa-lg mx-1 cursor-pointer 
            transform ease-in-out transition-transform hover:-translate-y-1`}
            title="download"
          ></span>
        </a>
      </div>
      <LazyImage src={blobURL} alt={alt} load={loadImage}></LazyImage>
    </div>
  );
}

export { ImageCard as default };
