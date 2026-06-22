function Board({ board }) {
    return (
        <div className="board">
            {board.map((row, row_index) => 
                row.split("").map((column, column_index) => 
                (<div key={`${column_index}-${row_index}`} className="board_cell">{column}</div>)
                )
            )}
        </div>
    );
}

export default Board