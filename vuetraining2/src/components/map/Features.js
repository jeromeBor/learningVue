import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";

// icon de paris
export const toulouse = new Feature({
  geometry: new Point(fromLonLat([1.444209, 43.604652])),
  name: "toulouse",
  population: 497025,
});

toulouse.setId("toulouse");

// icon de paris
export const paris = new Feature({
  geometry: new Point(fromLonLat([2.353, 48.8566])),
  name: "paris",
  population: 513275,
});

paris.setId("paris");

//icon de lyon
export const lyon = new Feature({
  geometry: new Point(fromLonLat([4.835659, 45.764043])),
  name: "lyon",
  population: 513275,
});

lyon.setId("lyon");
