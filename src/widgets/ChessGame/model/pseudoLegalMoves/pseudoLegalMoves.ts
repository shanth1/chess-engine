import { PieceTypes } from "../../types/enums";
import { getPieceType } from "../../lib/gettingPieceInfo/PieceType";
import { getKnightMoves } from "./knightMoves";
import { getSlidingMoves } from "./slidingMoves";
import { getKingMoves } from "./kingMoves";
import { getPawnMoves } from "./pawnMoves";

export const getPseudoLegalMoves = (
    piecePlacement: Array<number>,
    selectedSquareIndex: number,
): Array<number> => {
    let pseudoLegalMoves: Array<number> = [];

    const selectedPieceType = getPieceType(piecePlacement[selectedSquareIndex]);

    switch (selectedPieceType) {
        case PieceTypes.QUEEN:
        case PieceTypes.ROOK:
        case PieceTypes.BISHOP:
            pseudoLegalMoves = getSlidingMoves(
                piecePlacement,
                selectedSquareIndex,
            );
            break;
        case PieceTypes.KNIGHT:
            pseudoLegalMoves = getKnightMoves(
                piecePlacement,
                selectedSquareIndex,
            );
            break;
        case PieceTypes.KING:
            pseudoLegalMoves = getKingMoves(
                piecePlacement,
                selectedSquareIndex,
            );
            break;

        case PieceTypes.PAWN:
            pseudoLegalMoves = getPawnMoves(
                piecePlacement,
                selectedSquareIndex,
            );
            break;
    }

    return pseudoLegalMoves;
};