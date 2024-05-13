namespace Solution;

public class Customer
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
}

public class SearchResult
{
    public Customer Customer { get; set; }
    public int Score { get; set; }
}

class Solution
{
    static void Main(string[] args)
    {
        //using var stdinStream = Console.OpenStandardInput();
        //using var stdin = new StreamReader(stdinStream);
        //var lines = stdin.ReadToEnd().Split(Environment.NewLine)
        //    .Select(l =>
        //    {
        //        return l.Split(',');
        //    })
        //    .ToList();

        //generate args to test 
        var lines = new List<string[]>
         {
             new string[] { "weight", "FirstName", "20" },
             new string[] { "weight", "LastName", "40" },
             new string[] { "weight", "Address", "80" },
             new string[] { "customer", "John", "Doe", "123 Main St" },
             //new string[] { "customer", "Jane", "Smith", "456 Elm St" },
             //new string[] { "customer", "Jennifer", "Doe", "333 4th South St" },
             //new string[] { "customer", "Jenni", "Doe", "333 4th South St" },
             //new string[] { "customer", "Daisy", "Doe", "333 4th South St" },
             //new string[] { "customer", "Carol", "Smith", "456 4th South St" },
             new string[] { "search", "123 Main St" }
         };

        var weights = lines.Where(l => l[0] == "weight")
            .ToDictionary(x => x[1], x => int.Parse(x[2]));

        var customers = lines.Where(l => l[0] == "customer")
            .Select(l => new Customer
            {
                FirstName = l[1],
                LastName = l[2],
                Address = l[3]
            })
            .ToList();

        var searchString = lines.Where(l => l[0] == "search")
            .Select(l => l[1])
            .First();

        Console.WriteLine($"search string: {searchString}");

        // perform the search
        var searchResults = Search(weights, customers, searchString);

        // display the results
        foreach (var result in searchResults)
        {
            Console.WriteLine($"{result.Customer.FirstName} {result.Customer.LastName} {result.Customer.Address} - Score: {result.Score}");
        }
        Console.WriteLine($"----");

        // perform the search
        var searchResultsOptimized = SearchOptimized(weights, customers, searchString);

        // display the results
        foreach (var result in searchResultsOptimized)
        {
            Console.WriteLine($"* {result.Customer.FirstName} {result.Customer.LastName} {result.Customer.Address} - Score: {result.Score}");
        }
        //keep console app running until key press
        Console.WriteLine($"----");
        Console.ReadKey();
    }

    #region "Original version"
    /*
    To complete this implementation, we need to write the Search function which will:
    Tokenize the search string.
    Compare each token against the properties of each customer.
    Assign scores based on weights given to each matching attribute.
    Return the list of top 5 results sorted by their scores.
    */

    static List<SearchResult> Search(Dictionary<string, int> weights, List<Customer> customers, string searchString)
    {
        var results = new List<SearchResult>();

        //check for empty search string
        if (string.IsNullOrWhiteSpace(searchString))
        {
            return results;
        }

        var searchTokens = TokenizeSearchString(searchString);

        foreach (var customer in customers)
        {
            int score = 0;

            foreach (var token in searchTokens)
            {
                //process per each weight 

                //if full match by token then return weight 400% per field
                var IsFullMatchFirstName = CheckFullMatch(customer.FirstName, searchString, weights["FirstName"], ref score);

                //if no full match then check for partial match
                if (!IsFullMatchFirstName)
                {
                    //if partial match by token then return weight 200% per field
                    CheckPartialMatch(customer.FirstName, token, weights["FirstName"], ref score);
                }

                //if full match by token then return weight 400% per field
                var IsFullMatchLastName = CheckFullMatch(customer.LastName, searchString, weights["LastName"], ref score);

                //if no full match then check for partial match
                if (!IsFullMatchLastName)
                {
                    //if partial match by token then return weight 200% per field
                    CheckPartialMatch(customer.LastName, token, weights["LastName"], ref score);
                }

                //if full match by token then return weight 400% per field
                var IsFullMatchAddress = CheckFullMatch(customer.Address, searchString, weights["Address"], ref score);

                //if no full match then check for partial match
                if (!IsFullMatchAddress)
                {
                    //if partial match by token then return weight 200% per field
                    CheckPartialMatch(customer.Address, token, weights["Address"], ref score);
                }
            }

            //if no full or partial match then check for any match and return weight 100% per field
            if (score == 0)
            {
                CheckAnyMatch(customer, searchString, weights, ref score);
            }

            if (score > 0)
            {
                results.Add(new SearchResult
                {
                    Customer = customer,
                    Score = score
                });
            }
        }

        // return your results
        return results.OrderByDescending(r => r.Score).Take(5).ToList();
    }

    private static bool CheckFullMatch(string customerField, string searchString, int weight, ref int score)
    {
        var increment = 0;

        //if token is exact match to customer field then return 400% weight
        if (searchString.Equals(customerField, StringComparison.OrdinalIgnoreCase))
        {
            increment += weight * 4;
        }

        score += increment;
        return increment > 0;
    }

    private static void CheckPartialMatch(string customerField, string token, int weight, ref int score)
    {
        //if customer field has any partial match to token then return 200% of weight
        if (customerField.Contains(token))
        {
            score += weight * 2;
        }
    }

    private static void CheckAnyMatch(Customer customer, string searchString, Dictionary<string, int> weights, ref int score)
    {
        //if token partial match to customer first name then return 100% weight
        if (searchString.Contains(customer.FirstName))
        {
            score += weights["FirstName"];
        }
        if (searchString.Contains(customer.LastName))
        {
            score += weights["LastName"];
        }
        if (searchString.Contains(customer.Address))
        {
            score += weights["Address"];
        }
    }

    static List<string> TokenizeSearchString(string searchString)
    {
        // tokenize the search string
        return searchString.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
            .Where(token => token.Length >= 3)
            .ToList();
    }
    #endregion

    #region "OPTIMIZED version"
    static List<SearchResult> SearchOptimized(Dictionary<string, int> weights, List<Customer> customers, string searchString)
    {
        if (string.IsNullOrWhiteSpace(searchString))
        {
            return new List<SearchResult>();
        }

        var searchTokens = TokenizeSearchString(searchString);

        return customers
           .Select(customer => new SearchResult
           {
               Customer = customer,
               Score = CalculateScore(weights, customer, searchTokens, searchString)
           })
        .Where(result => result.Score > 0)
        .OrderByDescending(result => result.Score)
        .Take(5)
        .ToList();
    }
    static int CalculateScore(Dictionary<string, int> weights, Customer customer, List<string> searchTokens, string searchString)
    {
        int score = 0;

        //setting dictionary for customer fields so can pull weights based on field
        var customerFields = new Dictionary<string, string>
    {
        { "FirstName", customer.FirstName.ToLower() },
        { "LastName", customer.LastName.ToLower() },
        { "Address", customer.Address.ToLower() }
    };


        foreach (var field in customerFields)
        {
            // Full match
            if (searchString.Split(' ').All(field.Value.Contains))
            {
                score += weights[field.Key] * 4;
            }
            else
            {
                foreach (var token in searchTokens)
                {
                    if (field.Value.Contains(token.ToLower())) // Partial match
                    {
                        score += weights[field.Key] * 2;
                    }
                }
            }

            //if no full or partial match then check for any match and return weight 100% per field
            if (score == 0)
            {
                {
                    if (searchString.Split(' ').Any(field.Value.Contains)) // Any match
                    {
                        score += weights[field.Key];
                    }
                }
            }
        }

        return score;
    }
    #endregion

}