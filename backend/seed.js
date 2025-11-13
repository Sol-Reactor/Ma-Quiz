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
      },
    ],
  },
  {
    title: "Networking & Infrastructure",
    description: "Questions about networking, infrastructure, and system administration",
    topic: "Networking",
    questions: [
      {
        question: "Which of the following is a private IP address range?",
        options: ["10.0.0.0 to 10.255.255.255", "172.16.0.0 to 172.31.255.255", "192.168.0.0 to 192.168.255.255", "All of the above"],
        correct_answer: "All of the above",
        topic: "Networking",
      },
      {
        question: "What is the primary function of a DNS server?",
        options: ["Assigning IP addresses dynamically", "Translating domain names to IP addresses", "Securing network traffic with encryption", "Managing email delivery"],
        correct_answer: "Translating domain names to IP addresses",
        topic: "Networking",
      },
      {
        question: "In the OSI model, which layer is responsible for routing data between networks?",
        options: ["Data Link Layer", "Transport Layer", "Network Layer", "Application Layer"],
        correct_answer: "Network Layer",
        topic: "Networking",
      },
      {
        question: "What is the default port for the SSH protocol?",
        options: ["21", "22", "23", "80"],
        correct_answer: "22",
        topic: "Networking",
      },
      {
        question: "What does RAID stand for?",
        options: ["Random Array of Independent Disks", "Redundant Array of Independent Disks", "Rapid Access Integrated Device", "Real-time Array of Indexed Data"],
        correct_answer: "Redundant Array of Independent Disks",
        topic: "Infrastructure",
      },
    ],
  },
  {
    title: "Web Development & JavaScript",
    description: "Questions about React, JavaScript, CSS, and web development concepts",
    topic: "Web Development",
    questions: [
      {
        question: "Which hook is typically used in React for side effects like data fetching?",
        options: ["useState", "useContext", "useEffect", "useReducer"],
        correct_answer: "useEffect",
        topic: "Web Development",
      },
      {
        question: "What is the purpose of the 'z-index' CSS property?",
        options: ["Setting the transparency of an element", "Controlling the stacking order of elements", "Defining the font size", "Adjusting the horizontal position"],
        correct_answer: "Controlling the stacking order of elements",
        topic: "Web Development",
      },
      {
        question: "In JavaScript, what is the output of `typeof null`?",
        options: ["'null'", "'object'", "'undefined'", "'number'"],
        correct_answer: "'object'",
        topic: "JavaScript",
      },
      {
        question: "Which HTML tag is used to define an internal stylesheet?",
        options: ["<script>", "<link>", "<style>", "<css>"],
        correct_answer: "<style>",
        topic: "Web Development",
      },
      {
        question: "What is the method used to prevent event bubbling in JavaScript?",
        options: ["event.preventDefault()", "event.stopPropagation()", "event.stopBubble()", "event.cancelEvent()"],
        correct_answer: "event.stopPropagation()",
        topic: "JavaScript",
      },
      {
        question: "Which of these is not an OOP pillar?",
        options: ["Encapsulation", "Polymorphism", "Abstraction", "Declaration"],
        correct_answer: "Declaration",
        topic: "OOP",
      },
    ],
  },
  {
    title: "Database & Backend",
    description: "Questions about databases, SQL, backend development, and system concepts",
    topic: "Database",
    questions: [
      {
        question: "Which SQL clause is used to filter records based on aggregate functions?",
        options: ["WHERE", "GROUP BY", "HAVING", "ORDER BY"],
        correct_answer: "HAVING",
        topic: "Database",
      },
      {
        question: "What is the primary difference between a INNER JOIN and an LEFT JOIN in SQL?",
        options: ["INNER returns all rows, LEFT returns matching rows", "LEFT JOIN includes all rows from the left table", "INNER JOIN is faster than LEFT JOIN", "They are identical in functionality"],
        correct_answer: "LEFT JOIN includes all rows from the left table",
        topic: "Database",
      },
      {
        question: "Which HTTP status code indicates that the request has succeeded and a new resource has been created?",
        options: ["200 OK", "201 Created", "404 Not Found", "301 Moved Permanently"],
        correct_answer: "201 Created",
        topic: "Backend",
      },
      {
        question: "What does the 'T' in ACID properties of a transaction stand for?",
        options: ["Temporary", "Total", "Transaction", "Consistency"],
        correct_answer: "Transaction",
        topic: "Database",
      },
      {
        question: "Which programming language is commonly used for shell scripting on Linux/Unix systems?",
        options: ["Python", "C++", "Bash", "Java"],
        correct_answer: "Bash",
        topic: "Backend",
      },
    ],
  },
  {
    title: "Programming Concepts",
    description: "Questions about algorithms, data structures, and general programming concepts",
    topic: "Concepts",
    questions: [
      {
        question: "What is 'Big O Notation' primarily used to describe?",
        options: ["The storage size of a program", "The aesthetics of an algorithm's output", "The time and space complexity of an algorithm", "The number of lines of code"],
        correct_answer: "The time and space complexity of an algorithm",
        topic: "Concepts",
      },
      {
        question: "In object-oriented programming, what is a 'Class'?",
        options: ["A function that returns an object", "An instance of an object", "A blueprint for creating objects", "A special type of array"],
        correct_answer: "A blueprint for creating objects",
        topic: "OOP",
      },
      {
        question: "Which data structure operates on a Last-In, First-Out (LIFO) principle?",
        options: ["Queue", "Array", "Stack", "Linked List"],
        correct_answer: "Stack",
        topic: "Concepts",
      },
      {
        question: "What is the term for a block of code designed to perform a particular task in a program?",
        options: ["Variable", "Loop", "Function", "Module"],
        correct_answer: "Function",
        topic: "Concepts",
      },
      {
        question: "Which term describes the process of converting an object into a sequence of bytes for storage or transmission?",
        options: ["Deserialization", "Polymorphism", "Encapsulation", "Serialization"],
        correct_answer: "Serialization",
        topic: "Concepts",
      },
    ],
  },
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
            `INSERT INTO questions (quiz_id, question_text, options, correct_answer, topic, question_order)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              quizId,
              question.question,
              JSON.stringify(question.options),
              question.correct_answer,
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

