import { PieceColors, PieceTypes } from "./../../types/enums";
import { getPieceColor } from "widgets/ChessGame/lib/gettingPieceInfo/PieceColor";
import {
    OffsetsPawnBlack,
    OffsetsPawnWhite,
} from "widgets/ChessGame/types/enums";
import { getPieceType } from "widgets/ChessGame/lib/gettingPieceInfo/PieceType";

export const getPawnMoves = (
    piecePlacement: Array<number>,
    selectedSquareIndex: number,
): Array<number> => {
    const pawnAttack = (
        offsetAttack: OffsetsPawnBlack | OffsetsPawnWhite,
    ): void => {
        if (!piecePlacement[selectedSquareIndex + offsetAttack]) return;
        const pieceColor = getPieceColor(
            piecePlacement[selectedSquareIndex + offsetAttack],
        );
        if (pieceColor === activeColor) return;
        const enemyPieceType = getPieceType(
            piecePlacement[selectedSquareIndex + offsetAttack],
        );
        if (enemyPieceType === PieceTypes.KING) return;
        legalMoves.push(selectedSquareIndex + offsetAttack);
    };

    const activeColor = getPieceColor(piecePlacement[selectedSquareIndex]);
    const legalMoves: Array<number> = [];

    const file: number = Math.floor(selectedSquareIndex / 8);
    const rank: number = selectedSquareIndex % 8;

    const isBlack: boolean = activeColor === PieceColors.BLACK ? true : false;

    const fileStart: number = isBlack ? 1 : 6;
    const fileFinish: number = isBlack ? 7 : 0;

    const rankRightSide: number = isBlack ? 0 : 7;
    const rankLeftSide: number = isBlack ? 7 : 0;

    const offsetForward: OffsetsPawnBlack.Forward | OffsetsPawnWhite.Forward =
        isBlack ? OffsetsPawnBlack.Forward : OffsetsPawnWhite.Forward;

    const offsetLeftAttack:
        | OffsetsPawnBlack.LeftAttack
        | OffsetsPawnWhite.LeftAttack = isBlack
        ? OffsetsPawnBlack.LeftAttack
        : OffsetsPawnWhite.LeftAttack;

    const offsetRightAttack:
        | OffsetsPawnBlack.RightAttack
        | OffsetsPawnWhite.RightAttack = isBlack
        ? OffsetsPawnBlack.RightAttack
        : OffsetsPawnWhite.RightAttack;

    if (file === fileFinish) return legalMoves;

    if (!piecePlacement[selectedSquareIndex + offsetForward]) {
        legalMoves.push(selectedSquareIndex + offsetForward);
        if (
            file === fileStart &&
            !piecePlacement[selectedSquareIndex + 2 * offsetForward]
        ) {
            legalMoves.push(selectedSquareIndex + 2 * offsetForward);
        }
    }

    if (rank === rankLeftSide) {
        pawnAttack(offsetRightAttack);
    } else if (rank === rankRightSide) {
        pawnAttack(offsetLeftAttack);
    } else {
        pawnAttack(offsetRightAttack);
        pawnAttack(offsetLeftAttack);
    }

    return legalMoves;
};
