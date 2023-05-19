# Text Quote Anchor

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
[![NPM Package](https://img.shields.io/npm/v/dom-anchor-text-quote.svg)](https://www.npmjs.com/package/dom-anchor-text-quote)
[![Build Status](https://travis-ci.org/tilgovi/dom-anchor-text-quote.svg?branch=master)](https://travis-ci.org/tilgovi/dom-anchor-text-quote)
[![Coverage Status](https://img.shields.io/codecov/c/github/tilgovi/dom-anchor-text-quote/master.svg)](https://codecov.io/gh/tilgovi/dom-anchor-text-quote)

Find and describe ranges of a document using text quotes.

This library is capable of searching for text content within a DOM node,
utilizing optional context strings and/or offset hint to disambiguate matches.

Functions are provided for finding a quote within a DOM node and returning
either the text offsets of the best match or a DOM `Range` instance, as well
as functions to perform the inverse operations of describing a `Range` or a
sub-string identified by text offsets in terms of the selected text and its
surrounding context.

Relevant specifications:

- [Range](https://dom.spec.whatwg.org/#ranges)
- [Web Annotation TextPositionSelector](http://www.w3.org/TR/annotation-model/#text-position-selector)
- [Web Annotation TextQuoteSelector](http://www.w3.org/TR/annotation-model/#text-quote-selector)

# Installation

To `require('dom-anchor-text-quote')`:

    npm install dom-anchor-text-quote
