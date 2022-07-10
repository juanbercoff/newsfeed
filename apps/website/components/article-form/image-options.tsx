type ImageOptionsProps = {
  setSelectedImage: (image: string | null) => void;
};

const ImageOptions = ({ setSelectedImage }: ImageOptionsProps) => {
  return (
    <div className="absolute cursor-pointer">
      <p onClick={() => setSelectedImage(null)}>Cambiar imagen</p>
    </div>
  );
};

export default ImageOptions;
