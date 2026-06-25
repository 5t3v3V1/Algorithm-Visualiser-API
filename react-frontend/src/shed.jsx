const socketRef3 = useRef(null);

    async function solve_board(input) {
      try {
        if (socketRef3.current) socketRef3.current.close();
        const socket = new WebSocket(`wss://algorithm-visualiser-api.onrender.com/solve_board`);
        socketRef3.current = socket
        socket.onopen = () => {
          socket.send(
            JSON.stringify({
              board: input
            })
          );
        };
        
        socket.send(input)

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log(data);
          
          if (data.type === "board_step") {
            setBoardStep(data.board)
          }
          if (data.type === "finished_board") {
            setInputBoard(data.generated_board);
            setGeneratedBoard(data.generated_board);
            setSolvedBoard(data.solved_board);
            setBoardMove(data.moves);
            setBoardTime(data.time_ms.toFixed(2));
          }
          if (data.type === "unfinished_board") {
            setInputBoard(data.generated_board);
            setGeneratedBoard(data.generated_board);
            setSolvedBoard(data.solved_board);
            setBoardMove(data.moves);
            setBoardTime(data.time_ms.toFixed(2));
          }
        }
      } catch(err) {
        console.log(err);
      }
    };


    const socketRef4 = useRef(null);
    
    async function solve_grid(input) {
      try {
        if (socketRef4.current) socketRef4.current.close();
        const socket = new WebSocket(`wss://algorithm-visualiser-api.onrender.com/solve_grid`);
        socketRef4.current = socket
        socket.onopen = () => {
          socket.send(
            JSON.stringify({
              grid: input
            })
          );
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log(data);
          if (data.type === "step"){
            if (data.algorithm === "BFS") setBfsGridStep(data.grid);
            if (data.algorithm === "DFS") setDfsGridStep(data.grid);
            if (data.algorithm === "Dijkstra") setDijkstraGridStep(data.grid);
            if (data.algorithm === "A*") setAstarGridStep(data.grid);
          };

          if (data.type === "finished") {
            setInputGrid(data.generate_solved_grid);
            setGeneratedGrid(data.generated_grid);
            setBfsNodes(data.bfs.bfs_nodes);
            setSolvedBfsGrid(data.bfs.solved_bfs_grid);
            setBfsTime(data.bfs.time_ms.toFixed(2));
            setDfsNodes(data.dfs.dfs_nodes);
            setSolvedDfsGrid(data.dfs.solved_dfs_grid);
            setDfsTime(data.dfs.time_ms.toFixed(2));
            setDijkstraNodes(data.dijkstra.dijkstra_nodes);
            setSolvedDijkstraGrid(data.dijkstra.solved_dijkstra_grid);
            setDijkstraTime(data.dijkstra.time_ms.toFixed(2));
            setAstarNodes(data.astar.astar_nodes);
            setSolvedAstarGrid(data.astar.solved_astar_grid);
            setAstarTime(data.astar.time_ms.toFixed(2));

            const results = [
              {name: "BFS", time: data.bfs.time_ms},
              {name: "DFS", time: data.dfs.time_ms},
              {name: "Dijkstra", time: data.dijkstra.time_ms},
              {name: "A*", time: data.astar.time_ms}
            ];

            results.sort((a,b) => a.time - b.time);

            setWinner(results[0].name)
          }
        }
      } catch(err) {
        console.log(err);
      };
    };

    async function solve_board_prews(input) {
      try {
        setInputBoard(input)
        const data = { inputBoard }
        const response = await fetch(`${API_URL}/solve_board_prews`, {
          method = 'POST',
          body = JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed");
        const data = await response.json();

        console.log(data);
        setGeneratedBoard(data.generated_board);
        animate_steps(data.board_steps, setBoardStep)
        setSolvedBoard(data.solved_board);
        setBoardMove(data.moves);
        setBoardTime(data.time_ms.toFixed(2));
      } catch(err) {
        console.log(err);
      }
    };

    async function solve_grid_prews(input) {
      try {
        setInputGrid(input)
        const data = { inputGrid }
        const response = await fetch(`${API_URL}/solve_grid_prews`, {
          method = 'POST',
          body = JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed")
        const data = await response.json();

        console.log(data);
        setGeneratedGrid(data.generated_grid);
        setBfsNodes(data.bfs.bfs_nodes);
        setSolvedBfsGrid(data.bfs.solved_bfs_grid);
        animate_steps(data.bfs.bfs_steps, setBfsGridStep);
        setBfsTime(data.bfs.time_ms.toFixed(2));
        setDfsNodes(data.dfs.dfs_nodes);
        setSolvedDfsGrid(data.dfs.solved_dfs_grid);
        animate_steps(data.dfs.dfs_steps, setDfsGridStep);
        setDfsTime(data.dfs.time_ms.toFixed(2));
        setDijkstraNodes(data.dijkstra.dijkstra_nodes);
        setSolvedDijkstraGrid(data.dijkstra.solved_dijkstra_grid);
        animate_steps(data.dijkstra.dijkstra_steps, setDijkstraGridStep);
        setDijkstraTime(data.dijkstra.time_ms.toFixed(2));
        setAstarNodes(data.astar.astar_nodes);
        setSolvedAstarGrid(data.astar.solved_astar_grid);
        animate_steps(data.astar.astar_steps, setAstarGridStep);
        setAstarTime(data.astar.time_ms.toFixed(2));

        const results = [
            {name: "BFS", time: data.bfs.time_ms},
            {name: "DFS", time: data.dfs.time_ms},
            {name: "Dijkstra", time: data.dijkstra.time_ms},
            {name: "A*", time: data.astar.time_ms}
        ];

        results.sort((a,b) => a.time - b.time);

        setWinner(results[0].name)
      } catch(err) {
        console.log(err);
      };
    };