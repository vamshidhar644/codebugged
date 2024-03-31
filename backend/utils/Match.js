async function compareDetections(detections1, detections2) {
  // Calculate similarity score between two detections
  const calculateSimilarityScore = (det1, det2) => {
    // Calculate the Euclidean distance between the center points of the face boxes
    const centerDistance = Math.sqrt(
      Math.pow(det1._box._x - det2._box._x, 2) +
        Math.pow(det1._box._y - det2._box._y, 2)
    );

    // Calculate the ratio of width and height differences
    const widthRatio =
      Math.abs(det1._box._width - det2._box._width) /
      Math.min(det1._box._width, det2._box._width);
    const heightRatio =
      Math.abs(det1._box._height - det2._box._height) /
      Math.min(det1._box._height, det2._box._height);

    // Calculate the overall similarity score
    const similarityScore = 1 / (1 + centerDistance + widthRatio + heightRatio);

    console.log(similarityScore);

    return similarityScore;
  };

  // Check if any of the detections have a similarity score above a certain threshold
  const similarityThreshold = 0.01; // Adjust as needed

  return (
    calculateSimilarityScore(detections1, detections2) >= similarityThreshold
  );
}

module.exports = { compareDetections };
