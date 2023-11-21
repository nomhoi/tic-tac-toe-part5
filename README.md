Merge code from article to ya-serverless-containers...

===
# Tic Tac Toe, part 5
Tic Tac Toe game, powered by [Svelte](https://github.com/sveltejs/svelte) and [C++ Boost.Beast](https://www.boost.org/doc/libs/1_70_0/libs/beast/doc/html/index.html). Build for [this tutorial](https://habr.com/ru/post/460991/).

## Get started

Clone the project:
```bash
git clone https://github.com/nomhoi/tic-tac-toe-part5.git
```
Run containers:
```bash
cd tic-tac-toe-part5
docker-compose up -d
```
Build the frontend:
```bash
cd front
npm install
npm run-script build
```
Navigate to http://localhost.
