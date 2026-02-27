import "./styles/Gallery.css";
import { galleryData } from "./data/galleryData";

const Gallery = () => {
  return (
    <section className="gallery-section" id="galeria">
      <div className="gallery-container">
        <div className="gallery-header">
          <p className="gallery-eyebrow">
            <span className="gallery-eyebrow-line"></span>
            {galleryData.header.subtitle}
            <span className="gallery-eyebrow-line"></span>
          </p>
          <h2 className="gallery-title">
            {galleryData.header.title}
            <br />
            <span className="gallery-title-accent">
              {galleryData.header.titleAccent}
            </span>
          </h2>
        </div>

        <div className="gallery-mosaic">
          {galleryData.photos.map((photo) => (
            <div
              key={photo.id}
              className={`gallery-item gallery-item--${photo.span}`}>
              {/* Placeholder — reemplaza con <img src="..." /> cuando tengas fotos */}
              <div className="gallery-item-placeholder">
                <img
                  src="/sublogo.png"
                  alt="BellaFit"
                  className="gallery-item-watermark"
                />
              </div>
              <div className="gallery-item-overlay">
                <span className="gallery-item-category">{photo.category}</span>
                <h3 className="gallery-item-label">{photo.label}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
