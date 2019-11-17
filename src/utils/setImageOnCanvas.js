import { getCanvasAndContext } from ".";

export default function setImageOnCanvas(image, size, id) {
	let [canvas, ctx] = getCanvasAndContext(id);
	let img = new Image(size, size);
	img.src = image;
	img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}