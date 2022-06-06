![workflow](https://github.com/DanilByaliy/TaskTracker/actions/workflows/node.js.yml/badge.svg)

# LAB 4 - TaskTracker

## Information
This is a console programme that allows user to track their tasks and operate with them (add, remove, edit tasks).
It helps to organise your time and priorities and to track all your tasks in one application.


## Installation

1. Install Node JS

2. Clone the repository to you local machine
```bash
git clone https://github.com/DanilByaliy/TaskTracker.git
```

3. Install all packages
```bash
npm install
```

4. Stat with adding a new task, which will appear in taskfile.json
```bash
  node index.js add --title "Title" --desc "Description" --deadline "2022-06-06"
```

5. Then you can see them in your application
```bash
node index.js showall
```

## Usage

For all usage info and examples, run index.js with -h option

```bash
node index.js -h
```
