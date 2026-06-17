const generate_solve_board_button = document.getElementById("generate_solve_board");
const generate_solve_grid_button = document.getElementById("generate_solve_grid");
const generated_board = document.getElementById("generated_board");
const solved_board = document.getElementById("solved_board");
const generated_grid = document.getElementById("generated_grid");
const bfs_type = document.getElementById("bfs_type");
const bfs_nodes = document.getElementById("bfs_nodes");
const bfs_grid = document.getElementById("bfs_grid");
const bfs_steps = document.getElementById("bfs_steps")
const dfs_type = document.getElementById("dfs_type");
const dfs_nodes = document.getElementById("dfs_nodes");
const dfs_grid = document.getElementById("dfs_grid");
const dfs_steps = document.getElementById("dfs_steps")
const dijkstra_type = document.getElementById("dijkstra_type");
const dijkstra_nodes = document.getElementById("dijkstra_nodes");
const dijkstra_grid = document.getElementById("dijkstra_grid");
const dijkstra_steps = document.getElementById("dijkstra_steps")
const astar_type = document.getElementById("astar_type");
const astar_nodes = document.getElementById("astar_nodes");
const astar_grid = document.getElementById("astar_grid");
const astar_steps = document.getElementById("astar_steps")

generate_solve_board_button.addEventListener("click", async () => {
    const response = await fetch("http://127.0.0.1:8000/generate_solve_board");

    const data = await response.json();

    console.log(data);
    generated_board.innerText = data.generated_board.join("\n");
    solved_board.innerText = data.solved_board.join("\n");
})

generate_solve_grid_button.addEventListener("click", async () => {
    const response = await fetch("http://127.0.0.1:8000/generate_solve_grid");

    const data = await response.json();

    console.log(data);
    generated_grid.innerText = data.generated_grid.join("\n");
    bfs_type.innerText = "BFS";
    bfs_nodes.innerText = `Nodes Visited: ${data.bfs.bfs_nodes}`;
    bfs_grid.innerText = `Solved Grid: \n${data.bfs.solved_bfs_grid.join("\n")}`;
    bfs_steps.innerText = `Steps: ${data.bfs.bfs_steps.length}`;
    dfs_type.innerText = "DFS";
    dfs_nodes.innerText = `Nodes Visited: ${data.dfs.dfs_nodes}`;
    dfs_grid.innerText = `Solved Grid: \n${data.dfs.solved_dfs_grid.join("\n")}`;
    dfs_steps.innerText = `Steps: ${data.dfs.dfs_steps.length}`;
    dijkstra_type.innerText = "Dijkstra";
    dijkstra_nodes.innerText = `Nodes Visited: ${data.dijkstra.dijkstra_nodes}`;
    dijkstra_grid.innerText = `Solved Grid: \n${data.dijkstra.solved_dijkstra_grid.join("\n")}`;
    dijkstra_steps.innerText = `Steps: ${data.dijkstra.dijkstra_steps.length}`;
    astar_type.innerText = "A*";
    astar_nodes.innerText = `Nodes Visited: ${data.astar.astar_nodes}`;
    astar_grid.innerText = `Solved Grid: \n${data.astar.solved_astar_grid.join("\n")}`;
    astar_steps.innerText = `Steps: ${data.astar.astar_steps.length}`;
})