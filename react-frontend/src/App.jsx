import Grid from './Grid'
import Board from './Board'
import { useState } from 'react';

function App() {
  return (
    <>
      <Grid grid={['?????', '#.?.#', '?????', '#.?.#']}/>
      <Board board={['999999999', '999999999', '999999999','999999999','999999999','999999999','999999999','999999999','999999999',]}/>
    </>
  )
}

export default App;