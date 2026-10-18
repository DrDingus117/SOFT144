//The other Repo didn't see this file and It's directory so I had to put it in a seperate directory to publish it.

class HashTable {
  constructor(size = 8, { logCollisions = true } = {}) {
    this.buckets = Array.from({ length: size }, () => []);
    this.count = 0;
    this.logCollisions = logCollisions;
  }

  // Turn a key into a bucket index (same key -> same index)
  hash(key) {
    const str = String(key);
    let total = 0;
    for (let i = 0; i < str.length; i++) {
      total = (total * 31 + str.charCodeAt(i)) >>> 0; // keep it a 32-bit unsigned int
    }
    return total % this.buckets.length;
  }

  get loadFactor() {
    return this.count / this.buckets.length;
  }

  // Insert/update without triggering resize or logs (used by set and resize)
  _insert(key, value, log = false) {
    const bucket = this.buckets[this.hash(key)];
    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value; // update existing, no duplicate
        return false;
      }
    }
    if (log && bucket.length > 0) {
      console.log(
        `Collision: "${key}" and "${bucket[0][0]}" share bucket ${this.hash(key)}`
      );
    }
    bucket.push([key, value]);
    this.count++;
    return true;
  }

  set(key, value) {
    this._insert(key, value, this.logCollisions);
    if (this.loadFactor > 0.75) this.resize();
  }

  get(key) {
    const bucket = this.buckets[this.hash(key)];
    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return null;
  }

  has(key) {
    return this.buckets[this.hash(key)].some(([k]) => k === key);
  }

  delete(key) {
    const bucket = this.buckets[this.hash(key)];
    const i = bucket.findIndex(([k]) => k === key);
    if (i === -1) return false;
    bucket.splice(i, 1);
    this.count--;
    return true;
  }

  resize() {
    const oldBuckets = this.buckets;
    const newSize = oldBuckets.length * 2;
    if (this.logCollisions) {
      console.log(`Hash table resized from ${oldBuckets.length} buckets to ${newSize} buckets.`);
    }
    this.buckets = Array.from({ length: newSize }, () => []);
    this.count = 0;
    for (const bucket of oldBuckets) {
      for (const [k, v] of bucket) this._insert(k, v);
    }
  }
}

// ---------- Part 4: Tests ----------
console.log("=== Inventory tests ===");
const inventory = new HashTable(4); // small on purpose so collisions/resizing are visible

const products = {
  "P-1001": { name: "Wireless Mouse", price: 24.99, quantity: 15 },
  "P-1002": { name: "Mechanical Keyboard", price: 69.99, quantity: 8 },
  "P-1003": { name: "USB-C Hub", price: 39.99, quantity: 20 },
  "P-1004": { name: "27in Monitor", price: 219.99, quantity: 5 },
  "P-1005": { name: "Webcam", price: 49.99, quantity: 12 },
  "P-1006": { name: "Headset", price: 59.99, quantity: 9 },
};
for (const [id, p] of Object.entries(products)) inventory.set(id, p);

console.assert(inventory.count === 6, "Products should be added");
console.assert(inventory.get("P-1001").name === "Wireless Mouse", "Find product by ID");

inventory.set("P-1001", { name: "Wireless Mouse", price: 22.99, quantity: 10 });
console.assert(inventory.get("P-1001").price === 22.99, "Product should be updated");
console.assert(inventory.count === 6, "Update must not create a duplicate");

console.assert(inventory.has("P-1002") === true, "has() true for existing ID");
console.assert(inventory.has("NOPE") === false, "has() false for missing ID");

console.assert(inventory.delete("P-1003") === true, "delete() true when removed");
console.assert(inventory.has("P-1003") === false, "Deleted product is gone");
console.assert(inventory.delete("P-1003") === false, "delete() false when not found");
console.assert(inventory.get("P-9999") === null, "get() null for missing product");

// Collision test: find two keys that land in the same bucket
const small = new HashTable(8, { logCollisions: false });
let a = "item-0", b = null;
for (let i = 1; i < 1000 && !b; i++) {
  if (small.hash(`item-${i}`) === small.hash(a)) b = `item-${i}`;
}
small.set(a, { name: "A" });
small.set(b, { name: "B" });
const idx = small.hash(a);
console.assert(small.buckets[idx].length === 2, "Two products in the same bucket");
console.log(`Collision bucket ${idx}:`, JSON.stringify(small.buckets[idx]));
console.assert(small.get(a).name === "A" && small.get(b).name === "B", "Both retrievable");

// ---------- Part 5: Resize demo ----------
console.log("\n=== Resize demo ===");
const demo = new HashTable(4);
for (let i = 1; i <= 10; i++) demo.set(`demo-${i}`, { n: i });
console.assert(demo.buckets.length > 4, "Table should have resized");
console.assert(demo.get("demo-7").n === 7, "Entries survive resize");

// ---------- Parts 6-8: Benchmarks ----------
const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);
const memSnap = (label) => {
  const m = process.memoryUsage();
  console.log(`${label}: heapUsed ${mb(m.heapUsed)} MB, rss ${mb(m.rss)} MB`);
  return m.heapUsed;
};
const ops = (n, ms) => Math.round(n / (ms / 1000));

const N = 100000;
function randomString(len = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

console.log("\n=== Benchmarks ===");
const sequentialKeys = Array.from({ length: N }, (_, i) => `product-${i + 1}`);
const randomKeys = Array.from({ length: N }, () => randomString());

const results = {};
function bench(label, keys) {
  const ht = new HashTable(8, { logCollisions: false });
  const map = new Map();
  const r = {};

  const time = (name, fn, n) => {
    console.time(name);
    const s = performance.now();
    fn();
    const e = performance.now();
    console.timeEnd(name);
    r[name] = { ms: e - s, opsPerSec: ops(n, e - s) };
    console.log(`${name} operations per second: ${r[name].opsPerSec}`);
  };

  time(`HashTable set (${label})`, () => { for (const k of keys) ht.set(k, { q: 1 }); }, N);
  time(`HashTable get (${label})`, () => { for (const k of keys) ht.get(k); }, N);

  time(`Map set (${label})`, () => { for (const k of keys) map.set(k, { q: 1 }); }, N);
  time(`Map get (${label})`, () => { for (const k of keys) map.get(k); }, N);

  results[label] = r;
}

bench("sequential", sequentialKeys);
bench("random", randomKeys);

// ---------- Part 8: Memory (measured separately and fairly) ----------
console.log("\n=== Memory usage (sequential keys) ===");
// Enable garbage collection from inside the script so plain `node app.js` works
require("v8").setFlagsFromString("--expose-gc");
const forceGC = require("vm").runInNewContext("gc");
const gc = () => { forceGC(); forceGC(); };
gc();
const memStart = memSnap("Memory before test data");
let tmpHT = new HashTable(8, { logCollisions: false });
for (const k of sequentialKeys) tmpHT.set(k, { q: 1 });
gc();
const memHT = memSnap("Memory after filling HashTable");
tmpHT = null; gc();
const memBase = memSnap("Memory after releasing HashTable");
let tmpMap = new Map();
for (const k of sequentialKeys) tmpMap.set(k, { q: 1 });
gc();
const memMap = memSnap("Memory after filling Map");
console.log(`(Map holds ${tmpMap.size} entries, HashTable held ${sequentialKeys.length})`); // keeps tmpMap alive until measured
const seqMem = { memHT, memMap: memMap, base: memBase };

// ---------- Part 9: Summary ----------
const s = results.sequential;
const hSet = s["HashTable set (sequential)"], mSet = s["Map set (sequential)"];
const hGet = s["HashTable get (sequential)"], mGet = s["Map get (sequential)"];
const faster = (hSet.ms + hGet.ms) < (mSet.ms + mGet.ms) ? "My HashTable" : "JavaScript's Map";

console.log(`
=== Final Summary ===
How the store finds products: each product ID is hashed to a bucket index, so lookup
goes straight to one small bucket instead of scanning every product.
Hash function: turns a key into a number, then into a valid bucket index; the same key
always gives the same index.
Bucket: an array slot that holds one or more [key, value] pairs.
Collision: two different keys map to the same bucket. Separate chaining stores both in
that bucket, and the bucket is searched for the exact key.
Resizing: when load factor > 0.75 the bucket count doubles and entries are reinserted,
keeping buckets short so lookups stay fast.
Faster in my benchmark: ${faster} (sequential keys, ${N} operations).
Memory: hash tables keep many extra (often empty) buckets and per-entry arrays; trading
that memory for fewer comparisons is what makes lookups fast.

Measured (sequential keys):
  HashTable set: ${hSet.ms.toFixed(1)} ms, ${hSet.opsPerSec} ops/sec
  HashTable get: ${hGet.ms.toFixed(1)} ms, ${hGet.opsPerSec} ops/sec
  Map set:       ${mSet.ms.toFixed(1)} ms, ${mSet.opsPerSec} ops/sec
  Map get:       ${mGet.ms.toFixed(1)} ms, ${mGet.opsPerSec} ops/sec
  Heap before: ${mb(memStart)} MB | HashTable added ~${mb(seqMem.memHT - memStart)} MB | Map added ~${mb(seqMem.memMap - seqMem.base)} MB
Measured (random keys):
  HashTable set: ${results.random["HashTable set (random)"].ms.toFixed(1)} ms, get: ${results.random["HashTable get (random)"].ms.toFixed(1)} ms
  Map set: ${results.random["Map set (random)"].ms.toFixed(1)} ms, get: ${results.random["Map get (random)"].ms.toFixed(1)} ms
`);
