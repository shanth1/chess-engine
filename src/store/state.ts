import {
    CastlingRightsCodes,
    ColorCodes,
    PieceCodes,
} from "./../models/_enums";
import { Colors } from "../models/_enums";

interface IGameState {
    piecePlacement: Array<number>;
    activeColor: Colors;
    castlingRights: number;
    enPassant: string;
    halfMoveClock: number;
    fullMoveNumber: number;
}

export const gameState: IGameState = {
    piecePlacement: [],
    activeColor: Colors.WHITE,
    castlingRights: CastlingRightsCodes.NeitherSide,
    enPassant: "-",
    halfMoveClock: 0,
    fullMoveNumber: 0,
};

function getPieceBinaryCodeFromFenSymbol(symbol: string): number {
    const pieceBinaryCode =
        symbol === "k"
            ? PieceCodes.KING
            : symbol === "q"
            ? PieceCodes.QUEEN
            : symbol === "r"
            ? PieceCodes.ROOK
            : symbol === "b"
            ? PieceCodes.BISHOP
            : symbol === "n"
            ? PieceCodes.KNIGHT
            : symbol === "p"
            ? PieceCodes.PAWN
            : PieceCodes.NONE;
    return pieceBinaryCode;
}

function setPiecePlacement(fenPiecePlacement: string): void {
    const piecePlacement: Array<number> = new Array(64);

    let file: number = 0;
    let rank: number = 0;

    for (let symbol of fenPiecePlacement) {
        if (symbol === "/") {
            file = 0;
            rank++;
        } else {
            if (!!Number(symbol)) {
                file += Number(symbol);
            } else {
                const pieceColor =
                    symbol === symbol.toUpperCase()
                        ? ColorCodes.WHITE
                        : ColorCodes.BLACK;

                const pieceType = getPieceBinaryCodeFromFenSymbol(
                    symbol.toLowerCase(),
                );
                piecePlacement[rank * 8 + file] = pieceColor | pieceType;
                file++;
            }
        }
    }
    gameState.piecePlacement = piecePlacement;
}

function setActiveColor(fenActiveColor: string): void {
    gameState.activeColor =
        fenActiveColor.toLowerCase() === "w" ? Colors.WHITE : Colors.BLACK;
}

function setCastlingRights(fenCastlingRights: string): void {
    for (let symbol of fenCastlingRights) {
        if (symbol === "K") {
            gameState.castlingRights =
                gameState.castlingRights |
                CastlingRightsCodes.WhiteKingNearRookSide;
        } else if (symbol === "Q") {
            gameState.castlingRights =
                gameState.castlingRights |
                CastlingRightsCodes.WitheKingQueenSide;
        } else if (symbol === "k") {
            gameState.castlingRights =
                gameState.castlingRights |
                CastlingRightsCodes.BlackKingNearRookSide;
        } else if (symbol === "q") {
            gameState.castlingRights =
                gameState.castlingRights |
                CastlingRightsCodes.BlackKingQueenSide;
        } else if (symbol === "-") {
            gameState.castlingRights = CastlingRightsCodes.NeitherSide;
        } else {
            alert("undefined castling right symbol");
        }
    }
}

function setEnPassant(fenEnPassant: string): void {
    gameState.enPassant = fenEnPassant;
}

function setHalfMoveClock(fenHalfMoveClock: string): void {
    const halfMoveClock: number = Number(fenHalfMoveClock);
    if (isNaN(halfMoveClock)) {
        alert("incorrect halfMoveClock: not a Number input");
    } else {
        gameState.halfMoveClock = halfMoveClock;
    }
}

function setFullMoveNumber(fenFullMoveNumber: string): void {
    const fullMoveNumber: number = Number(fenFullMoveNumber);
    if (isNaN(fullMoveNumber)) {
        alert("incorrect fullMoveNumber: not a Number input");
    } else {
        gameState.fullMoveNumber = fullMoveNumber;
    }
}

export function setGameFromFen(fen: string): void {
    setPiecePlacement(fen.split(" ")[0]);
    setActiveColor(fen.split(" ")[1]);
    setCastlingRights(fen.split(" ")[2]);
    setEnPassant(fen.split(" ")[3]);
    setHalfMoveClock(fen.split(" ")[4]);
    setFullMoveNumber(fen.split(" ")[5]);
}