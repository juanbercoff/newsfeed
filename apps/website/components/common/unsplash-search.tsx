import { useState } from 'react';
import { useGetImages } from '../../hooks/useUnsplash';
import useDebounce from '../../hooks/useDebounce';
import Spinner from './spinner';
import Image from 'next/image';
import ImageOptions from '../article-form/image-options';

type UnsplashSearchProps = {
  selectedImage: string;
  setSelectedImage: (image: string | null) => void;
};

const UnsplashSearch = ({
  selectedImage,
  setSelectedImage,
}: UnsplashSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const debouncedSearchQuery = useDebounce(searchTerm, 600);
  const { data: images, isLoading } = useGetImages(
    debouncedSearchQuery,
    pageNumber
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageNumber(1);
    setSearchTerm(e.target.value);
  };

  if (selectedImage) {
    return (
      <div className="relative flex justify-center py-2">
        <ImageOptions setSelectedImage={setSelectedImage} />
        <div className="hover:opacity-60">
          <Image
            src={selectedImage}
            objectFit="cover"
            alt="article picture"
            width={842}
            height={615}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col">
        <input
          className="outline-none border-b-2 bg-transparent w-full my-2"
          onChange={handleChange}
          value={searchTerm}
          placeholder="Busca la imagen que vas a usar de portada"
        ></input>
        {searchTerm ? (
          <div className="flex justify-between p-2">
            <p
              className={`cursor-pointer ${
                pageNumber === 1 ? 'text-gray-500 cursor-not-allowed' : ''
              }`}
              onClick={() => {
                if (pageNumber === 1) return;
                setPageNumber(pageNumber - 1);
              }}
            >
              Pagina anterior
            </p>
            <p
              className="cursor-pointer"
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Pagina siguiente
            </p>
          </div>
        ) : null}
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="relative flex flex-col justify-center">
          <div className="columns-3 [column-fill:_balance] box-border mx-auto before:box-inherit after:box-inherit">
            {images.data.results.map((image) => (
              <img
                onClick={() => {
                  setSelectedImage(image.urls.regular);
                }}
                key={image.id}
                src={image.urls.regular}
                alt=""
                className="break-inside-avoid py-2"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnsplashSearch;
