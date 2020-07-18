export const rng = (min: number, max: number) => {
    return min + Math.round(Math.random() * (max - min));
}

export const arrayElement = (array: any[]) => {
    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
}