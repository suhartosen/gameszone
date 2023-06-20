document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const cells = Array.from(document.querySelectorAll('.cell'));
    const message = document.getElementById('message');
    const replayButton = document.getElementById('replay-button');
    const player1 = 'X';
    const player2 = 'O';
    let currentPlayer = player1;
    let gameEnded = false;
  
    cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
    });
  
    replayButton.addEventListener('click', replayGame);
  
    function handleCellClick(event) {
      const cell = event.target;
      const index = cells.indexOf(cell);
  
      if (cell.textContent === '' && !gameEnded) {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
  
        if (checkWin(currentPlayer)) {
          endGame(`${currentPlayer} wins!`);
        } else if (checkDraw()) {
          endGame('It\'s a draw!');
        } else {
          currentPlayer = currentPlayer === player1 ? player2 : player1;
          if (currentPlayer === player2) {
            setTimeout(makeRobotMove, 500); // Wait for 500 milliseconds before robot makes its move
          }
        }
      }
    }
  
    function checkWin(player) {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
      ];
  
      return winningCombinations.some(combination => {
        return combination.every(index => cells[index].textContent === player);
      });
    }
  
    function checkDraw() {
      return cells.every(cell => cell.textContent !== '');
    }
  
    function endGame(messageText) {
      gameEnded = true;
      message.textContent = messageText;
      message.style.fontSize = '48px';
      message.style.color = 'yellow';
      replayButton.classList.remove('hidden');
      replayButton.classList.remove('hidden');
      replayButton.style.display = 'block';
    }
  
    
    function showWinner(winner) {
      const winnerNameElement = document.getElementById('winner-name');
      winnerNameElement.innerText = winner;
      winnerNameElement.style.fontSize = '48px';
      winnerNameElement.style.color = 'yellow';
  
      
    }
    function replayGame() {
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove(player1, player2);
      });
      currentPlayer = player1;
      gameEnded = false;
      message.textContent = '';
      replayButton.classList.add('hidden');
      replayButton.style.display = 'none';
      replayButton.addEventListener('click', replayGame);
    }
    function makeRobotMove() {
      const bestMove = getBestMove();
      cells[bestMove].click();
    }
    
    function getBestMove() {
      let bestScore = -Infinity;
      let bestMove;
    
      for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '') {
          cells[i].textContent = player2;
          const score = minimax(cells, 0, false);
          cells[i].textContent = '';
    
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }
    
      return bestMove;
    }
    
    function minimax(cells, depth, isMaximizingPlayer) {
      if (checkWin(player1)) {
        return -10 + depth;
      } else if (checkWin(player2)) {
        return 10 - depth;
      } else if (checkDraw()) {
        return 0;
      }
    
      if (isMaximizingPlayer) {
        let bestScore = -Infinity;
    
        for (let i = 0; i < cells.length; i++) {
          if (cells[i].textContent === '') {
            cells[i].textContent = player2;
            const score = minimax(cells, depth + 1, false);
            cells[i].textContent = '';
    
            bestScore = Math.max(score, bestScore);
          }
        }
    
        return bestScore;
      } else {
        let bestScore = Infinity;
    
        for (let i = 0; i < cells.length; i++) {
          if (cells[i].textContent === '') {
            cells[i].textContent = player1;
            const score = minimax(cells, depth + 1, true);
            cells[i].textContent = '';
    
            bestScore = Math.min(score, bestScore);
          }
        }
    
        return bestScore;
      }
    }
    
    // Set X and O symbols in white color
    const player1Cells = document.querySelectorAll('.cell.player1');
    const player2Cells = document.querySelectorAll('.cell.player2');
  
    player1Cells.forEach(cell => {
      cell.style.color = 'white';
    });
  
    player2Cells.forEach(cell => {
      cell.style.color = 'white';
    });
  });