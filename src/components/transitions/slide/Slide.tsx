import { ITransistion } from "../types";
import globalStyles from "../../style.module.css";
import styles from "./style.module.css";

class Slide implements ITransistion {
    startClientX: number = 0;
    distance: number = 0;
    root: HTMLDivElement | null = null;
    paths: { [key: string]: HTMLDivElement } = {};
    slideRoutes: { [key: string]: number } = {};
    hitLeftSide: boolean = false;
    hitRightSide: boolean = false;
    activePath: string = "";
    onTransitionEnd: (path: string) => void;

    constructor(root: HTMLDivElement | null, paths: { [key: string]: HTMLDivElement }, onTransitionEnd: (path: string) => void) {
        this.root = root;
        this.paths = paths;
        root?.addEventListener("touchstart", this.touchstart, { passive: true });
        root?.addEventListener("touchmove", this.touchmove, { passive: true });
        root?.addEventListener("touchend", this.touchend, { passive: true });
        this.onTransitionEnd = onTransitionEnd;

        setTimeout(() => {
            this.startPosition(false);
        }, 0);
    }

    to = (path: string, transiton: boolean) => {
        setTimeout(() => {
            if (path !== this.activePath) {
                const paths = this.paths;
                const position = paths[path].offsetLeft;
                this.activePath = path;

                if (!transiton) {
                    for (const path in paths) {
                        paths[path].classList.remove(styles.transition);
                    }
                }
                for (const path in paths) {
                    paths[path].style.left = paths[path].offsetLeft - position + "px";
                }
            }
            for (const path in this.paths) {
                this.paths[path].classList.add(globalStyles.visible);
            }
        }, 0)
    }

    startPosition = (transiton: boolean) => {
        const paths = this.paths;
        const root = this.root;
        const navigatorViewportWidth = root?.clientWidth || 0;

        for (const path in paths) {
            if (!transiton) {
                paths[path].classList.remove(styles.transition);
            } else {
                paths[path].classList.add(styles.transition);
            }
        }

        let index = 0;
        for (const path in paths) {
            paths[path].style.left = navigatorViewportWidth * index++ + "px";
        }
    }

    endPosition = (transiton: boolean) => {
        if (this.root) {
            const paths = this.paths;
            const root = this.root;
            const navigatorViewportWidth = root.clientWidth || 0;

            for (const path in paths) {
                if (!transiton) {
                    paths[path].classList.remove(styles.transition);
                } else {
                    paths[path].classList.add(styles.transition);
                }
            }

            let index = Object.keys(paths).length - 1;
            for (const path in paths) {
                paths[path].style.left = -navigatorViewportWidth * index-- + "px";
            }
        }
    }

    touchstart = (event: TouchEvent) => {
        event.stopPropagation();
        this.startClientX = event.changedTouches[0].clientX;
        this.distance = 0;
        const slideRoutes = this.slideRoutes;
        const paths = this.paths;

        for (const path in paths) {
            slideRoutes[path] = parseFloat(paths[path].style.left)
            paths[path].classList.remove(styles.transition);
        }
    }

    touchmove = async (event: TouchEvent) => {
        event.stopPropagation();
        if (this.root) {
            this.distance = this.startClientX - event.changedTouches[0].clientX;
            const distance = this.distance;
            const paths = this.paths;
            const root = this.root;
            const slideRoutes = this.slideRoutes;

            if (distance > 20 || distance < -20) {
                const rootWidth = root.clientWidth || 0;
                const lenght = Object.keys(paths).length;
                let index = 0;

                for (const path in paths) {
                    const currentPosition = parseFloat(paths[path].style.left);

                    if (index === 0 && currentPosition >= 0 && distance <= 0) {
                        this.startPosition(true);
                        break;
                    } else if (index === 0 && currentPosition <= -(rootWidth * (lenght - 1)) && distance >= 0) {
                        this.endPosition(true);
                        break;
                    } else {
                        paths[path].style.left = slideRoutes[path] - distance + "px";
                    }

                    index++;
                }
            }
        }
    }

    touchend = (event: TouchEvent) => {
        event.stopPropagation();
        const paths = this.paths;
        const root = this.root;
        const rootWidth = root?.clientWidth || 0;
        const percentage = this.distance / rootWidth * 100;
        this.slideRoutes = {};

        for (const path in paths) {
            paths[path].classList.add(styles.transition);
            const currentPosition = parseFloat(paths[path].style.left);
            let newPosition;

            if (percentage > 30) {
                newPosition = Math.floor(currentPosition / rootWidth) * rootWidth;
            } else if (percentage < 30) {
                newPosition = Math.ceil(currentPosition / rootWidth) * rootWidth;
            }

            paths[path].style.left = newPosition + "px"

            if (newPosition === 0 && currentPosition !== newPosition && path !== this.activePath) {
                this.activePath = path;
                this.onTransitionEnd(this.activePath);
            }
        }
    }
}

export default Slide;