const countGridSize = () => {
    const minResult = 10;
    const maxResult = 32;
    const minDimension = Math.min(window.innerWidth, window.innerHeight);
  
    const countedResult = minDimension / 20;
  
    return Math.round(Math.max(Math.min(countedResult, maxResult), minResult));
};

export default countGridSize;