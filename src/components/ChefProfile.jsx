import { useState } from "react";
import "../pages/Chef.css";

export default function ChefProfile({ altName, name, images, intro }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="chefBlock">
      <div className="chefGrid">
        <div className="chefImages">
          <img src={mainImage} alt={`${altName} メイン`} className="mainImage" />
          <div className="thumbRow">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${altName} サムネ${i + 1}`}
                className={`thumb ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
        <div className="chefIntro">
          <h2>{name}</h2>
          <p>{intro}</p>
        </div>
      </div>
    </div>
  );
}
