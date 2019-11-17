import { getCanvasAndContext } from '.';

export default function loadingProgress(id, progress, color) {
	let [canvas, ctx] = getCanvasAndContext(id);
	var posX = canvas.width / 2,
		posY = canvas.height / 2,
		progress = progress * 3.6,
		radius = posX;

	ctx.lineCap = 'round';
	ctx.strokeStyle = color;
	ctx.lineWidth = '7';
	ctx.beginPath();
	ctx.arc(posX, posY, radius, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + progress));
	ctx.stroke();
}
