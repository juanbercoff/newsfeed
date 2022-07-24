import Button from '../common/button';

type ImageOptionsProps = {
  setSelectedImage: (image: string | null) => void;
};

const ImageOptions = ({ setSelectedImage }: ImageOptionsProps) => {
  return (
    <div className="absolute cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-all top-0 group-hover:-top-9">
      <Button
        onClick={() => setSelectedImage(null)}
        type="button"
        use="secondary"
      >
        Cambiar imagen
      </Button>
    </div>
  );
};

export default ImageOptions;
