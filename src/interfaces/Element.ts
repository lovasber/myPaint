import { Drawable } from "roughjs/bin/core";

export default interface Element {
    id: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    type: string,
    roughElement: Drawable
}
