# github-labeller

A command line utility to replace the default GitHub issue labels with ones I find more useful

* `develop` [![Build Status](https://travis-ci.org/davesag/github-labeller.svg?branch=develop)](https://travis-ci.org/davesag/github-labeller)
* `master` [![Build Status](https://travis-ci.org/davesag/github-labeller.svg?branch=master)](https://travis-ci.org/davesag/github-labeller)

## What does it do?

```
npm install -g github-labeller
```

then run `github-labeller` in your newly cloned GitHub repo, supply your GitHub personal token, project owner name and repository name, and it will blow away all the old issue labels and replace them with these!

```
  {name: "bug",              color: "ee0701"},
  {name: "documentation",    color: "1d76db"},
  {name: "feature",          color: "0052cc"},
  {name: "help wanted",      color: "b60205"},
  {name: "please close",     color: "076616"},
  {name: "question",         color: "cc317c"},
  {name: "ready to merge",   color: "0e8a10"},
  {name: "work in progress", color: "fbca04"},
  {name: "bug",              color: "ee0701"},
  {name: "documentation",    color: "1d76db"},
  {name: "feature",          color: "0052cc"}
```

## Why?

I find the labels above more useful and I was sick of making the same changes by hand each time.

## Conbtributing

I am a fan of using the `forked git-flow` process to manage contributions.

Please see the [contributing notes](CONTRIBUTING.md) for details.

## Development Status

In development, not fully functional.
