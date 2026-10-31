// Part 2: Node class
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;   // Points to the left child (smaller values)
    this.right = null;  // Points to the right child (larger values)
  }
}

// Part 3: Binary Search Tree class
class BinarySearchTree {
  constructor() {
    this.root = null; // The tree starts empty
  }

  // Add a product ID to the correct spot in the tree (loop, not recursion,
  // so very tall trees will not cause a call stack error)
  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (value === current.value) return undefined; // no duplicates

      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  // Return true if the product ID exists, otherwise false
  contains(value) {
    let current = this.root;
    while (current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return true;
      }
    }
    return false;
  }

  // Part 9: search that also counts how many nodes were checked
  search(value) {
    let current = this.root;
    let steps = 0;
    while (current) {
      steps++; // one more node checked
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return { found: true, steps };
      }
    }
    return { found: false, steps };
  }

  // Remove a product ID from the tree
  remove(value) {
    this.root = this._removeNode(this.root, value);
    return this;
  }

  _removeNode(node, value) {
    if (node === null) return null; // value not found

    if (value < node.value) {
      node.left = this._removeNode(node.left, value);
      return node;
    }
    if (value > node.value) {
      node.right = this._removeNode(node.right, value);
      return node;
    }

    // Found the node to remove
    // Case 1: leaf node (no children)
    if (node.left === null && node.right === null) return null;

    // Case 2: one child, so replace the node with that child
    if (node.left === null) return node.right;
    if (node.right === null) return node.left;

    // Case 3: two children
    // Find the smallest value in the right subtree (the in-order successor),
    // copy it into this node, then remove it from the right subtree.
    let successor = node.right;
    while (successor.left !== null) {
      successor = successor.left;
    }
    node.value = successor.value;
    node.right = this._removeNode(node.right, successor.value);
    return node;
  }

  // Left, current, right (smallest to largest)
  inOrderTraversal() {
    const result = [];
    const visit = (node) => {
      if (node === null) return;
      visit(node.left);
      result.push(node.value);
      visit(node.right);
    };
    visit(this.root);
    return result;
  }

  // Current, left, right
  preOrderTraversal() {
    const result = [];
    const visit = (node) => {
      if (node === null) return;
      result.push(node.value);
      visit(node.left);
      visit(node.right);
    };
    visit(this.root);
    return result;
  }

  // Left, right, current
  postOrderTraversal() {
    const result = [];
    const visit = (node) => {
      if (node === null) return;
      visit(node.left);
      visit(node.right);
      result.push(node.value);
    };
    visit(this.root);
    return result;
  }

  // Height = number of levels in the tree (empty tree = 0).
  // Uses a loop (level by level) so a 5000-level tree cannot overflow the call stack.
  height() {
    if (this.root === null) return 0;
    let level = [this.root];
    let levels = 0;
    while (level.length > 0) {
      levels++;
      const next = [];
      for (const node of level) {
        if (node.left) next.push(node.left);
        if (node.right) next.push(node.right);
      }
      level = next;
    }
    return levels;
  }
}

// Part 4: Add warehouse product IDs
const productTree = new BinarySearchTree();
[50, 30, 70, 20, 40, 60, 80].forEach((id) => productTree.insert(id));

console.log("In-order:", productTree.inOrderTraversal().join(", "));
console.assert(
  productTree.inOrderTraversal().join(",") === "20,30,40,50,60,70,80",
  "In-order traversal should be sorted"
);

// Part 5: Test searching
console.assert(productTree.contains(50) === true, "Product 50 should be in the tree"); // near the root
console.assert(productTree.contains(20) === true, "Product 20 should be in the tree"); // near the bottom
console.assert(productTree.contains(99) === false, "Product 99 should not be in the tree"); // missing
console.log("Search tests finished");

// Part 7: Display the tree traversals
console.log("In-order:", productTree.inOrderTraversal());
console.log("Pre-order:", productTree.preOrderTraversal());
console.log("Post-order:", productTree.postOrderTraversal());
console.log("Height:", productTree.height());

// Part 6: Test removing products
// Leaf node (no children)
productTree.remove(20);
console.assert(productTree.contains(20) === false, "Product 20 should be removed");
console.log("After removing 20 (leaf):", productTree.inOrderTraversal().join(", "));

// Node with one child (30 now only has the right child 40)
productTree.remove(30);
console.assert(productTree.contains(30) === false, "Product 30 should be removed");
console.log("After removing 30 (one child):", productTree.inOrderTraversal().join(", "));

// Node with two children (70 has 60 and 80)
productTree.remove(70);
console.assert(productTree.contains(70) === false, "Product 70 should be removed");
console.log("After removing 70 (two children):", productTree.inOrderTraversal().join(", "));

// ---------- Part 8: Compare insertion order ----------
// Part 8: Compare insertion order
const sortedTree = new BinarySearchTree();
[10, 20, 30, 40, 50, 60, 70, 80, 90].forEach((id) => sortedTree.insert(id));

const mixedTree = new BinarySearchTree();
[50, 30, 70, 20, 40, 60, 80, 10, 90].forEach((id) => mixedTree.insert(id));

console.log("Sorted tree height:", sortedTree.height());
console.log("Mixed tree height:", mixedTree.height());

// ---------- Part 9: Compare search steps ----------
// Part 9: Compare search steps
function compareSteps(id) {
  const sortedResult = sortedTree.search(id);
  const mixedResult = mixedTree.search(id);
  console.log(`Searching for product ID: ${id}`);
  console.log(`  Nodes checked in sorted tree: ${sortedResult.steps}`);
  console.log(`  Nodes checked in mixed tree: ${mixedResult.steps}`);
  if (sortedResult.steps < mixedResult.steps) {
    console.log("  Fewer steps: sorted tree");
  } else if (mixedResult.steps < sortedResult.steps) {
    console.log("  Fewer steps: mixed tree");
  } else {
    console.log("  Fewer steps: tie (same number of steps)");
  }
  return { sortedSteps: sortedResult.steps, mixedSteps: mixedResult.steps };
}
const steps90 = compareSteps(90);
const steps100 = compareSteps(100); // does not exist

// ---------- Part 10: Larger performance test ----------
// Part 10: Larger performance test
const COUNT = 5000;
const ids = [];
for (let i = 1; i <= COUNT; i++) ids.push(i);

// Random order (Fisher-Yates shuffle)
const shuffled = [...ids];
for (let i = shuffled.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}

const bigSortedTree = new BinarySearchTree();
ids.forEach((id) => bigSortedTree.insert(id));

const bigRandomTree = new BinarySearchTree();
shuffled.forEach((id) => bigRandomTree.insert(id));

const bigSortedHeight = bigSortedTree.height();
const bigRandomHeight = bigRandomTree.height();
console.log(`Sorted tree height (${COUNT} values):`, bigSortedHeight);
console.log(`Random tree height (${COUNT} values):`, bigRandomHeight);

// Search for the largest ID. It is at the very bottom of the sorted tree.
const target = COUNT;
const bigSortedSteps = bigSortedTree.search(target).steps;
const bigRandomSteps = bigRandomTree.search(target).steps;
console.log(`Steps to find ${target} in sorted tree:`, bigSortedSteps);
console.log(`Steps to find ${target} in random tree:`, bigRandomSteps);

// One search is too fast to measure, so each timer repeats the search 1000 times.
const REPEATS = 1000;

console.time("Sorted Tree Search");
for (let i = 0; i < REPEATS; i++) bigSortedTree.contains(target);
console.timeEnd("Sorted Tree Search");

console.time("Random Tree Search");
for (let i = 0; i < REPEATS; i++) bigRandomTree.contains(target);
console.timeEnd("Random Tree Search");

// ---------- Part 11: Explain the results ----------
// Part 11: Explain the results
console.log(
  `Which tree was taller? The sorted tree (height ${bigSortedHeight}) was much taller than the random tree (height ${bigRandomHeight}).`
);
console.log(
  `Which tree required more search steps? The sorted tree needed ${bigSortedSteps} steps and the random tree needed ${bigRandomSteps}.`
);
console.log(
  "Which tree was faster? The random tree was faster. See the Sorted Tree Search and Random Tree Search times above."
);
console.log(
  "Why did sorted insertion create a different shape? Every new value was larger than the one before it, so it always went to the right. The tree became one long chain, like a linked list."
);
console.log(
  "Why can a shorter tree search faster? Each step moves down one level and rules out a whole side of the tree. A shorter tree has fewer levels, so fewer nodes need to be checked."
);

// ---------- Part 12: Time complexity ----------
// Part 12: Time complexity
console.log("Balanced BST: insert(), contains(), and remove() are usually O(log n).");
console.log("Highly unbalanced BST: insert(), contains(), and remove() can become O(n).");
console.log("Each traversal is O(n) because it visits every node.");

// ---------- Part 13: Final summary ----------
// Part 13: Final summary
console.log(
  "Warehouse use: The warehouse stores product IDs in a BST so employees can quickly find, add, or remove a product."
);
console.log(
  "Organization: Smaller values go to the left of a node and larger values go to the right."
);
const summaryTree = new BinarySearchTree();
[50, 30, 70, 20, 40, 60, 80].forEach((id) => summaryTree.insert(id));
console.log("In-order:", summaryTree.inOrderTraversal());
console.log("Pre-order:", summaryTree.preOrderTraversal());
console.log("Post-order:", summaryTree.postOrderTraversal());
console.log("Sorted tree height (9 values):", sortedTree.height());
console.log("Mixed tree height (9 values):", mixedTree.height());
console.log(
  `Search steps for 90 (sorted vs mixed): ${steps90.sortedSteps} vs ${steps90.mixedSteps}`
);
console.log(
  `Search steps for 100 (sorted vs mixed): ${steps100.sortedSteps} vs ${steps100.mixedSteps}`
);
console.log(
  `Large tree heights (sorted vs random): ${bigSortedHeight} vs ${bigRandomHeight}`
);
console.log(
  `Large tree search steps (sorted vs random): ${bigSortedSteps} vs ${bigRandomSteps}`
);
console.log("Measured search times: see the Sorted Tree Search and Random Tree Search timers above.");
console.log(
  "Why insertion order matters: sorted input builds a tall, lopsided tree where searches check many nodes (O(n)). Mixed or random input builds a shorter tree where searches check far fewer nodes (about O(log n))."
);