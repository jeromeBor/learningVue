import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";

// icon de paris
export const toulouse = new Feature({
  geometry: new Point(fromLonLat([1.444209, 43.604652])),
  name: "Toulouse",
  anchorOrigin: "bottom-left",
});
toulouse.setStyle(
  new Style({
    image: new Icon({
      src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png",
    }),
  })
);

// icon de paris
export const paris = new Feature({
  geometry: new Point(fromLonLat([2.353, 48.8566])),
  name: "Paris",
});
paris.setStyle(
  new Style({
    image: new Icon({
      crossOrigin: "anonymous",
      src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png",
    }),
  })
);

//icon de lyon
export const lyon = new Feature({
  geometry: new Point(fromLonLat([4.835659, 45.764043])),
  name: "Lyon",
});
lyon.setStyle(
  new Style({
    image: new Icon({
      crossOrigin: "anonymous",
      src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png",
    }),
  })
);
