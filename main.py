from fastapi import FastAPI
from pydantic import BaseModel
from solver import solver
import random
from validator import is_valid
from classes import Board, SudokuRequest, Grid, Grid_Node, GridRequest
from generator import board_generator, grid_generator
from pathfinding_algorithm import bfs, dfs, dijkstra, astar
valid_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]


app = FastAPI()

@app.get("/generate_grid")
def generate_grid():
    grid = grid_generator()

    return {
        "grid": grid
    }

@app.get("/generate_board")
def generate_board():
    board = [[], [], [], [], [], [], [], [], []]
    for y in range(9):
        for x in range(9):
            board[y].append(0)

    board = Board(board)
    board.append_positions()

    board_generator(board)

    positions = list(board.nodes.keys())

    random.shuffle(positions)

    for position in positions[:40]:
        board.nodes[position].number = 0

    return {
        "board": board.to_list()
    }

@app.post("/solve_grid")
def solve_grid(request: GridRequest):
    bfs_grid = Grid(request.grid)
    dfs_grid = Grid(request.grid)
    dijkstra_grid = Grid(request.grid)
    astar_grid = Grid(request.grid)
    

    bfs_nodes, solved_bfs_grid, bfs_steps = bfs(bfs_grid)
    dfs_nodes, solved_dfs_grid, dfs_steps = dfs(dfs_grid)
    dijkstra_nodes, solved_dijkstra_grid, dijkstra_steps = dijkstra(dijkstra_grid)
    astar_nodes, solved_astar_grid, astar_steps = astar(astar_grid)

    return {
        "bfs": {"bfs_nodes": bfs_nodes, "solved_bfs_grid": solved_bfs_grid.to_list(), "bfs_steps": bfs_steps},
        "dfs": {"dfs_nodes": dfs_nodes, "solved_dfs_grid": solved_dfs_grid.to_list(), "dfs_steps": dfs_steps},
        "dijkstra": {"dijkstra_nodes": dijkstra_nodes, "solved_dijkstra_grid": solved_dijkstra_grid.to_list(), "dijkstra_steps": dijkstra_steps},
        "astar": {"astar_nodes": astar_nodes, "solved_astar_grid": solved_astar_grid.to_list(), "astar_steps": astar_steps},
    }

@app.post("/solve_board")
def solve_board(request: SudokuRequest):

    board = Board(request.board)
    board.append_positions()
    
    solved = solver(board)

    if not solved:
        return {
            "solved": solved,
            "board": board.to_list(),
            "error": "Board is unsolvable"
        }

    return {
        "solved": solved,
        "board": board.to_list()
    }