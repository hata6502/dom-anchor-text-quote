import leven from "leven";
import * as textPosition from "dom-anchor-text-position";

const CONTEXT_LENGTH = 32;

export function fromRange(root, range) {
  if (root === undefined) {
    throw new Error('missing required parameter "root"');
  }
  if (range === undefined) {
    throw new Error('missing required parameter "range"');
  }

  let position = textPosition.fromRange(root, range);
  return fromTextPosition(root, position);
}

export function fromTextPosition(root, selector) {
  if (root === undefined) {
    throw new Error('missing required parameter "root"');
  }
  if (selector === undefined) {
    throw new Error('missing required parameter "selector"');
  }

  let { start } = selector;
  if (start === undefined) {
    throw new Error('selector missing required property "start"');
  }
  if (start < 0) {
    throw new Error('property "start" must be a non-negative integer');
  }

  let { end } = selector;
  if (end === undefined) {
    throw new Error('selector missing required property "end"');
  }
  if (end < 0) {
    throw new Error('property "end" must be a non-negative integer');
  }

  let exact = root.textContent.substr(start, end - start);

  let prefixStart = Math.max(0, start - CONTEXT_LENGTH);
  let prefix = root.textContent.substr(prefixStart, start - prefixStart);

  let suffixEnd = Math.min(root.textContent.length, end + CONTEXT_LENGTH);
  let suffix = root.textContent.substr(end, suffixEnd - end);

  return { exact, prefix, suffix };
}

export function toRange(root, selector, options = {}) {
  let position = toTextPosition(root, selector, options);
  if (position === null) {
    return null;
  } else {
    return textPosition.toRange(root, position);
  }
}

export function toTextPosition(root, selector) {
  if (root === undefined) {
    throw new Error('missing required parameter "root"');
  }
  if (selector === undefined) {
    throw new Error('missing required parameter "selector"');
  }

  const { prefix, exact, suffix } = selector;
  if (exact === undefined) {
    throw new Error('selector missing required property "exact"');
  }

  const exactMatchIndexes = [];
  let exactMatchIndex = -1;
  while (
    (exactMatchIndex = root.textContent.indexOf(exact, exactMatchIndex + 1)) !==
    -1
  ) {
    exactMatchIndexes.push(exactMatchIndex);
  }

  const matches = exactMatchIndexes.map((exactMatchIndex) => {
    let distance = 0;

    if (prefix !== undefined) {
      distance += leven(
        root.textContent.slice(
          Math.max(exactMatchIndex - CONTEXT_LENGTH, 0),
          exactMatchIndex
        ),
        prefix
      );
    }

    if (suffix !== undefined) {
      const exactMatchEndIndex = exactMatchIndex + exact.length;
      distance += leven(
        root.textContent.slice(
          exactMatchEndIndex,
          exactMatchEndIndex + CONTEXT_LENGTH
        ),
        suffix
      );
    }

    return { index: exactMatchIndex, distance };
  });

  let nearestMatchIndex = null;
  let nearestMatchDistance = Infinity;
  for (const { index, distance } of matches) {
    if (distance < nearestMatchDistance) {
      nearestMatchIndex = index;
      nearestMatchDistance = distance;
    }
  }

  return (
    nearestMatchIndex && {
      start: nearestMatchIndex,
      end: nearestMatchIndex + exact.length,
    }
  );
}
