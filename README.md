# github-labeller

A command line utility to replace the default GitHub issue labels with ones I find more useful

* `develop` [![Build Status](https://travis-ci.org/davesag/github-labeller.svg?branch=develop)](https://travis-ci.org/davesag/github-labeller)
* `master` [![Build Status](https://travis-ci.org/davesag/github-labeller.svg?branch=master)](https://travis-ci.org/davesag/github-labeller)

## What does it do?

```
npm install -g github-labeller
```

then run `labeller`, supply your [GitHub personal token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/), ensuring that token gives the right to edit project labels, then supply your project owner name and the repository name, and it will blow away all the old issue labels and replace them with these:

```
  {name: "bug",              color: "ee0701"},
  {name: "documentation",    color: "1d76db"},
  {name: "feature",          color: "0052cc"},
  {name: "help wanted",      color: "b60205"},
  {name: "please close",     color: "076616"},
  {name: "question",         color: "cc317c"},
  {name: "ready to merge",   color: "0e8a10"},
  {name: "work in progress", color: "fbca04"},
```

## Why?

I find the labels above more useful and I was sick of making the same changes by hand each time.

## Requirements

It's built for Node 6.9 or better. `nvm install 6.9.4` to ensure you are running the latest supported version of node.

## Conbtributing

I am a fan of using the `forked git-flow` process to manage contributions.

Please see the [contributing notes](CONTRIBUTING.md) for details.

## Development Status

It works but could do with some polish.

