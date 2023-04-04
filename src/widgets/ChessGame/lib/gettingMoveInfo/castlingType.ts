import { getPieceType } from "../../lib/gettingPieceInfo/PieceType";
import { PieceTypes } from "../../types/enums";

export const checkCastlingType = (
    selectedPiece: number,
    targetIndex: number,
    selectedIndex: number,
) => {
    return getPieceType(selectedPiece) === PieceTypes.KING &&
        Math.abs(targetIndex - selectedIndex) === 2
        ? true
        : false;
};
