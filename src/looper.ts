import defaultOption, {defaultObj} from "./data/option";
import option from "./data/option";
class LoopContents {
    private readonly target: HTMLElement;
    private child: HTMLElement|null;
    private readonly defaultOption: defaultObj;
    private margin: number|null;
    private options: defaultObj;
    private posX:number|null;
    private totalWidth: number;
    private transformFunc: ()=>void;
    private isLoop:boolean;

    constructor(target: HTMLElement, options:object) {
        this.target = target;
        this.child = null;
        this.defaultOption = defaultOption;
        this.options = this.defaultOption;
        this.margin = null;
        this.posX = null;
        this.totalWidth = 0;
        this.transformFunc = ()=>{};
        this.isLoop = true;
        this._init(options);
    }

    /* show form users */
    margeOptions = (_option:Object) => {
        this.options = Object.assign(this.defaultOption, _option);
    }


    /* hide from users */
    _init = (_option:Object) => {
        this.margeOptions(_option);
        this._transformFunction();
        document.addEventListener("readystatechange", async () => {
            if (document.readyState === "complete") {
                await this._duplicateContents();
                requestAnimationFrame(this._moveContents);
            }
        });
    };

    _duplicateContents = () => {
        return new Promise<void>((resolve) => {
            this.child = this._getContents();
            for (let i = 0; i < this.options.clone; i++) {
                const child = this.child.cloneNode(true);
                this.target.appendChild(child);
            }
            resolve();
        });
    }

    _moveContents = () => {
        if (this.child !== null) {
            this.totalWidth = this.child.clientWidth + this._getTargetMargin().marginRight + this._getTargetMargin().marginLeft;
            this.target.style.width = `${this.totalWidth}px`;
            this.transformFunc();
            this.target.style.transform = `translateX(${this.posX}px)`;
            setTimeout(() => {
                requestAnimationFrame(this._moveContents);
            }, 1000 / this.options.fps);
        }
    };

    _transformFunction = () => {
        if (this.options.direction === "left") {
            this.transformFunc = ():void => {
                if (this.target.getBoundingClientRect().left <= this.totalWidth * -1 || this.posX === null) {
                    this.posX = 0;
                }
                this.posX -= this.options.speed;
            }
        } else if (this.options.direction === "right") {
            this.transformFunc = ():void => {
                if (this.target.getBoundingClientRect().right >= this.totalWidth || this.posX === null) {
                    this.posX = -this.totalWidth * this.options.clone;
                }
                this.posX += this.options.speed;
            }
        }
    }

    _getContents = () => {
        return this.target.querySelector(this.options.childName) as HTMLElement;
    }

    _getTargetMargin = () => {
        const ele = window.getComputedStyle(this._getContents());
        const {marginTop, marginRight, marginBottom, marginLeft} = ele;
        const margins = Object.fromEntries(
            Object.entries({
                marginTop,
                marginRight,
                marginBottom,
                marginLeft,
            })
                .map(([key, value]) => [key, parseFloat(value) || 0])
        );
        return margins;
    }
}

export default LoopContents;