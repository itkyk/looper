export interface defaultObj {
  childName: string,
  direction: string,
  fps: number,
  speed: number,
  clone: number
}

const defaultOption:defaultObj = {
  childName: ".js-loop-contents",
  direction: "left",
  fps: 60,
  speed: 1.2,
  clone: 1
}

export default defaultOption;