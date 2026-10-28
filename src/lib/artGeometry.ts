/** The image and the eye light share this cover plane, including portrait crops. */
export function coverFrame(
  width: number, height: number, imageWidth: number, imageHeight: number,
  positionX = .5, positionY = .5,
) {
  const scale = Math.max(width / imageWidth, height / imageHeight);
  const renderedWidth = imageWidth * scale;
  const renderedHeight = imageHeight * scale;
  return {
    width: renderedWidth, height: renderedHeight,
    left: (width - renderedWidth) * positionX,
    top: (height - renderedHeight) * positionY,
  };
}
