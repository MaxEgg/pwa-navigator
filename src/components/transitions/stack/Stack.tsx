import { ITransistion } from "../types";
import styles from "./style.module.css";
import baseStyles from "../../style.module.css";

class Stack implements ITransistion {
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
        this.onTransitionEnd = onTransitionEnd;
        root?.addEventListener("touchstart", this.stopPropagation, { passive: true });
        root?.addEventListener("touchmove", this.stopPropagation, { passive: true });
        root?.addEventListener("touchend", this.stopPropagation, { passive: true });
    }

    to = (path: string, transiton: boolean) => {
        const paths = this.paths;

        for (const path in paths) {
            paths[path].classList.add(baseStyles.invisible);
            paths[path].classList.remove(baseStyles.visible);
        }
        paths[path].classList.remove(baseStyles.invisible);
        paths[path].classList.add(baseStyles.visible);

        if (transiton) {
            console.log("styles.=", styles.stack);
            paths[path].style.animation = `${styles.stack} 0.5s ease-out`;
        }
    }

    stopPropagation = (event: TouchEvent) => {
        event.stopPropagation();
    }
}

export default Stack;