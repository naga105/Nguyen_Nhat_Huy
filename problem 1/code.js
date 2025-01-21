// Solution 1: Using for loop to achieve an O(n) time complexity
const sum_to_n_a = (n) => {
    let sum = 0;
    for (let i = 1; i <= n; i++) sum += i;
    return sum;
};

// Solution 2: Using recursion to achieve the result with O(n) time complexity
const sum_to_n_b = (n) => {
    if (n <= 1) return n;

    return sum_to_n_b(n - 1) + n;
};

// Solution 3: Using Math to solve the problem, O(1) time complexity
const sum_to_n_c = (n) => {
    return (n*(n+1))/2; 
}