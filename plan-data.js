// All dates and learning targets are recommendations, not completed achievements.
export const START = "2026-10-27";
export const END = "2026-12-31";
export const DA_SYLLABUS = "https://gate2027.iitm.ac.in/exam_papers_and_syllabus";
export const DA_PDF = "https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/DA_GATE2027_Syllabus.pdf";

export const WEEKS = [
  {
    start:"2026-10-27", title:"Start deliberately", phase:"Foundation",
    gateArea:"Probability & Statistics",
    gate:["Sample spaces, counting and probability axioms","Conditional probability and independence","Bayes theorem and worked examples","Random variables: PMF, PDF and CDF","Mean, variance and expectation","Bernoulli, binomial and Poisson distributions","Weekly recap: 5 GATE-style questions"],
    cs:["Python functions and OOP","Big-O and Python data structures","ML training vs validation","Numpy / vectorization","Experiment reproducibility","Review and teach back","Review notes"],
    voice:["Read repository architecture; verify existing Android build","Audit offline STT and TTS interfaces","Write acceptance tests for Telugu/English voice loop","Inventory downloadable model assets and licenses"],
    nohack:["Run tests and record baseline outcomes","Verify packet-capture environment and permissions","Review flow schema and sample traffic safely","Identify unit-test gaps without inventing measurements"],
    research:"Audit AURA manuscript claims, evidence, venue formatting and citations",
    outcome:"Baseline checks documented for both projects; study habit established."
  },
  {
    start:"2026-11-02", title:"Probability in practice", phase:"Foundation",
    gateArea:"Probability & Statistics",
    gate:["Joint, marginal and conditional distributions","Continuous distributions: uniform and exponential","Normal distribution and standardization","Covariance, correlation and independence","Sampling distributions and central limit theorem","Confidence intervals and z/t tests","Chi-square tests and mixed PYQs"],
    cs:["SQL SELECT and WHERE","SQL joins and grouping","Database keys and normalization","Indexes and query plans","Precision, recall and F1","Python profiling basics","Review notes"],
    voice:["Implement a tested local audio input boundary","Add VAD test cases using allowed recordings","Add bilingual text normalization tests","Record CPU/latency measurement protocol"],
    nohack:["Add parser tests for IPv4/IPv6 samples","Check flow timeout and lifecycle handling","Add feature schema validation","Create reproducible fixture traffic data"],
    research:"Resolve evidence tables, numerical consistency and AI-assistance disclosure",
    outcome:"GATE probability foundations + verified audio/network fixtures."
  },
  {
    start:"2026-11-09", title:"Linear algebra for ML", phase:"Core",
    gateArea:"Linear Algebra",
    gate:["Vectors, norms and inner products","Matrices, rank and systems of equations","Basis, span and linear independence","Eigenvalues and eigenvectors","Orthogonality and projections","LU, SVD and applications","Mixed matrix PYQs and review"],
    cs:["OS processes vs threads","CPU scheduling concepts","Synchronization and locks","Deadlocks and prevention","Memory and paging","PyTorch tensors","Review notes"],
    voice:["Implement STT adapter and test fallback behavior","Test Telugu/English language routing","Connect STT output to local text pipeline","Document unsupported device conditions"],
    nohack:["Build bidirectional flow aggregation tests","Validate feature types and missing values","Add data leakage guardrails","Benchmark flow processing on safe fixtures"],
    research:"Complete AURA technical edit and paper-level consistency review",
    outcome:"Linear algebra notes and functioning tested pipeline components."
  },
  {
    start:"2026-11-16", title:"Calculus and optimization", phase:"Core",
    gateArea:"Calculus & Optimization",
    gate:["Single-variable limits and continuity","Derivatives, chain rule and partial derivatives","Gradients and directional derivatives","Taylor series and approximation","Critical points and extrema","Convexity and gradient descent intuition","Timed optimization question set"],
    cs:["REST resource design","HTTP methods and status codes","FastAPI routing and validation","Input validation and exceptions","Authentication basics","PyTorch autograd","Review notes"],
    voice:["Build the offline KB retrieval interface","Implement source-linked response schema","Add medical-safety refusal and escalation tests","Integrate local response service with UI"],
    nohack:["Train a simple reproducible baseline on approved data","Evaluate class balance and leakage","Report confusion matrix and false alarms","Persist model manifest and config"],
    research:"Prepare validated AURA submission package, if venue rules permit",
    outcome:"Optimization revision plus first baseline evaluations."
  },
  {
    start:"2026-11-23", title:"Algorithms and data handling", phase:"Core",
    gateArea:"Programming, DSA & Algorithms",
    gate:["Python control flow, collections and complexity","Stacks, queues and priority queues","Searching and sorting techniques","Hashing and dictionaries","Trees and graph traversal","Shortest path algorithms","Timed DSA/PYQ set"],
    cs:["TCP vs UDP","DNS and HTTP","IP packets and ports","Network failure modes","PyTorch training loops","Dataset splits and leakage","Review notes"],
    voice:["Add TTS output adapter tests","Wire local voice loop end-to-end","Measure stage latency on actual target device","Record failing scenarios and fixes"],
    nohack:["Integrate trained baseline with streaming feature schema","Implement safe inference fallback","Create CLI smoke-test fixtures","Measure detection latency on sample inputs"],
    research:"Submit AURA only after claims, venue and authorship checks pass",
    outcome:"One reproducible end-to-end test path in each project."
  },
  {
    start:"2026-11-30", title:"Data systems", phase:"Build",
    gateArea:"DBMS & Warehousing",
    gate:["Relational algebra and ER models","SQL joins, aggregation and subqueries","Functional dependencies and normal forms","Transactions and ACID","Indexes and query optimization","Data warehouse concepts, OLAP and ETL","Mixed database PYQs"],
    cs:["Concurrency in web apps","Caching and invalidation","Background jobs and queues","Logging and tracing","SQL query plans","Code review practice","Review notes"],
    voice:["Test fully offline operation in airplane mode","Document model download and checksum process","Reduce memory or startup bottlenecks","Create structured acceptance-test report"],
    nohack:["Add CLI flow statistics and counters","Implement data-quality warnings","Document realistic capture limitations","Add Windows packaging smoke tests"],
    research:"If submitted, archive accepted manuscript and evidence; otherwise resolve blockers",
    outcome:"Database preparation and reliability-focused integration."
  },
  {
    start:"2026-12-07", title:"Supervised learning", phase:"Build",
    gateArea:"Machine Learning",
    gate:["Regression models and least squares","Regularization, bias and variance","Decision trees and impurity","Naive Bayes and logistic regression","KNN and support vector machines","Validation, metrics and calibration","Supervised-learning mixed PYQs"],
    cs:["ML preprocessing pipelines","Hyperparameters and overfitting","Train/validation/test isolation","Calibration and thresholding","Cross-validation","Model reproducibility","Review notes"],
    voice:["Audit safety and source-grounding behavior","Add regression tests for bilingual prompts","Record accuracy, latency and resource usage","Refine demo and error messages"],
    nohack:["Compare baseline vs alternative model fairly","Evaluate false-positive rate and class imbalance","Add repeatable model evaluation command","Write results and limitations"],
    research:"Check paper status; no fabricated acceptance or submission claims",
    outcome:"Measured ML results and reproducible artifacts."
  },
  {
    start:"2026-12-14", title:"Unsupervised learning and AI", phase:"Build",
    gateArea:"Machine Learning / AI",
    gate:["K-means and cluster evaluation","Hierarchical clustering","PCA and dimensionality reduction","Heuristic and uninformed search","A* search and admissibility","Adversarial search: minimax","Mixed ML/AI PYQs"],
    cs:["Docker containers and images","GitHub Actions CI","Unit vs integration tests","Operational logs and metrics","API reliability testing","Technical demo preparation","Review notes"],
    voice:["Package verified Android demo build","Test offline failure conditions","Finalize concise walkthrough","Write deployment and device-compatibility docs"],
    nohack:["Run end-to-end capture-to-alert demo","Stabilize installer or executable","Write tests for graceful failures","Prepare sanitized demonstration artifacts"],
    research:"Reserve one session for revision only if submission needs it",
    outcome:"Shareable reproducible demos with limitations."
  },
  {
    start:"2026-12-21", title:"Reasoning and interviews", phase:"Launch",
    gateArea:"Artificial Intelligence",
    gate:["Propositional logic and inference","Predicate logic basics","Graphical models and conditional independence","Exact inference and variable elimination","Approximate inference by sampling","General aptitude: verbal and quantitative","Timed DA mixed PYQ set"],
    cs:["Mock interview: DSA","Mock interview: ML","Mock interview: backend","Mock interview: project defense","Résumé bullet fact checking","Research storytelling","Review notes"],
    voice:["Check test suite and fix critical regressions","Publish reproducible release notes","Record honest demo with on-device evidence","Open remaining issues with priorities"],
    nohack:["Validate final test suite and collect metrics","Document dataset sources and restrictions","Record safe local demonstration","Create release checklist"],
    research:"Refresh research summary for CV and interviews",
    outcome:"Portfolio artifacts + interview explanations."
  },
  {
    start:"2026-12-28", title:"Consolidate and apply", phase:"Review",
    gateArea:"Mixed GATE DA Review",
    gate:["Probability and linear-algebra weak spots","Calculus and data systems weak spots","ML and AI weak spots","Timed mini-mock and error log","GA, math and review","Mixed DA PYQ review","Plan January follow-up"],
    cs:["Timed DSA mock","DBMS and OS flashcards","Explain project architecture unaided","Resume/LinkedIn final review","Internship application review","Review notes","Rest and plan"],
    voice:["Archive December demo and known issues","Triage January technical milestones","Polish README with only verified evidence","Create maintenance checklist"],
    nohack:["Archive tests, evaluation artifacts and caveats","Triage January technical milestones","Polish README and installation guide","Create maintenance checklist"],
    research:"Record actual submission status and next action",
    outcome:"Credible résumé, portfolio and repeatable January routine."
  }
];

export const DSA = [
  ["Contains Duplicate","contains-duplicate","Arrays & Hashing"],
  ["Two Sum","two-sum","Arrays & Hashing"],
  ["Valid Anagram","valid-anagram","Arrays & Hashing"],
  ["Group Anagrams","group-anagrams","Arrays & Hashing"],
  ["Product of Array Except Self","product-of-array-except-self","Prefix / Suffix"],
  ["Top K Frequent Elements","top-k-frequent-elements","Heap / Hash"],
  ["Valid Palindrome","valid-palindrome","Two Pointers"],
  ["Two Sum II","two-sum-ii-input-array-is-sorted","Two Pointers"],
  ["3Sum","3sum","Two Pointers"],
  ["Container With Most Water","container-with-most-water","Two Pointers"],
  ["Best Time to Buy and Sell Stock","best-time-to-buy-and-sell-stock","Sliding Window"],
  ["Longest Substring Without Repeating Characters","longest-substring-without-repeating-characters","Sliding Window"],
  ["Longest Repeating Character Replacement","longest-repeating-character-replacement","Sliding Window"],
  ["Minimum Window Substring","minimum-window-substring","Sliding Window"],
  ["Valid Parentheses","valid-parentheses","Stack"],
  ["Min Stack","min-stack","Stack"],
  ["Daily Temperatures","daily-temperatures","Monotonic Stack"],
  ["Evaluate Reverse Polish Notation","evaluate-reverse-polish-notation","Stack"],
  ["Binary Search","binary-search","Binary Search"],
  ["Search in Rotated Sorted Array","search-in-rotated-sorted-array","Binary Search"],
  ["Find Minimum in Rotated Sorted Array","find-minimum-in-rotated-sorted-array","Binary Search"],
  ["Search a 2D Matrix","search-a-2d-matrix","Binary Search"],
  ["Reverse Linked List","reverse-linked-list","Linked List"],
  ["Merge Two Sorted Lists","merge-two-sorted-lists","Linked List"],
  ["Linked List Cycle","linked-list-cycle","Linked List"],
  ["Reorder List","reorder-list","Linked List"],
  ["Invert Binary Tree","invert-binary-tree","Trees"],
  ["Maximum Depth of Binary Tree","maximum-depth-of-binary-tree","Trees"],
  ["Same Tree","same-tree","Trees"],
  ["Binary Tree Level Order Traversal","binary-tree-level-order-traversal","Trees"],
  ["Validate Binary Search Tree","validate-binary-search-tree","BST"],
  ["Kth Smallest Element in a BST","kth-smallest-element-in-a-bst","BST"],
  ["Lowest Common Ancestor of a BST","lowest-common-ancestor-of-a-binary-search-tree","BST"],
  ["Kth Largest Element in an Array","kth-largest-element-in-an-array","Heap"],
  ["Last Stone Weight","last-stone-weight","Heap"],
  ["Number of Islands","number-of-islands","Graph DFS/BFS"],
  ["Clone Graph","clone-graph","Graph"],
  ["Rotting Oranges","rotting-oranges","Graph BFS"],
  ["Course Schedule","course-schedule","Topological Sort"],
  ["Pacific Atlantic Water Flow","pacific-atlantic-water-flow","Graph DFS/BFS"],
  ["Climbing Stairs","climbing-stairs","DP"],
  ["House Robber","house-robber","DP"],
  ["Coin Change","coin-change","DP"],
  ["Longest Increasing Subsequence","longest-increasing-subsequence","DP"],
  ["Longest Common Subsequence","longest-common-subsequence","DP"],
  ["Combination Sum","combination-sum","Backtracking"],
  ["Subsets","subsets","Backtracking"],
  ["Permutations","permutations","Backtracking"],
  ["Merge Intervals","merge-intervals","Intervals"],
  ["Insert Interval","insert-interval","Intervals"],
  ["Jump Game","jump-game","Greedy"],
  ["Maximum Subarray","maximum-subarray","Greedy / DP"],
  ["Counting Bits","counting-bits","Bit Manipulation"],
  ["Number of 1 Bits","number-of-1-bits","Bit Manipulation"],
  ["Missing Number","missing-number","Bit Manipulation"],
  ["Find the Duplicate Number","find-the-duplicate-number","Linked List / Pointers"]
];
