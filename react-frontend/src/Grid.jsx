import Cell from './Cell'

function Grid({ grid }) {
    return (
        <div className='grid'>
            {grid.map((row, row_index) => row.split("").map((column, column_index) => (<Cell key={`${column_index}-${row_index}`} type={column} />)))}
        </div>
    );
}

export default Grid