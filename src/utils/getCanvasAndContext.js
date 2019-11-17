export default function getCanvasAndContext(id) {
	let canvas = document.getElementById(`RAF-canvas-${id}`);
	let ctx = canvas && canvas.getContext('2d');
	return [canvas, ctx];
}
