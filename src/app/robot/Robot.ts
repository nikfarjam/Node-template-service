import { Position } from "../model/Model";

interface IRobot {
    getPosition(): Position;

    rotateLeft(): void;

    rotateRight(): void;

    move(): boolean;

    dummy():void;
}

class Robot implements IRobot{
    
    getPosition(): Position {
        throw new Error("Method not implemented.");
    }

    rotateLeft(): void {
        throw new Error("Method not implemented.");
    }
    
    rotateRight(): void {
        throw new Error("Method not implemented.");
    }

    move(): boolean {
        throw new Error("Method not implemented.");
    }

    dummy(): void {}
    
}

export {IRobot, Robot};