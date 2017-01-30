# github-label-fixer

An opinionated command line utility to replace the default GitHub issue labels with ones I find more useful

* `develop` [![Build Status](https://travis-ci.org/davesag/github-label-fixer.svg?branch=develop)](https://travis-ci.org/davesag/github-label-fixer)
* `master` [![Build Status](https://travis-ci.org/davesag/github-label-fixer.svg?branch=master)](https://travis-ci.org/davesag/github-label-fixer)

## What does it do?

```
npm install -g github-label-fixer
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
  {name: "tech debt",        color: "5319e7"},
  {name: "work in progress", color: "fbca04"}
```

## Why?

I find the labels above more useful and I was sick of making the same changes by hand each time.

## Requirements

It's built for Node 6.9 or better. `nvm install 6.9.4` to ensure you are running the latest supported version of node.

## Development

To run this in development mode

```sh
npm run dev
```

## Tests

To run the unit tests

```sh
npm test
```

## Conbtributing

I am a fan of using the `forked git-flow` process to manage contributions.

Please see the [contributing notes](CONTRIBUTING.md) for details.

## Development Status

It is working and core github access functions are unit tested.

### Version history

* `1.0.0` — current version.
* `0.0.9` — worked but without any unit tests
