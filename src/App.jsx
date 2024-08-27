import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
function App() {
  const [img, setImg] = useState("");

  const onChangeHandler = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      const dataURL = e.target.result;

      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");

      // Load your image
      const image = new Image();
      image.src = dataURL;
      image.onload = () => {
        // Set canvas dimensions to match image dimensions
        canvas.width = image.width;
        canvas.height = image.height;

        // Define original and destination coordinates
        const srcCoords = [
          { x: 0, y: 0 }, // Top-left
          { x: image.width, y: 0 }, // Top-right
          { x: 0, y: image.height }, // Bottom-left
          { x: image.width, y: image.height }, // Bottom-right
        ];

        const dstCoords = [
          { x: 10, y: 10 }, // Top-left
          { x: 120, y: 20 }, // Top-right
          { x: 20, y: 130 }, // Bottom-left
          { x: 130, y: 140 }, // Bottom-right
        ];

        // Create transformation matrix
        const matrix = computeTransformMatrix(srcCoords, dstCoords);

        // Apply the transformation
        ctx.setTransform(...matrix);
        ctx.drawImage(image, 0, 0);
      };

      // Function to compute the transformation matrix

      reader.readAsDataURL(file);
    };
  };
  function computeTransformMatrix(src, dst) {
    const [x0, y0] = [src[0].x, src[0].y];
    const [x1, y1] = [src[1].x, src[1].y];
    const [x2, y2] = [src[2].x, src[2].y];
    const [x3, y3] = [src[3].x, src[3].y];

    const [x0p, y0p] = [dst[0].x, dst[0].y];
    const [x1p, y1p] = [dst[1].x, dst[1].y];
    const [x2p, y2p] = [dst[2].x, dst[2].y];
    const [x3p, y3p] = [dst[3].x, dst[3].y];

    // Compute the matrix components
    const A = x0p * y3 - x3p * y0 - (x0 * y3p - x3 * y0p);
    const B = x1p * y0 - x0p * y1 - (x1 * y0p - x0 * y1p);
    const C = x2p * y1 - x1p * y2 - (x2 * y1p - x1 * y2p);

    const D = x3p * y1 - x1p * y3 - (x3 * y1p - x1 * y3p);
    const E = x0p * y2 - x2p * y0 - (x0 * y2p - x2 * y0p);
    const F = x1p * y2 - x2p * y1 - (x1 * y2p - x2 * y1p);

    const G = x0 * y3p - x3 * y0 - (x0p * y3 - x3p * y0p);
    const H = x1 * y0p - x0 * y1p - (x1p * y0 - x0p * y1);
    const I = x2 * y1p - x1 * y2p - (x2p * y1 - x1p * y2);

    return [A, B, C, D, E, F, G, H, I];
  }
  // const onChangeHandler = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       const dataURL = e.target.result;
  //       const canvas = document.getElementById("myCanvas");
  //       const ctx = canvas.getContext("2d");
  //       const img = new Image();

  //       img.src = dataURL;

  //       img.onload = () => {
  //         canvas.width = img.width;
  //         canvas.height = img.height;

  //         // ctx.clearRect(0, 0, canvas.width, canvas.height);
  //         ctx.drawImage(img, 0, 0);
  //         ctx.fillStyle = "red";

  //         const cords = {
  //           "top-left": {
  //             x: 247.74380804953563,
  //             y: 341.01780185758514,
  //           },
  //           "top-right": {
  //             x: 457.8939628482972,
  //             y: 348.01780185758514,
  //           },
  //           "bottom-left": {
  //             x: 436.89396284829724,
  //             y: 651.9698142414861,
  //           },
  //           "bottom-right": {
  //             x: 276.74380804953563,
  //             y: 644.9698142414861,
  //           },
  //         };

  //         Object.values(cords).forEach((point) => {
  //           ctx.beginPath();
  //           ctx.arc(point.x, point.y, 5, 0, Math.PI * 2, true);
  //           ctx.fill();
  //         });
  //       };
  //     };

  //     setImg(file);
  //     reader.readAsDataURL(file);
  //   }
  // };
  return (
    <>
      <div>
        <input type="file" onChange={onChangeHandler} accept="image/*" />
        <canvas id="myCanvas"></canvas>
        <button onClick={() => {}}>CalCulate</button>
      </div>
    </>
  );
}

export default App;
