import pool from './db.js';
import { setupDatabase } from './db.js';

// Quiz data from the frontend
const quizData = [
  {
    title: "Software Engineering Fundamentals",
    description: "Test your knowledge across core disciplines including OOP, Networking, Web Development, and more!",
    topic: "General",
    questions: [
      {
        question: "Which concept allows an object to take on many forms?",
        options: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"],
        correct_answer: "Polymorphism",
        topic: "OOP",
        explanation: "Polymorphism allows objects of different classes to be treated as objects of a common superclass. It enables methods to do different things based on the object that is acting upon them."
      },
      {
        question: "What is the primary function of a DNS server?",
        options: [
          "Assigning IP addresses",
          "Translating domain names to IP addresses",
          "Routing packets",
          "Encrypting data",
        ],
        correct_answer: "Translating domain names to IP addresses",
        topic: "Networking",
        explanation: "DNS (Domain Name System) servers act like a phonebook for the internet, translating human-readable domain names (like google.com) into machine-readable IP addresses (like 172.217.164.110)."
      },
      {
        question: "Which of these is NOT a principle of RESTful API design?",
        options: [
          "Statelessness",
          "Client-Server separation",
          "Code-On-Demand",
          "Layered System",
        ],
        correct_answer: "Code-On-Demand",
        topic: "Web Development",
        explanation: "While Code-On-Demand is mentioned in Roy Fielding's dissertation, it's rarely implemented in practice and not considered a core REST principle. Statelessness, Client-Server, and Layered System are fundamental REST constraints."
      },
    ],
  },
  {
    title: "Advanced JavaScript Logic & Operators",
    description: "Very hard JavaScript questions focusing on !, !!, &&, truthy/falsy values, and ternary operator behavior.",
    topic: "JavaScript",
    questions: [
      {
        question: "What is the output of: console.log(!'false' && !!0 ? 'A' : 'B');",
        options: ["A", "B", "true", "false"],
        correct_answer: "B",
        topic: "JavaScript",
        explanation: "'false' is a truthy string, so !'false' is false. !!0 converts 0 to boolean false. false && false is false, so the ternary returns 'B'."
      },
      {
        question: "What does this evaluate to: console.log(!![] && !'');",
        options: ["true", "false", "''", "undefined"],
        correct_answer: "true",
        topic: "JavaScript",
        explanation: "[] is truthy, so !![] is true. '' is falsy, so !'' is true. true && true evaluates to true."
      },
      {
        question: "What is the output of: console.log(false && 'Hello' ? 1 : 2);",
        options: ["1", "2", "'Hello'", "false"],
        correct_answer: "2",
        topic: "JavaScript",
        explanation: "The && operator short-circuits at false. Since the first operand is false, the entire expression is false, so the ternary returns 2."
      },
      {
        question: "What will be logged: console.log(!'0' ? true : false);",
        options: ["true", "false", "'0'", "undefined"],
        correct_answer: "false",
        topic: "JavaScript",
        explanation: "'0' is a non-empty string, so it's truthy. !'0' is false, so the ternary returns false."
      },
      {
        question: "What is the output: console.log(!!null && !'undefined');",
        options: ["true", "false", "'undefined'", "TypeError"],
        correct_answer: "false",
        topic: "JavaScript",
        explanation: "null is falsy, so !!null is false. false && anything is false due to short-circuiting."
      },
      {
        question: "Evaluate: console.log(![] ? 'X' : !!{});",
        options: ["'X'", "true", "false", "undefined"],
        correct_answer: "true",
        topic: "JavaScript",
        explanation: "[] is truthy, so ![] is false. The ternary takes the false branch: !!{}. {} is truthy, so !!{} is true."
      },
      {
        question: "What does this print: console.log('' && !0 ? 1 : 2);",
        options: ["1", "2", "''", "false"],
        correct_answer: "2",
        topic: "JavaScript",
        explanation: "'' is falsy, so the && short-circuits and returns ''. Falsy value makes the ternary return 2."
      },
      {
        question: "Result of: console.log(!!' ' && !'null' ? 'A' : 'B');",
        options: ["A", "B", "true", "false"],
        correct_answer: "B",
        topic: "JavaScript",
        explanation: "' ' (space) is truthy, so !!' ' is true. 'null' is a truthy string, so !'null' is false. true && false is false, so ternary returns 'B'."
      },
      {
        question: "Output of: console.log(!(!!0 && !''));",
        options: ["true", "false", "''", "undefined"],
        correct_answer: "true",
        topic: "JavaScript",
        explanation: "!!0 is false, !'' is true. false && true is false. !false is true."
      },
      {
        question: "What is printed: console.log(true && false ? !1 : !!'0');",
        options: ["true", "false", "1", "0"],
        correct_answer: "true",
        topic: "JavaScript",
        explanation: "true && false is false, so ternary takes false branch: !!'0'. '0' is truthy, so !!'0' is true."
      },
      {
        question: "What does this evaluate to: console.log(!undefined && (!!null ? 1 : 2));",
        options: ["1", "2", "false", "true"],
        correct_answer: "2",
        topic: "JavaScript",
        explanation: "!undefined is true. !!null is false, so inner ternary returns 2. true && 2 returns 2 (&& returns the last truthy value or first falsy)."
      },
      {
        question: "What is the result of: console.log('0' && !0 && !!'');",
        options: ["true", "false", "''", "0"],
        correct_answer: "false",
        topic: "JavaScript",
        explanation: "'0' is truthy, !0 is false. The && chain short-circuits at false and returns false."
      },
      {
        question: "Evaluate: console.log(!NaN ? (!!1 ? 'X' : 'Y') : 'Z');",
        options: ["X", "Y", "Z", "false"],
        correct_answer: "X",
        topic: "JavaScript",
        explanation: "!NaN is true (since NaN is falsy). !!1 is true, so inner ternary returns 'X'."
      },
      {
        question: "What does this log: console.log((false && true) || (!'' && 0 ? 5 : 10));",
        options: ["0", "5", "10", "false"],
        correct_answer: "10",
        topic: "JavaScript",
        explanation: "false && true is false. !'' is true, true && 0 is 0 (falsy), so ternary returns 10. false || 10 returns 10."
      },
      {
        question: "What is the output: console.log(!({} && []) ? 1 : 0);",
        options: ["1", "0", "true", "false"],
        correct_answer: "0",
        topic: "JavaScript",
        explanation: "{} and [] are both truthy, so {} && [] returns []. ![] is false, so ternary returns 0."
      },
    ],
  },
  {
    title: "Expert-Level JavaScript Mechanics",
    description: "A brutal 20-question quiz covering type coercion, arrays/objects, hoisting, closures, memory behavior, promises, and event loop execution.",
    topic: "JavaScript",
    questions: [
      {
        question: "What is the result of: console.log([] == ![]);",
        options: ["true", "false", "TypeError", "undefined"],
        correct_answer: "true",
        topic: "JavaScript",
        explanation: "![] converts to false. [] == false becomes '' == 0 which becomes 0 == 0, which is true due to type coercion rules."
      },
      {
        question: "What is logged: console.log({} + []);",
        options: ["0", "'[object Object]'", "'[object Object]'", "NaN"],
        correct_answer: "[object Object]",
        topic: "JavaScript",
        explanation: "{} is interpreted as an empty block, so +[] converts [] to string which is ''."
      },
      {
        question: "What does this output: console.log([] + {});",
        options: ["'[object Object]'", "0", "{}", "NaN"],
        correct_answer: "[object Object]",
        topic: "JavaScript",
        explanation: "[] converts to '', {} converts to '[object Object]', so '' + '[object Object]' = '[object Object]'."
      },
      {
        question: "What is the result of: console.log(!!{} && [] == false);",
        options: ["true", "false", "undefined", "[]"],
        correct_answer: "true",
        topic: "JavaScript",
        explanation: "!!{} is true. [] == false becomes '' == 0 becomes 0 == 0 which is true. true && true = true."
      },
      {
        question: "What is the value of x? var x = typeof null;",
        options: ["'null'", "'object'", "'undefined'", "'number'"],
        correct_answer: "'object'",
        topic: "JavaScript",
        explanation: "This is a historical JavaScript bug/feature. In JavaScript, null is considered an object for legacy compatibility reasons."
      },
      {
        question: "What is printed: console.log([1, 2, 3] == [1, 2, 3]);",
        options: ["true", "false", "undefined", "TypeError"],
        correct_answer: "false",
        topic: "JavaScript",
        explanation: "Arrays are objects in JavaScript, and objects are compared by reference, not by value. These are two different array instances."
      },
      {
        question: "What happens here: console.log({} == {});",
        options: ["true", "false", "undefined", "Throws error"],
        correct_answer: "false",
        topic: "JavaScript",
        explanation: "Objects are compared by reference. Two different object literals create two distinct objects with different references."
      },
      {
        question: "What does this print: var a = 1; function b(){ a = 10; return; function a(){} } b(); console.log(a);",
        options: ["1", "10", "undefined", "Error"],
        correct_answer: "1",
        topic: "JavaScript",
        explanation: "Function hoisting creates a local variable 'a' in function b's scope. The assignment a=10 modifies the local a, not the global one."
      },
      {
        question: "What is the output: console.log((function(){ return typeof x; })());",
        options: ["'undefined'", "'object'", "'function'", "ReferenceError"],
        correct_answer: "'undefined'",
        topic: "JavaScript",
        explanation: "Due to hoisting, x is declared but not initialized when typeof is called. typeof returns 'undefined' for undeclared variables."
      },
      {
        question: "What does this log: console.log((function(){ var a = 5; return function(){ return a++; }; })()());",
        options: ["5", "6", "undefined", "Error"],
        correct_answer: "5",
        topic: "JavaScript",
        explanation: "The inner function forms a closure over 'a'. a++ returns the current value (5) then increments a to 6."
      },
      {
        question: "What is printed: let x = {}; let y = x; x = null; console.log(y);",
        options: ["null", "{}", "undefined", "ReferenceError"],
        correct_answer: "{}",
        topic: "JavaScript",
        explanation: "Objects are assigned by reference. y still references the original object even after x is set to null."
      },
      {
        question: "What is the output: console.log(Promise.resolve(5).then(console.log).then(() => 10));",
        options: ["5 then 10", "5", "10", "undefined"],
        correct_answer: "Promise { <pending> }",
        topic: "JavaScript",
        explanation: "The console.log will output 5, but the overall expression returns a Promise. Promises are always asynchronous."
      },
      {
        question: "What prints first: setTimeout(()=>console.log('A'),0); Promise.resolve().then(()=>console.log('B')); console.log('C');",
        options: ["A B C", "C B A", "B A C", "C A B"],
        correct_answer: "C B A",
        topic: "JavaScript",
        explanation: "Sync code (C) runs first, then microtasks (Promise B), then macrotasks (setTimeout A)."
      },
      {
        question: "What is result: console.log(0 == '');",
        options: ["true", "false", "undefined", "TypeError"],
        correct_answer: "true",
        topic: "JavaScript",
        explanation: "Due to type coercion, '' converts to 0, so 0 == 0 is true."
      },
      {
        question: "What is the output: console.log([1] + [2,3]);",
        options: ["'1,2,3'", "'12,3'", "3", "Error"],
        correct_answer: "1,2,3",
        topic: "JavaScript",
        explanation: "Arrays convert to strings: [1] becomes '1', [2,3] becomes '2,3'. '1' + '2,3' = '1,2,3'."
      },
      {
        question: "What is printed: console.log(+[]);",
        options: ["0", "[]", "NaN", "undefined"],
        correct_answer: "0",
        topic: "JavaScript",
        explanation: "The unary + operator converts [] to string '' then to number 0."
      },
      {
        question: "What does this output: console.log([] == 0);",
        options: ["true", "false", "undefined", "TypeError"],
        correct_answer: "true",
        topic: "JavaScript",
        explanation: "[] converts to '' then to 0. 0 == 0 is true."
      },
      {
        question: "What is printed: const obj = { a:1, b:2 }; console.log(Object.keys(obj).length);",
        options: ["1", "2", "undefined", "Error"],
        correct_answer: "2",
        topic: "JavaScript",
        explanation: "Object.keys returns an array of keys ['a', 'b'], whose length is 2."
      },
      {
        question: "What will happen: console.log((() => a)()); var a = 10;",
        options: ["10", "undefined", "ReferenceError", "Error"],
        correct_answer: "undefined",
        topic: "JavaScript",
        explanation: "var a is hoisted but not initialized. The arrow function executes before a=10 assignment."
      },
      {
        question: "What does this print: console.log(new Promise(resolve => resolve(1)));",
        options: ["1", "Promise { 1 }", "undefined", "Error"],
        correct_answer: "Promise { <fulfilled>: 1 }",
        topic: "JavaScript",
        explanation: "The Promise constructor returns a Promise object, not the resolved value."
      }
    ],
  },
  {
    title: "Advanced Data Structures & Algorithms",
    description: "25 hard DSA questions covering complexity, trees, graphs, hashing, heaps, recursion, and dynamic programming.",
    topic: "Algorithms",
    questions: [
      {
        question: "What is the time complexity of searching for an element in a balanced binary search tree?",
        options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"],
        correct_answer: "O(log n)",
        topic: "Trees",
        explanation: "In a balanced BST, each comparison eliminates half of the remaining tree, leading to logarithmic time complexity."
      },
      {
        question: "Which data structure is most efficient for implementing Dijkstra's algorithm?",
        options: ["Binary Heap", "Stack", "Hash Table", "Segment Tree"],
        correct_answer: "Binary Heap",
        topic: "Graphs",
        explanation: "Binary heaps provide O(log n) extract-min and decrease-key operations, making them ideal for Dijkstra's algorithm which frequently needs these operations."
      },
      {
        question: "What is the worst-case time complexity of QuickSort?",
        options: ["O(n²)", "O(n log n)", "O(log n)", "O(n)"],
        correct_answer: "O(n²)",
        topic: "Sorting",
        explanation: "QuickSort degenerates to O(n²) when the pivot is consistently the smallest or largest element, though this is rare with good pivot selection."
      },
      {
        question: "Which data structure allows insertion and deletion from both ends?",
        options: ["Deque", "Stack", "Queue", "Priority Queue"],
        correct_answer: "Deque",
        topic: "Data Structures",
        explanation: "Deque (Double Ended Queue) supports O(1) insertion and deletion from both front and back, unlike queues (FIFO) or stacks (LIFO)."
      },
      {
        question: "Which traversal of a binary tree processes nodes in sorted order for a BST?",
        options: ["Inorder", "Preorder", "Postorder", "Level Order"],
        correct_answer: "Inorder",
        topic: "Trees",
        explanation: "Inorder traversal (left-root-right) visits nodes in ascending order for a Binary Search Tree due to the BST property."
      },
      {
        question: "What is the time complexity of building a heap from an unsorted array?",
        options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
        correct_answer: "O(n)",
        topic: "Heaps",
        explanation: "Using the bottom-up heap construction algorithm (heapify), a heap can be built in linear time O(n), not O(n log n) as commonly mistaken."
      },
      {
        question: "Which algorithm detects a cycle in a directed graph?",
        options: ["DFS with recursion stack", "BFS", "Prim's Algorithm", "Dijkstra's Algorithm"],
        correct_answer: "DFS with recursion stack",
        topic: "Graphs",
        explanation: "DFS can detect cycles in directed graphs by maintaining a recursion stack to track vertices in the current recursion path."
      },
      {
        question: "Which data structure is used in Depth-First Search (DFS)?",
        options: ["Stack", "Queue", "Heap", "Trie"],
        correct_answer: "Stack",
        topic: "Graphs",
        explanation: "DFS uses a stack (either explicitly or via recursion) to explore as far as possible along each branch before backtracking."
      },
      {
        question: "Which algorithm is used to find strongly connected components?",
        options: ["Kosaraju's Algorithm", "Kruskal's Algorithm", "Dijkstra's Algorithm", "Bellman-Ford"],
        correct_answer: "Kosaraju's Algorithm",
        topic: "Graphs",
        explanation: "Kosaraju's algorithm uses two DFS passes to find strongly connected components in a directed graph."
      },
      {
        question: "What is the time complexity for searching in a Hash Table (average case)?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correct_answer: "O(1)",
        topic: "Hashing",
        explanation: "With a good hash function and load factor, hash tables provide constant time O(1) average case for search operations."
      },
      {
        question: "Which algorithm is used for Minimum Spanning Tree when the graph is dense?",
        options: ["Prim's Algorithm", "Kruskal's Algorithm", "Floyd-Warshall", "Johnson's Algorithm"],
        correct_answer: "Prim's Algorithm",
        topic: "Graphs",
        explanation: "Prim's algorithm with adjacency matrix performs better on dense graphs, while Kruskal's is better for sparse graphs."
      },
      {
        question: "What is the best method to detect a cycle in a linked list?",
        options: ["Floyd's Tortoise and Hare", "Hash Table", "Binary Search", "DFS"],
        correct_answer: "Floyd's Tortoise and Hare",
        topic: "Linked List",
        explanation: "Floyd's cycle detection algorithm uses two pointers moving at different speeds and requires O(1) space, unlike hash table which needs O(n) space."
      },
      {
        question: "Which approach is essential in dynamic programming?",
        options: ["Overlapping subproblems", "Divide and conquer only", "Greedy choice", "Backtracking"],
        correct_answer: "Overlapping subproblems",
        topic: "Dynamic Programming",
        explanation: "Dynamic programming optimizes by storing solutions to overlapping subproblems, avoiding redundant calculations."
      },
      {
        question: "What is the time complexity of inserting an element into a Red-Black Tree?",
        options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"],
        correct_answer: "O(log n)",
        topic: "Trees",
        explanation: "Red-Black trees are self-balancing BSTs that maintain O(log n) height through rotations and recoloring during insertions."
      },
      {
        question: "Which algorithm finds the shortest paths between all pairs of vertices?",
        options: ["Floyd-Warshall", "Prim's", "Kruskal's", "DFS"],
        correct_answer: "Floyd-Warshall",
        topic: "Graphs",
        explanation: "Floyd-Warshall algorithm computes shortest paths between all pairs of vertices in O(V³) time using dynamic programming."
      },
      {
        question: "Which traversal uses a queue?",
        options: ["Level Order", "Preorder", "Inorder", "Postorder"],
        correct_answer: "Level Order",
        topic: "Trees",
        explanation: "Level order traversal (BFS) uses a queue to process nodes level by level, unlike DFS traversals which use stacks."
      },
      {
        question: "Which sorting algorithm is stable?",
        options: ["Merge Sort", "QuickSort", "Heap Sort", "Shell Sort"],
        correct_answer: "Merge Sort",
        topic: "Sorting",
        explanation: "Merge sort is stable because it preserves the relative order of equal elements, unlike quicksort and heapsort."
      },
      {
        question: "What is the space complexity of recursive DFS?",
        options: ["O(h)", "O(1)", "O(n)", "O(log n)"],
        correct_answer: "O(h)",
        topic: "Graphs",
        explanation: "Recursive DFS space complexity is O(h) where h is the maximum depth of recursion, which equals the height of the DFS tree."
      },
      {
        question: "Which algorithm solves the Longest Increasing Subsequence in O(n log n)?",
        options: ["Binary search with DP", "Greedy", "Divide and conquer", "Floyd-Warshall"],
        correct_answer: "Binary search with DP",
        topic: "Dynamic Programming",
        explanation: "The optimized LIS algorithm uses dynamic programming with binary search to achieve O(n log n) time complexity."
      },
      {
        question: "Which tree guarantees the most rigid balancing?",
        options: ["AVL Tree", "Red-Black Tree", "Binary Tree", "Trie"],
        correct_answer: "AVL Tree",
        topic: "Trees",
        explanation: "AVL trees maintain stricter balance (height difference ≤ 1) than Red-Black trees, providing faster lookups but more rotations during insertion."
      },
      {
        question: "What is the time complexity of BFS?",
        options: ["O(V + E)", "O(VE)", "O(V²)", "O(E log V)"],
        correct_answer: "O(V + E)",
        topic: "Graphs",
        explanation: "BFS visits each vertex and edge exactly once, resulting in O(V + E) time complexity for adjacency list representation."
      },
      {
        question: "Which structure is best for implementing LRU Cache?",
        options: ["Hash Map + Doubly Linked List", "Array + Stack", "Queue + Heap", "Binary Tree"],
        correct_answer: "Hash Map + Doubly Linked List",
        topic: "Data Structures",
        explanation: "Hash map provides O(1) access, doubly linked list provides O(1) insertion/deletion for maintaining recency order."
      },
      {
        question: "What is the time complexity of binary search on a sorted array?",
        options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"],
        correct_answer: "O(log n)",
        topic: "Searching",
        explanation: "Binary search halves the search space with each comparison, resulting in logarithmic time complexity."
      },
      {
        question: "Which technique does backtracking rely on?",
        options: ["Depth-first search", "Breadth-first search", "Dynamic programming", "Greedy"],
        correct_answer: "Depth-first search",
        topic: "Algorithms",
        explanation: "Backtracking explores solutions depth-first, abandoning partial candidates when they cannot possibly lead to valid solutions."
      },
      {
        question: "Which of the following algorithms uses a priority queue internally?",
        options: ["Dijkstra's Algorithm", "DFS", "Topological Sort", "Floyd-Warshall"],
        correct_answer: "Dijkstra's Algorithm",
        topic: "Graphs",
        explanation: "Dijkstra's algorithm uses a priority queue (min-heap) to always process the vertex with the smallest known distance."
      }
    ],
  },
  {
    title: "Advanced Networking & Infrastructure",
    description: "Comprehensive networking questions covering protocols, security, infrastructure, and system administration",
    topic: "Networking",
    questions: [
      {
        question: "What is the main difference between TCP and UDP?",
        options: [
          "TCP is connection-oriented, UDP is connectionless",
          "TCP is faster, UDP is more reliable", 
          "TCP uses less bandwidth, UDP uses more",
          "TCP is for video, UDP is for file transfer"
        ],
        correct_answer: "TCP is connection-oriented, UDP is connectionless",
        topic: "Networking",
        explanation: "TCP establishes a connection with handshaking and guarantees delivery, while UDP sends packets without connection setup and doesn't guarantee delivery."
      },
      {
        question: "What is the purpose of SSL/TLS in web communication?",
        options: [
          "To compress data for faster transmission",
          "To encrypt data and authenticate servers",
          "To balance load across multiple servers", 
          "To cache frequently accessed content"
        ],
        correct_answer: "To encrypt data and authenticate servers",
        topic: "Networking",
        explanation: "SSL/TLS provides encryption for data privacy and server authentication to prevent man-in-the-middle attacks."
      },
      {
        question: "Which protocol is used for secure file transfer over SSH?",
        options: ["FTP", "SFTP", "HTTP", "SMTP"],
        correct_answer: "SFTP",
        topic: "Networking", 
        explanation: "SFTP (SSH File Transfer Protocol) provides secure file transfer over SSH encrypted connection, unlike FTP which sends data in plaintext."
      },
      {
        question: "What is a VLAN used for in network infrastructure?",
        options: [
          "To increase network speed",
          "To logically segment a physical network",
          "To connect to the internet",
          "To block all incoming traffic"
        ],
        correct_answer: "To logically segment a physical network",
        topic: "Networking",
        explanation: "VLANs (Virtual LANs) allow a single physical network to be partitioned into multiple logical networks for security and traffic management."
      },
      {
        question: "What does CDN stand for and what is its primary purpose?",
        options: [
          "Content Delivery Network - to serve content from geographically distributed servers",
          "Central Data Node - to store all website data centrally", 
          "Compressed Data Network - to reduce bandwidth usage",
          "Cached Data Network - to store temporary files"
        ],
        correct_answer: "Content Delivery Network - to serve content from geographically distributed servers",
        topic: "Networking",
        explanation: "CDNs distribute content across multiple servers worldwide to reduce latency and improve load times for users in different geographic locations."
      },
      {
        question: "What is the difference between HTTP/1.1 and HTTP/2?",
        options: [
          "HTTP/2 uses multiplexing while HTTP/1.1 doesn't",
          "HTTP/1.1 is faster than HTTP/2",
          "HTTP/2 doesn't support encryption",
          "HTTP/1.1 can handle more concurrent requests"
        ],
        correct_answer: "HTTP/2 uses multiplexing while HTTP/1.1 doesn't",
        topic: "Networking",
        explanation: "HTTP/2 introduces multiplexing allowing multiple requests/responses to be sent concurrently over a single connection, solving head-of-line blocking in HTTP/1.1."
      },
      {
        question: "What is BGP used for in internet infrastructure?",
        options: [
          "Email routing between servers",
          "Inter-domain routing between autonomous systems", 
          "Local network address translation",
          "Web page content delivery"
        ],
        correct_answer: "Inter-domain routing between autonomous systems",
        topic: "Networking",
        explanation: "BGP (Border Gateway Protocol) is the routing protocol that makes core routing decisions on the internet between different autonomous systems (ISPs)."
      },
      {
        question: "What is the purpose of a reverse proxy?",
        options: [
          "To hide client IP addresses from the internet",
          "To handle incoming requests and distribute them to backend servers",
          "To block all outgoing traffic",
          "To accelerate database queries"
        ],
        correct_answer: "To handle incoming requests and distribute them to backend servers",
        topic: "Networking",
        explanation: "Reverse proxies sit in front of web servers, handling client requests, providing load balancing, SSL termination, and caching."
      },
      {
        question: "What is NAT and why is it important for IPv4?",
        options: [
          "Network Access Token - for user authentication",
          "Network Address Translation - to conserve public IP addresses",
          "Native Access Technology - for faster routing",
          "Node Allocation Table - for IP management"
        ],
        correct_answer: "Network Address Translation - to conserve public IP addresses",
        topic: "Networking", 
        explanation: "NAT allows multiple devices on a private network to share a single public IP address, extending the limited IPv4 address space."
      },
      {
        question: "What is the difference between symmetric and asymmetric encryption?",
        options: [
          "Symmetric uses same key for encryption/decryption, asymmetric uses different keys",
          "Symmetric is faster but less secure",
          "Asymmetric is only used for SSL certificates", 
          "Symmetric encryption doesn't work over networks"
        ],
        correct_answer: "Symmetric uses same key for encryption/decryption, asymmetric uses different keys",
        topic: "Networking",
        explanation: "Symmetric encryption uses one shared key, asymmetric uses public/private key pairs. HTTPS uses both: asymmetric for key exchange, symmetric for bulk encryption."
      }
    ],
  },
  {
    title: "Web Development & Modern JavaScript",
    description: "Questions about React, JavaScript, CSS, and modern web development concepts",
    topic: "Web Development",
    questions: [
      {
        question: "What is the virtual DOM in React and why is it used?",
        options: [
          "A lightweight copy of the real DOM for performance optimization",
          "A security feature to prevent XSS attacks",
          "A database for storing component state",
          "A testing environment for components"
        ],
        correct_answer: "A lightweight copy of the real DOM for performance optimization",
        topic: "Web Development",
        explanation: "The virtual DOM is a JavaScript representation of the actual DOM. React uses it to batch updates and minimize expensive direct DOM manipulations, improving performance."
      },
      {
        question: "What is the difference between let, const, and var in JavaScript?",
        options: [
          "let and const are block-scoped, var is function-scoped",
          "They are all exactly the same",
          "const can be reassigned, let cannot",
          "var is the modern way to declare variables"
        ],
        correct_answer: "let and const are block-scoped, var is function-scoped",
        topic: "JavaScript",
        explanation: "let and const have block scope and temporal dead zone, while var has function scope and hoists with undefined initialization. const cannot be reassigned."
      },
      {
        question: "What are CSS Grid and Flexbox primarily used for?",
        options: [
          "Creating complex layouts and responsive designs",
          "Adding animations to web pages", 
          "Optimizing images for the web",
          "Managing JavaScript dependencies"
        ],
        correct_answer: "Creating complex layouts and responsive designs",
        topic: "Web Development",
        explanation: "CSS Grid is for 2D layouts (rows and columns), Flexbox is for 1D layouts (either row or column). Together they enable modern responsive web design."
      },
      {
        question: "What is the purpose of Webpack in modern frontend development?",
        options: [
          "To bundle and optimize JavaScript modules and assets",
          "To replace HTML with JavaScript",
          "To create server-side APIs",
          "To manage database connections"
        ],
        correct_answer: "To bundle and optimize JavaScript modules and assets",
        topic: "Web Development",
        explanation: "Webpack is a module bundler that processes JavaScript, CSS, images, and other assets, optimizing them for production deployment."
      },
      {
        question: "What are React Hooks and why were they introduced?",
        options: [
          "Functions that let you use state and lifecycle features in functional components",
          "Tools for connecting to external APIs",
          "Security features for React applications",
          "Performance monitoring tools"
        ],
        correct_answer: "Functions that let you use state and lifecycle features in functional components",
        topic: "Web Development",
        explanation: "Hooks (like useState, useEffect) allow functional components to manage state and side effects, reducing the need for class components and making code more reusable."
      },
      {
        question: "What is the event loop in JavaScript?",
        options: [
          "The mechanism that handles asynchronous operations and callbacks",
          "A loop that renders the DOM continuously",
          "A security feature for event handling",
          "A performance optimization for loops"
        ],
        correct_answer: "The mechanism that handles asynchronous operations and callbacks",
        topic: "JavaScript",
        explanation: "The event loop allows JavaScript to handle asynchronous operations by managing the call stack, callback queue, and microtask queue, enabling non-blocking I/O."
      }
    ],
  },
  {
    title: "Database & System Design",
    description: "Questions about databases, SQL, backend development, and system architecture",
    topic: "Database",
    questions: [
      {
        question: "What is the difference between SQL and NoSQL databases?",
        options: [
          "SQL uses structured tables with schemas, NoSQL is schema-less and flexible",
          "SQL is faster for all use cases",
          "NoSQL doesn't support transactions",
          "SQL is only for small applications"
        ],
        correct_answer: "SQL uses structured tables with schemas, NoSQL is schema-less and flexible",
        topic: "Database",
        explanation: "SQL databases use predefined schemas and ACID properties, while NoSQL offers flexible schemas, horizontal scaling, and is better for unstructured data."
      },
      {
        question: "What is database indexing and how does it improve performance?",
        options: [
          "Creating pointers to data for faster search operations",
          "Compressing database files to save space",
          "Backing up data regularly",
          "Encrypting sensitive information"
        ],
        correct_answer: "Creating pointers to data for faster search operations",
        topic: "Database",
        explanation: "Indexes create optimized data structures (like B-trees) that allow databases to find data without scanning entire tables, dramatically improving query performance."
      },
      {
        question: "What is the CAP theorem in distributed systems?",
        options: [
          "A system can only guarantee two of: Consistency, Availability, Partition Tolerance",
          "A theorem about database capacity planning",
          "A rule for API design consistency",
          "A principle for cache optimization"
        ],
        correct_answer: "A system can only guarantee two of: Consistency, Availability, Partition Tolerance",
        topic: "Database",
        explanation: "The CAP theorem states that in a distributed system, you can only achieve two out of three: Consistency (all nodes see same data), Availability (every request gets response), Partition Tolerance (system works despite network failures)."
      },
      {
        question: "What is the difference between vertical and horizontal scaling?",
        options: [
          "Vertical: adding more power to existing machine, Horizontal: adding more machines",
          "Vertical: adding more machines, Horizontal: adding more power",
          "They are the same thing",
          "Vertical is for databases, horizontal is for applications"
        ],
        correct_answer: "Vertical: adding more power to existing machine, Horizontal: adding more machines",
        topic: "Database",
        explanation: "Vertical scaling (scale-up) increases resources on a single server, while horizontal scaling (scale-out) adds more servers to distribute load."
      },
      {
        question: "What is database connection pooling?",
        options: [
          "Reusing database connections to avoid overhead of establishing new ones",
          "Combining multiple databases into one",
          "Sharing database credentials among applications",
          "Backing up connections for disaster recovery"
        ],
        correct_answer: "Reusing database connections to avoid overhead of establishing new ones",
        topic: "Database",
        explanation: "Connection pooling maintains a cache of database connections that can be reused, reducing the performance cost of establishing new connections for each request."
      }
    ],
  }
];

async function seedDatabase() {
  try {
    console.log('Setting up database...');
    await setupDatabase();

    const client = await pool.connect();
    try {
      // Clear existing data (optional - comment out if you want to keep existing data)
      await client.query('DELETE FROM quiz_results');
      await client.query('DELETE FROM questions');
      await client.query('DELETE FROM quizzes');

      console.log('Seeding quizzes and questions...');

      // Get or create a default admin user for seeding
      let adminUserId = null;
      const adminCheck = await client.query(
        "SELECT id FROM users WHERE role = 'admin' LIMIT 1"
      );
      if (adminCheck.rows.length > 0) {
        adminUserId = adminCheck.rows[0].id;
      }

      for (const quiz of quizData) {
        // Insert quiz (with created_by if admin exists)
        const quizResult = await client.query(
          'INSERT INTO quizzes (title, description, topic, created_by) VALUES ($1, $2, $3, $4) RETURNING id',
          [quiz.title, quiz.description, quiz.topic, adminUserId]
        );

        const quizId = quizResult.rows[0].id;

        // Insert questions for this quiz
        for (let i = 0; i < quiz.questions.length; i++) {
          const question = quiz.questions[i];
          await client.query(
            `INSERT INTO questions (quiz_id, question_text, options, correct_answer, explanation, topic, question_order)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
              quizId,
              question.question,
              JSON.stringify(question.options),
              question.correct_answer,
              question.explanation, // Now properly included
              question.topic,
              i + 1,
            ]
          );
        }

        console.log(`✓ Seeded quiz: ${quiz.title} (${quiz.questions.length} questions)`);
      }

      console.log('Database seeding completed successfully!');
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('seed.js')) {
  seedDatabase().then(() => {
    console.log('Seeding completed');
    process.exit(0);
  }).catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
}

export default seedDatabase;