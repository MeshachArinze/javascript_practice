/*
Let’s return to functions and study them more in-depth.

Our first topic will be recursion.

If you are not new to programming, then it is probably familiar and you could skip this chapter.

Recursion is a programming pattern that is useful in situations when a task can be naturally split into several tasks of the same kind, but simpler. Or when a task can be simplified into an easy action plus a simpler variant of the same task. Or, as we’ll see soon, to deal with certain data structures.

When a function solves a task, in the process it can call many other functions. A partial case of this is when a function calls itself. That’s called recursion.
*/

function pow(x, n) {
    let result = 1;
  
    for (  let i = 0; i < n; i++) {
         result *= x;
    }

    return result;
}

console.log(pow(2, 3));

function pows(x, n) {
    if (n === 1) return x;
    else {
        return x * pow(x, n -1);
    }
}

console.log(pow(3,4));

/*

A recursive solution is usually shorter than an iterative one.

Here we can rewrite the same using the conditional operator ? instead of if to make pow(x, n) more terse and still very readable:

*/

function pow(x, n) {
  return n == 1 ? x : x * pow(x, n - 1);
}

console.log(pow(2, 5));

/*

As we can see, when our function gets a department to sum, there are two possible cases:

Either it’s a “simple” department with an array of people – then we can sum the salaries in a simple loop.
Or it’s an object with N subdepartments – then we can make N recursive calls to get the sum for each of the subdeps and combine the results.
The 1st case is the base of recursion, the trivial case, when we get an array.

The 2nd case when we get an object is the recursive step. A complex task is split into subtasks for smaller departments. They may in turn split again, but sooner or later the split will finish at (1).

The algorithm is probably even easier to read from the code:

*/

let company = { // the same object, compressed for brevity
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

// The function to do the job
function sumSalaries(department) {
  if (Array.isArray(department)) { // case (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
  } else { // case (2)
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
    }
    return sum;
  }
}

console.group(sumSalaries(company)); // 7700


