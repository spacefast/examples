const KM_PER_MILE = 1.609344;
const METRES_PER_FOOT = 0.3048;

const trim = (value: number) => Number(value.toFixed(1)).toLocaleString("en-US");
const whole = (value: number) => Math.round(value).toLocaleString("en-US");

/** "5.4 mi / 8.7 km" — one canonical number, both unit systems. */
export const distanceLabel = (km: number) => `${trim(km / KM_PER_MILE)} mi / ${trim(km)} km`;

/** "1,488 ft / 454 m" */
export const elevationLabel = (metres: number) =>
  `${whole(metres / METRES_PER_FOOT)} ft / ${whole(metres)} m`;

export const kilometres = (km: number) => `${whole(km)} km`;

export const metres = (value: number) => `${whole(value)} m`;
