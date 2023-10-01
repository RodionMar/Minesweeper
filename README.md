1. Task: https://github.com/rolling-scopes-school/tasks/blob/master/tasks/minesweeper/README.md
2. Screenshot:
![rolling-scopes-school github io_rodionmar-JSFE2023Q1_minesweeper_](https://github.com/rolling-scopes-school/rodionmar-JSFE2023Q1/assets/96232672/de958b53-fe3a-4304-95ae-f1f6598ea60b)
3. Deploy: https://rodionmar.github.io/Minesweeper/
4. Done 22.05.2023 / deadline 22.05.2023
5. Score: 170 / 180
 ### Basic scope +40

- [x] layout, design, responsive UI: `+10`
- [x] at the beginning state of the game, the frame has size 10x10 and is filled with unopened cells. Should be 10 mines on field by default: `+10`
- [x] when user click on cells - it should be opened and marked as one of the following state: empty cell, cell with number, or cell with mine: `+10`
- [x] the game should end when the player reveals all cells that do not contain mines (win) or clicks on mine (lose) and related message is displayed at the end of the game: `+10`

### Advanced scope +80

- [x] mines are placed after the first move, so that user cannot lose on the first move. `+20`
- [x] user can mark “mined” cells using flags so as not to accidentally open them displaying the number of mines remaining and displaying number of used flags: `+10`
- [x] the game should use color coding (using numbers and colors) to indicate the number of mines surrounding a revealed cell: `+10`
- [x] the game can be restarted without reloading the page: `+10`
- [x] game duration and number of clicks are displayed: `+15`
- [x] when user opens a square that does not touch any mines, it will be empty and the adjacent squares will automatically open in all directions until reaching squares that contain numbers: `+15`

### Hacker scope +60

- [x] sound accompaniment (on/off) when clicking on cell and at the end of the game: `+10`
- [x] implement ability to change the size (easy - 10x10, medium - 15x15, hard - 25x25) and number of mines for each size of the field (from 10 to 99): `+20`
- [x] implemented saving the latest 10 results using LocalStorage: `+10`
- [ ] implemented saving the state of the game: `+10`
- [x] option to choose different themes for the game board (dark/light themes): `+10`
