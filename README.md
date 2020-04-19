ReThreaded
==========
Tablet weaving app prototype for my own use. User interface is heavily inspired by the awesome
[Twisted Threads](https://twistedthreads.org) by [Shelagh Lewins](https://github.com/Shelagh-Lewins),
which, however, has very little keyboard support and is a tad slow when designing patterns.

**This is very much a work in progress!** Currently, the only way to run this application is to clone
the repository and start the development version:

```shell script
$ yarn install
$ yarn start
```

The application will run on port 8080.

Features
--------
* Both mouse and keyboard support for thread colors, threading and weaving tables.
* Undo/redo stack.
* Import and export from `*.twt` (Twisted Threads format) -- only supports *individual* patterns.
* Current pattern persisted in local storage.

Only supports individual patterns where each row consists of tablets turning forwards or backwards.
No support for Anglo-Saxon patterns (zero turns), missed slot patterns, etc.

Interesting Observations
------------------------
Indexing tablets and rows wrt their number (index) seems natural, but leads to "using index as key" problems.
When the pattern is bigger, adding tablets or rows to the start is way slower than to the end (which is still kind of slow).
It might be advantageous to create non-sequential indices for tablet and row.

