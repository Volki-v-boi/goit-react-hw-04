export default function ImageCard({ src, alt, onClick }) {
  return (
    <div onClick={onClick}>
      <img src={src} alt={alt} />
    </div>
  );
}
