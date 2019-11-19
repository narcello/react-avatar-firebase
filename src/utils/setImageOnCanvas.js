import getCanvasAndContext from "./getCanvasAndContext"

export default function setImageOnCanvas(image, size, id) {
	let [canvas, ctx] = getCanvasAndContext(id)
	let img = new Image(size, size)
	if (isSvg(image))
		drawSvg()
	else drawImage()

	function drawImage() {
		img.src = image;
		img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
	}

	function drawSvg() {
		const [svgWidth, svgHeight] = getSvgDimensions(image)
		let posX = canvas.width / 2 - svgWidth / 2,
			posY = canvas.height / 2 - svgHeight / 2
		img.src = svgToImg(image)
		img.onload = () => ctx.drawImage(img, posX, posY)
	}
}

function svgToImg(svg) {
	var svg64 = btoa(svg)
	var b64Start = 'data:image/svg+xml;base64,'
	return b64Start + svg64;
}

function isSvg(image) {
	return image.startsWith('<svg ')
}

function getSvgDimensions(svgString) {
	let firstExp = /(width|height)=['|"][0-9]+['|"]/g
	let secondExp = /[0-9]+/
	let dimensions = svgString.match(firstExp)
	return dimensions.map(item => item.match(secondExp)[0])
}