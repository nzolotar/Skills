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
             new string[] { "weight", "FirstName", "100" },
             new string[] { "weight", "LastName", "200" },
             new string[] { "weight", "Address", "300" },
             new string[] { "customer", "John", "Doe", "123 Main St" },
             new string[] { "customer", "Jane", "Smith", "456 Elm St" },
             new string[] { "customer", "Jennifer", "Doe", "333 4th South St" },
             new string[] { "customer", "Jenni", "Doe", "333 4th South St" },
             new string[] { "customer", "Daisy", "Doe", "333 4th South St" },
             new string[] { "customer", "Carol", "Smith", "301 4th South St" },
             new string[] { "search", " " }
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
        //keep console app running until key press
        Console.ReadKey();
    }

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

        //max of all weights
        var maxWeights = weights.Values.Sum() * 4;

        foreach (var customer in customers)
        {
            int score = 0;

            //if full match by token then return weight 400% per field
            CheckFullMatch(customer, searchTokens, weights, ref score);

            //if no full match then check for partial match
            if (score != maxWeights)
            {
                //if partial match by token then return weight 200% per field
                CheckPartialMatch(customer, searchTokens, weights, ref score);

                if (score == 0)
                {
                    //if no partial match then check for any match and return weight 100% per field
                    CheckAnyMatch(customer, searchTokens, weights, ref score);
                }
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

    private static void CheckFullMatch(Customer customer, List<string> tokens, Dictionary<string, int> weights, ref int score)
    {
        foreach (var token in tokens)
        {
            //if token is exact match to customer field then return 400% weight
            if (token.Equals(customer.FirstName, StringComparison.OrdinalIgnoreCase))
            {
                score += weights["FirstName"] * 4;
            }
            if (token.Equals(customer.LastName, StringComparison.OrdinalIgnoreCase))
            {
                score += weights["LastName"] * 4;
            }
            if (token.Equals(customer.Address, StringComparison.OrdinalIgnoreCase))
            {
                score += weights["Address"] * 4;
            }
        }
    }

    private static void CheckPartialMatch(Customer customer, List<string> tokens, Dictionary<string, int> weights, ref int score)
    {
        foreach (var token in tokens)
        {
            //if customer field has any partial match to token then return 200% of weight
            if (customer.FirstName.Contains(token))
            {
                score += weights["FirstName"] * 2;
            }
            if (customer.LastName.Contains(token))
            {
                score += weights["LastName"] * 2;
            }
            if (customer.Address.Contains(token))
            {
                score += weights["Address"] * 2;
            }
        }
    }

    private static void CheckAnyMatch(Customer customer, List<string> tokens, Dictionary<string, int> weights, ref int score)
    {
        //if token partial match to customer first name then return 100% weight
        if (tokens.Contains(customer.FirstName))
        {
            score += weights["FirstName"];
        }
        if (tokens.Contains(customer.LastName))
        {
            score += weights["LastName"];
        }
        if (tokens.Contains(customer.Address))
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
}